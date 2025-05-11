const express = require("express");
const { authMiddleware } = require("../middleware/middleware");
const ImageKit = require("imagekit");
const { Media } = require("../models/Media");

// Create router
const mediaRouter = express.Router();

// Initialize ImageKit client
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// GET /media/upload/signature
// Returns timestamp, token, and signature for client-side direct uploads
mediaRouter.get("/upload/signature", (req, res) => {
  const authParams = imagekit.getAuthenticationParameters();
  res.json(authParams);
});

mediaRouter.post('/', authMiddleware, async (req, res, next) => {
    try {
        const fileName = req.body.fileName;
        const fileType = req.body.fileType;
        const url = req.body.url;

        if (fileType !== 'image') {
          return res.status(400).json({ message: 'Only image uploads are supported.' });
        }

        const existingFile = await Media.findOne({url});

        if (existingFile) {
          res.status(201).json({
            msg: "file already exists"
          })
          return;
        }

        const media = Media.create({
            fileName,
            fileType,
            url,
            owner: req.userId
        });
        res.status(201).json({
            media
        });
    } catch (err) {
        next(err);
    }
});

mediaRouter.get(
    '/',
    authMiddleware,
    async (req, res, next) => {
      try {
        const items = await Media.find({ owner: req.userId });
        res.json(items);
      } catch (err) {
        next(err);
      }
    }
  );

module.exports = mediaRouter;