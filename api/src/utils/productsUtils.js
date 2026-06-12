export function generateProductSlug(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
}
