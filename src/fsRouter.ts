import { BaseFileSystemRouter, cleanPath, analyzeModule } from "vinxi/fs-router";

export class MyFileSystemRouter extends BaseFileSystemRouter {
  toPath(src: string) {
    const routePath = cleanPath(src, this.config)
      // remove the initial slash
      .slice(1)
      .replace(/index$/, "")
      .toLowerCase()
      .replace(/\[([^\/]+)\]/g, (_, m) => {
        return `:${m}`;
      });

    const trimmedPath = routePath.endsWith("/") ? routePath.slice(0, -1) : routePath;
    
    return trimmedPath?.length > 0 ? `/${trimmedPath}` : "/";
  }

  toRoute(filePath: string) {
    const [_, exports] = analyzeModule(filePath);
    const hasRouteConfig = !!exports.find(e => e.n === "loader");
    return {
      path: this.toPath(filePath),
      $component: {
        src: filePath,
        pick: ["default", "$css"],
      },
      $$loader: hasRouteConfig
        ? {
            src: filePath,
            pick: ["loader"]
          }
        : undefined,
    };
  }
}
