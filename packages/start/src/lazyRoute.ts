import { Fragment, createElement } from "preact";
import { lazy, forwardRef, useLayoutEffect } from 'preact/compat';
import { cleanupStyles, preloadStyles, updateStyles } from "vinxi/css";
import type { Asset, Manifest, LazyComponent, Loader } from "./types.js";

export const renderAsset = ({ tag, attrs: { key, ...attrs } = { key: undefined }, children }: Asset) => {
	switch (tag) {
		case "script":
			if (attrs.src) {
				return createElement("script", { ...attrs, key: attrs.src });
			} else {
				return createElement("script", {
					...attrs,
					key: key,
					dangerouslySetInnerHTML: {
						__html: children,
					},
				});
			}
		case "link":
			return createElement("link", { ...attrs, key: key });
		case "style":
			return createElement("style", {
				...attrs,
				key: key,
				dangerouslySetInnerHTML: { __html: children },
			});
	}
}

export default function lazyRoute(
	component: LazyComponent,
	loader: Loader | undefined,
	clientManifest: Manifest,
	serverManifest: Manifest,
	exported = "default",
) {
	return lazy(async () => {
		if (import.meta.env.DEV) {
			const manifest = import.meta.env.SSR ? serverManifest : clientManifest;
			const mod = await manifest.inputs[component.src].import();

			const Component = mod[exported];

			const assets = await clientManifest.inputs?.[component.src].assets() as unknown as Asset[];

			const styles = assets.filter((asset) => asset.tag === "style");

			if (typeof window !== "undefined" && import.meta.hot) {
				import.meta.hot.on("css-update", (data) => {
					updateStyles(styles, data);
				});
			}

			const loaderProps = await loader?.require().loader()

			const Comp = forwardRef((props, ref) => {
				if (typeof window !== "undefined") { 
					useLayoutEffect(() => {
						return () => {
							// remove style tags added by vite when a CSS file is imported
							cleanupStyles(styles);
						};
					}, []);
				}

				return createElement(
					Fragment,
					null,
					createElement(Component, { ...props, ...loaderProps, ref: ref }),
					...assets.map((asset) => renderAsset(asset)),
				);
			});

			return { default: Comp };
		} else {
			const mod = await component.import();

			const Component = mod[exported];
			const assets = await clientManifest.inputs?.[component.src].assets() as unknown as Asset[];

			if (typeof window !== "undefined") {
				const styles = assets.filter(
					(asset) => asset.attrs.rel === "stylesheet",
				);
				preloadStyles(styles);
			}

			const loaderProps = await loader?.require().loader()

			const Comp = forwardRef((props, ref) => {
				return createElement(
					Fragment,
					createElement(Component, { ...props, ...loaderProps, ref: ref }),
					...assets.map((asset) => renderAsset(asset)),
				);
			});
			return { default: Comp };
		}
	});
}
