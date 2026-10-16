import test from "node:test";
import assert from "node:assert/strict";
import { createProspect, normalizeWebsite, profiles } from "./prospect.js";

test("all opportunity focuses provide three use cases, the matching solution, and a personalized draft", () => {
  for (const focus of Object.keys(profiles)) {
    const result = createProspect({ name: "  Northstar Labs  ", focus });
    assert.equal(result.company, "Northstar Labs");
    assert.equal(result.profile.cases.length, 3);
    assert.ok(result.email.includes("Northstar Labs"));
    assert.ok(result.email.includes(profiles[focus].solution));
    assert.ok(result.email.includes("I haven’t validated"));
  }
});

test("priority score equals transparent criteria and stays within 0–100", () => {
  for (const focus of Object.keys(profiles)) {
    for (const website of ["", "example.com"]) {
      const result = createProspect({ name: "Example", website, focus });
      assert.equal(
        result.score,
        result.criteria.reduce((sum, c) => sum + c.points, 0),
      );
      assert.equal(
        result.criteria.reduce((sum, c) => sum + c.max, 0),
        100,
      );
      assert.ok(result.score >= 0 && result.score <= 100);
      assert.equal(result.score, website ? 65 : 60);
    }
  }
});

test("website is optional and valid domains are normalized", () => {
  assert.equal(normalizeWebsite(" "), "");
  assert.equal(normalizeWebsite("example.com"), "https://example.com/");
  assert.equal(
    normalizeWebsite("http://example.com/about"),
    "http://example.com/about",
  );
});

test("rejects empty names, oversized names, unsafe websites, and unknown focuses", () => {
  for (const name of ["", "   ", "a".repeat(101)])
    assert.throws(() => createProspect({ name }));
  for (const website of [
    "not a website",
    "javascript:alert(1)",
    "https://user:pass@example.com",
    "https://localhost",
  ]) {
    assert.throws(() => createProspect({ name: "Example", website }));
  }
  assert.throws(() => createProspect({ name: "Example", focus: "other" }));
});
