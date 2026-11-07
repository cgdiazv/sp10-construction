import type { MediaItem } from "./projects";

export function getPreviewCover(media: MediaItem[], coverImage: string, pendingUrls: string[]): string {
  const imageUrls = [...media.filter((item) => item.type === "image").map((item) => item.url), ...pendingUrls];
  return imageUrls.includes(coverImage) ? coverImage : imageUrls[0] ?? "";
}

export function getSavedCover(media: MediaItem[], coverImage: string, pendingUrls: string[], uploadedUrls: string[]): string {
  const previewCover = getPreviewCover(media, coverImage, pendingUrls);
  const pendingIndex = pendingUrls.indexOf(previewCover);
  if (pendingIndex < 0) return previewCover;
  const uploadedUrl = uploadedUrls[pendingIndex];
  if (!uploadedUrl) throw new Error("The selected cover image was not uploaded.");
  return uploadedUrl;
}
