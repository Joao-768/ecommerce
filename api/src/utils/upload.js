import multer from "multer";

const storage = multer.memoryStorage();

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];

function fileFilter(req, file, cb) {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(new Error("Only PNG, JPEG, and WEBP images are allowed"));
    }
    cb(null, true);
}

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});