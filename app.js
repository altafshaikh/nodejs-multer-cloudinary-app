const express = require("express");
const { multerUploads, dataUri } = require("./utils/multer");
const { uploader, cloudinaryConfig } = require("./utils/cloudinary");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Route

app.use("*", cloudinaryConfig);

app.get("/", (req, res) => res.json({ message: "Hello World!" }));

app.post("/upload", multerUploads, (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then((result) => {
        const image = result.url;
        return res.status(200).json({
          messge: "Your image has been uploded successfully to cloudinary",
          data: {
            image,
          },
        });
      })
      .catch((err) =>
        res.status(400).json({
          messge: "someting went wrong while processing your request",
          data: {
            err,
          },
        })
      );
  }
});

app.listen(5000, () => console.log("Server is running"));
