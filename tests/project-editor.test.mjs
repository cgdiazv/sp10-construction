import { test } from "node:test";
import assert from "node:assert/strict";
import { getPreviewCover, getSavedCover } from "../lib/project-editor.ts";

const media = [
  { type: "video", url: "video" },
  { type: "image", url: "first" },
  { type: "image", url: "second" },
];

test("uses a selected existing or pending image as the preview cover", () => {
  assert.equal(getPreviewCover(media, "second", ["pending"]), "second");
  assert.equal(getPreviewCover(media, "pending", ["pending"]), "pending");
});

test("falls back to the first image when the selected cover is removed", () => {
  assert.equal(getPreviewCover(media, "removed", ["pending"]), "first");
  assert.equal(getPreviewCover([{ type: "video", url: "video" }], "removed", ["pending"]), "pending");
  assert.equal(getPreviewCover([], "removed", []), "");
});

test("saves the uploaded URL rather than the temporary preview URL", () => {
  assert.equal(getSavedCover(media, "pending-2", ["pending-1", "pending-2"], ["uploaded-1", "uploaded-2"]), "uploaded-2");
  assert.equal(getSavedCover(media, "second", ["pending"], ["uploaded"]), "second");
  assert.equal(getSavedCover([], "", ["pending"], ["uploaded"]), "uploaded");
  assert.throws(() => getSavedCover([], "pending", ["pending"], []), /not uploaded/);
});
