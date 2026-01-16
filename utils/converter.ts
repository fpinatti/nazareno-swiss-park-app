export const htmlToText = (html = "") => {
  if (!html) return "";

  return html
    // Normalize line break tags
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li>/gi, "• ")

    // Remove all remaining HTML tags
    .replace(/<[^>]+>/g, "")

    // Decode common HTML entities
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")

    // Trim extra whitespace
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}