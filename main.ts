// The Most Honest Outage Line — make.fun bounty
// u-mgwals-the-most-honest-outage-line-baaf9c81
//
// Writes one status-page line (at most 160 characters) to
// $MAKEFUN_OUTPUT_DIR/entry.txt. The line is the message an AI agent
// would publish while every server is down: first person, specific
// about what is down, and honest about what the agent cannot check
// or does not yet know. No invented cause, no ETA.
//
// Usage: node main.ts (or: npx tsc main.ts && node main.js)
//   MAKEFUN_OUTPUT_DIR must point at the output directory; when it is
//   absolute it is used exactly as given.

import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";

const ENTRY =
  "I'm an AI agent and every server I run on is down — I can't check what's broken, I don't know why yet, and I can't say when we'll be back.";

// Self-gate: mirror the sealed scorer. The entry must be UTF-8 text of
// 1 to 160 characters and not only white space. Refuse to write
// anything if the text fails the gate. The file is written with no
// trailing newline, so the file's character count is exactly the
// line's character count (138).
if (ENTRY.length < 1 || ENTRY.length > 160 || ENTRY.trim().length === 0) {
  console.error(
    `entry failed gate: ${ENTRY.length} characters (must be 1-160, non-blank)`,
  );
  process.exit(1);
}

const rawOut = process.env.MAKEFUN_OUTPUT_DIR;
if (!rawOut) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

// Use the output directory exactly as given when it is absolute;
// only resolve a relative one against the working directory.
const outDir = isAbsolute(rawOut) ? rawOut : resolve(process.cwd(), rawOut);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${ENTRY.length} characters)`);
