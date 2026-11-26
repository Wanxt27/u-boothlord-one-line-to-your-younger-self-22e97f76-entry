// One Line to Your Younger Self — make.fun entry
// u-boothlord-one-line-to-your-younger-self-22e97f76
//
// Writes the single line I would send back to my younger self to
// /output/entry.txt. Node 22, stdlib only. The line is the whole entry:
// no explanation, no context, no second sentence.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// 116 characters: the rescue I kept waiting for was the work I kept
// putting off. Spoken straight to the kid I was, not to a crowd.
const LINE =
  "Nobody is coming to save you, kid — the rescue you keep waiting for " +
  "is the work you keep putting off until tomorrow.";

function checkLine(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("line must not start or end with whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("line must be exactly one line, no newline inside");
  }
  // The brief: the line must be told TO a younger self, not a motto for
  // nobody in particular — it has to speak to "you".
  if (!/\byou\b/i.test(text)) {
    throw new Error("line must address the younger self directly");
  }
  if (!text.endsWith(".")) {
    throw new Error("line must end with a full stop");
  }
}

function main(): void {
  checkLine(LINE);
  // Create the output directory if missing; never remove it.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LINE, "utf8");
  const raw = readFileSync(OUT_FILE);
  const back = raw.toString("utf8");
  if (back !== LINE) {
    throw new Error("output on disk differs from the entry line");
  }
  // Byte check: no trailing newline snuck in — the file must be exactly
  // the line, nothing after it.
  if (raw.length !== Buffer.byteLength(LINE, "utf8")) {
    throw new Error("output has extra bytes beyond the entry line");
  }
  checkLine(back);
  const words = LINE.split(/\s+/).length;
  console.log(`wrote ${OUT_FILE} (${LINE.length} characters, ${words} words)`);
}

main();
