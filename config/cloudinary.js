const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // File type ke hisaab se folder aur format set karo
    let resourceType = "auto"; // image, video, raw sab handle karta hai
    return {
      folder: `drive/${req.user.id}`, // har user ka alag folder
      resource_type: resourceType,
      public_id: Date.now() + "-" + file.originalname.replace(/\s+/g, "_"),
    };
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };