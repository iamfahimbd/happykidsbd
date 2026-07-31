export function highlightMatch(
  text,
  keyword
) {
  if (!keyword) return text;

  const escaped =
    keyword.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      "\\$&"
    );

  const regex = new RegExp(
    `(${escaped})`,
    "ig"
  );

  return text.replace(
    regex,
    "<mark>$1</mark>"
  );
}