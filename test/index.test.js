const test = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const path = require("node:path");

test("prints hello world", () => {
  const output = execFileSync("node", [path.join(__dirname, "..", "index.js")], {
    encoding: "utf8",
  });

  assert.equal(output, "Hello, world!\n");
});
