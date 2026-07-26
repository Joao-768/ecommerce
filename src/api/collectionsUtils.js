export function generateCollectionSlug(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
}
