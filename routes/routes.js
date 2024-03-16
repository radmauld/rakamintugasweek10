import express from "express";
import multer from "multer";
import { verifyUser } from "../middlewares/AuthUsers.js";
import MovieController from "../controllers/movieController.js";
import userController from "../controllers/userController.js";
import diskStorage from "../uploads/uploads.js";
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Welcome");
});

router.get("/api/movies", verifyUser, MovieController.findAll);
router.get("/api/movies/:id", verifyUser, MovieController.findOne);
router.post("/api/movies", verifyUser, MovieController.create);
router.put("/api/movies/:id", verifyUser, MovieController.update);
router.delete("/api/movies/:id", verifyUser, MovieController.destroy);

router.get("/api/users", verifyUser, userController.findAll);
router.get("/api/users/:id", verifyUser, userController.findOne);
router.post("/api/users/register", userController.create);
router.put("/api/users/:id", verifyUser, userController.update);
router.delete("/api/users/:id", verifyUser, userController.destroy);

const upload = multer({ storage: diskStorage });
router.post("/api/movies/upload/:id", upload.single("photo"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const imagePath = req.file.path;
    uploadMovie(req.body.movieId, imagePath);

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      imagePath: imagePath,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
