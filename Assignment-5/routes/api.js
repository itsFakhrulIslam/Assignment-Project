import express from "express";
const router = express.Router();

import * as usersControllers from "../app/controllers/usersControllers.js";
import * as filesControllers from "../app/controllers/filesControllers.js";
import AuthMiddleware from "../app/middlewares/authMiddleware.js";


// User Router
router.post("/Registration", usersControllers.Registration);
router.post("/Login", usersControllers.Login);
router.get("/Read-Profile", AuthMiddleware, usersControllers.ReadProfile);
router.post("/Update-Profile", AuthMiddleware, usersControllers.UpdateProfile);

// File Upload Router
router.post("/Upload-Single-File", filesControllers.uploadSingleFile);
router.post("/Upload-Multiple-Files", filesControllers.uploadMultipleFiles);
router.get("/Read-File/:fileName", filesControllers.readFile);
router.delete(
  "/Delete-Single-File/:fileName",
  filesControllers.deleteSingleFile
);

export default router;
