const express = require("express");
const router = express.Router();
const { cloudinary, upload } = require("../config/cloudinary");
const File = require("../models/File");
const auth = require("../middleware/auth");




// Upload
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    const newFile = await File.create({
      owner: req.user.id,
      name: req.file.originalname,
      cloudinaryId: req.file.filename,
      url: req.file.path,
      resourceType: req.file.mimetype.split("/")[0],
      size: req.file.size,
    });
    res.redirect("/files");
  } catch (err) {
    console.error(err);
    res.status(500).send("Upload failed");
  }
});




// View all files


router.get("/", auth, async (req, res) => {
  const files = await File.find({ owner: req.user.id }).sort({ uploadedAt: -1 });
  res.render("files", { files, username: req.user.username }); // ✅ username add kiya
});






// Delete   



router.post("/delete/:id", auth, async (req, res) => {
  try {
    const file = await File.findOne({ _id: req.params.id, owner: req.user.id });
    if (!file) return res.status(404).send("Not found");

    await cloudinary.uploader.destroy(file.cloudinaryId, {
      resource_type: file.resourceType === "image" ? "image" : "raw",
    });
    await file.deleteOne();
    res.redirect("/files");
  } catch (err) {
    res.status(500).send("Delete failed");
  }
});




module.exports = router;