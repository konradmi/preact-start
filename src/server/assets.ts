import { Fragment, createElement } from "preact";
import { lazy } from "preact/compat";
import { updateStyles } from "vinxi/css";
import type { Asset, Manifest } from "../types";
import { renderAsset } from "../lazyRoute.js";

export const createAssets = (src: string, manifest: Manifest) =>
	lazy(async () => {
		const assets = await manifest.inputs[src].assets() as unknown as Asset[];
		const styles = assets.filter((asset) => asset.tag === "style");

		if (typeof window !== "undefined" && import.meta.hot) {
			import.meta.hot.on("css-update", (data: { file: string, contents: string}) => {
				updateStyles(styles, data);
			});
		}

		return {
			default: function Assets() {
				return createElement(
					Fragment,
					null,
					...assets.map((asset) => renderAsset(asset)),
				);
			},
		};
	});
