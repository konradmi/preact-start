import { Fragment, createElement } from "preact";
import { lazy, forwardRef, useLayoutEffect } from 'preact/compat';
import { cleanupStyles, preloadStyles, updateStyles } from "vinxi/css";
import type { Asset, Manifest, LazyComponent } from "./types.js";
import { renderAsset } from "./utils.js";

export default function lazyRoute(
	component: LazyComponent,
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
					createElement(Component, { ...props, ref: ref }),
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

			const Comp = forwardRef((props, ref) => {
				return createElement(
					Fragment,
					createElement(Component, { ...props, ref: ref }),
					...assets.map((asset) => renderAsset(asset)),
				);
			});
			return { default: Comp };
		}
	});
}
