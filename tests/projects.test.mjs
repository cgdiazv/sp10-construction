import { test } from "node:test";
import assert from "node:assert/strict";
import { defaultProjects, mergeProjects } from "../lib/projects.ts";

test("keeps the original portfolio when there are no database overrides", () => {
  assert.deepEqual(mergeProjects([]), defaultProjects);
});

test("merges edits, new projects, and deletions without changing the defaults", () => {
  const original = defaultProjects[0];
  const added = { ...defaultProjects[1], title: "New project" };
  const result = mergeProjects([
    { id: original.id, data: { ...original, title: "Updated" } },
    { id: defaultProjects[2].id, data: { deleted: true } },
    { id: "new-project", data: added },
  ]);
  assert.equal(result.find((project) => project.id === original.id).title, "Updated");
  assert.equal(result.some((project) => project.id === defaultProjects[2].id), false);
  assert.equal(result.find((project) => project.id === "new-project").title, "New project");
  assert.notEqual(defaultProjects[0].title, "Updated");
});

test("rejects malformed projects and projects with no cover in the gallery", () => {
  assert.throws(() => mergeProjects([{ id: "bad", data: { title: "Incomplete" } }]), /Invalid project document/);
  assert.throws(() => mergeProjects([{ id: "bad", data: { ...defaultProjects[0], coverImage: "missing" } }]), /Invalid project document/);
});
