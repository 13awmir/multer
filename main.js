const express = require("express");
const { uploadFile } = require("./middleware/multer");
const { errorHandler, notFoundError } = require("./utils/errorHandler");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/upload", uploadFile.single("image"), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    return res.status(200).json({
      message: "File uploaded successfully",
      data: {
        name: req.file.filename,
        path: req.file.path,
      },
    });
  } catch (error) {
    next(error);
  }
});
app.use(notFoundError);
app.use(errorHandler);
app.listen(3000, () => {
  console.log("connected on port 3000");
});
