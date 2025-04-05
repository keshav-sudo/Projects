import multer from "multer";

const storage = multer.memoryStorage(); // Stores file in memory instead of disk

export const upload = multer({ storage });
