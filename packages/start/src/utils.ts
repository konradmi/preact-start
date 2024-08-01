import { createElement } from "preact";
import type { Asset } from "./types.js";

export const extractParams = (url: string, path: string): Record<string, string> | null => {
  const urlSegments = url.split('/').filter(segment => segment)
  const pathSegments = path.split('/').filter(segment => segment)

  if (urlSegments.length !== pathSegments.length) {
    return null
  }

  const params: Record<string, string> = {}

  for (let i = 0; i < pathSegments.length; i++) {
    const pathSegment = pathSegments[i]
    const urlSegment = urlSegments[i]

    if (pathSegment.startsWith(':')) {
      const paramName = pathSegment.slice(1)
      params[paramName] = urlSegment
    } else if (pathSegment !== urlSegment) {
      return null
    }
  }

  return params
}

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
