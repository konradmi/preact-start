import { ExportSpecifier } from "es-module-lexer";
import { BaseFileSystemRouter, cleanPath, analyzeModule } from "vinxi/fs-router";

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

const createAPIRoutes = (src: string, exports: readonly ExportSpecifier[]) => {
  const handlers = {} as Record<string, { src: string, pick: string[]}>;
  for (const exp of exports) {
    if (HTTP_METHODS.includes(exp.n)) {
      handlers[`$${exp.n}`] = {
        src: src,
        pick: [exp.n]
      };
    }
  }
  return handlers;
}

export class ApiRoutesRouting extends BaseFileSystemRouter {
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
    return {
      path: this.toPath(filePath),
      ...createAPIRoutes(filePath, exports)
    };
  }
}
