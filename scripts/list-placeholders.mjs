// Lists every placeholder still left in the content files.
// Usage: npm run placeholders
// With --strict it exits 1 when any remain, so CI or a pre-deploy check can block a release.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../src/content/", import.meta.url);
const strict = process.argv.includes("--strict");
let count = 0;

for (const file of readdirSync(dir)) {
  const lines = readFileSync(new URL(file, dir), "utf8").split("\n");
  lines.forEach((line, i) => {
    const match = line.match(/todo\("([^"]+)"\)/);
    if (match) {
      count += 1;
      console.log(`${join("src/content", file)}:${i + 1}  ${match[1]}`);
    }
  });
}

console.log(count === 0 ? "No placeholders left." : `\n${count} placeholder(s) left to fill in.`);
if (strict && count > 0) process.exit(1);
