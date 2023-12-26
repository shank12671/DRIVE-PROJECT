// core or 3rd party libs
const express = require("express");
const router = express.Router();

const UserControlller = require("../controllers/user.js");
const upload = require("../middleware/uploadFile.js")
const checkAuth = require("../middleware/check-auth")

//todo    to create resources

router.post("/signup", UserControlller.signup);

router.post("/login", UserControlller.login);

router.post(
  "/upload/:userID",
  [checkAuth,
  upload.array("files", 15)],
  UserControlller.upload_file
);
router.delete("/delete/:userID/:name", UserControlller.delete_file)

router.get("/file/:userID/:name", UserControlller.file_details);
//todo     to fetch or read resources

router.get("/", UserControlller.get_all_user);

router.get("/:userID",checkAuth, UserControlller.get_single_user);

// //todo    patch resources

router.patch("/:userID", UserControlller.update_user);

// todo     Delete resources

router.delete("/:userID",checkAuth, UserControlller.delete_user);

module.exports = router;
