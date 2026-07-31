export function normalizeText(text = "") {
  return text
    .toLowerCase()
    .replace(/–/g, "-")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim();
}

export function isMatch(text, keyword) {
  const source = normalizeText(text);
  const search = normalizeText(keyword);

  return source.includes(search);
}