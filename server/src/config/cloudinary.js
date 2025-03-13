const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "admin_profiles", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed image formats
    transformation: [{ width: 500, height: 500, crop: "fill" }], // Auto crop
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
