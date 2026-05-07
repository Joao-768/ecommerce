import { generateCollectionSlug } from "./collectionsUtils.js";

export function generateProductSlug(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
}

export function generateImage(collection, name) {
    return `/images/${generateCollectionSlug(collection)}/${generateProductSlug(name)}.png`;
}
