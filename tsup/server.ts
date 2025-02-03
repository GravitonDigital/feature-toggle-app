import type { Options } from ".";

import { globSync } from "glob";
import { DIR_SRC, DIR_SRC_ASSETS } from "./constants";
import { dict } from "./dict";

export default function buildServerConfig(): Options {
  const GLOB_CONFIG = {
    absolute: false,
    posix: true,
  };

  const FILES_SERVER = globSync(`${DIR_SRC}/**/*.ts`, {
    ...GLOB_CONFIG,
    ignore: ([] as string[]).concat(
      globSync(`${DIR_SRC_ASSETS}/**/*.ts`, GLOB_CONFIG),
      globSync(`${DIR_SRC}/**/*.stories.ts`, GLOB_CONFIG),
    ),
  });

  const SERVER_JS_ENTRY = dict(
    FILES_SERVER.map((k) => [
      k.replace(`${DIR_SRC}/`, "").replace(/\.[^.]*$/, ""), // name
      k,
    ]),
  );

  return {
    bundle: true,
    dts: false, // d.ts files are use useless at runtime
    entry: SERVER_JS_ENTRY,
    env: {
      BROWSER_SYNC_PORT: "3100",
    },
    esbuildOptions(options, context) {
      // If you have libs with chunks, use this to avoid collisions
      options.chunkNames = "_chunks/[name]-[hash]";

      options.mainFields = ["module", "main"];
    },

    external: ["/lib/featureToggle", "/lib/time", "/lib/tineikt/freemarker", /^\/lib\/xp\//],
    format: "cjs",
    minify: false, // Minifying server files makes debugging harder
    // noExternal: [],
    platform: "neutral",

    silent: ["QUIET", "WARN"].includes(process.env.LOG_LEVEL_FROM_GRADLE || ""),

    shims: false,
    splitting: true,
    sourcemap: false,
    target: "es5",
    tsconfig: `${DIR_SRC}/tsconfig.json`,
  };
}
