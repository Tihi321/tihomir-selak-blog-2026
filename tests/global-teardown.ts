import { existsSync, readFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";

export default function globalTeardown() {
  const pairs = [
    ["published-fixture-2025.md", "__playwright-fixture-2025.md"],
    ["published-fixture-2024.md", "__playwright-fixture-2024.md"],
  ];
  for (const [source, target] of pairs) {
    const fixturePath = join(process.cwd(), "tests/fixtures", source);
    const targetPath = join(process.cwd(), "src/content/writing", target);
    if (!existsSync(targetPath)) continue;
    if (!readFileSync(targetPath).equals(readFileSync(fixturePath))) {
      throw new Error(
        `Refusing to remove non-matching test fixture at ${targetPath}`,
      );
    }
    unlinkSync(targetPath);
  }
}
