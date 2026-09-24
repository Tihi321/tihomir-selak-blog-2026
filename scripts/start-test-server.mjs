import { spawn } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
} from "node:fs";
import { resolve } from "node:path";

const tempDir = resolve(".codex/temp/published-fixtures");
const contentDir = resolve("src/content/writing");
const fixturePairs = [
  ["published-fixture-2025.md", "__playwright-fixture-2025.md"],
  ["published-fixture-2024.md", "__playwright-fixture-2024.md"],
];
const targetPaths = fixturePairs.map(([, target]) =>
  resolve(contentDir, target),
);
for (const path of targetPaths) {
  if (!existsSync(path)) continue;
  const source = fixturePairs.find(
    ([, target]) => resolve(contentDir, target) === path,
  )?.[0];
  if (
    !source ||
    !readFileSync(path).equals(readFileSync(resolve("tests/fixtures", source)))
  ) {
    throw new Error(`Refusing to replace unrelated content at ${path}`);
  }
  unlinkSync(path);
}

mkdirSync(tempDir, { recursive: true });
for (const [source, target] of fixturePairs) {
  copyFileSync(resolve("tests/fixtures", source), resolve(tempDir, source));
  copyFileSync(resolve(tempDir, source), resolve(contentDir, target));
}

const server = spawn(
  process.execPath,
  [resolve("node_modules/astro/bin/astro.mjs"), "dev", "--host", "127.0.0.1"],
  {
    stdio: "inherit",
    env: process.env,
  },
);
let stopped = false;
function cleanup() {
  if (stopped) return;
  stopped = true;
  for (const [source, target] of fixturePairs) {
    const path = resolve(contentDir, target);
    if (!existsSync(path)) continue;
    if (
      !readFileSync(path).equals(
        readFileSync(resolve("tests/fixtures", source)),
      )
    ) {
      console.error(`Refusing to remove non-matching test fixture at ${path}`);
      continue;
    }
    unlinkSync(path);
  }
}
process.on("exit", cleanup);
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    cleanup();
    server.kill(signal);
  });
}
server.on("error", (error) => {
  cleanup();
  console.error(error);
  process.exit(1);
});
server.on("exit", (code) => {
  cleanup();
  process.exit(code ?? 0);
});
