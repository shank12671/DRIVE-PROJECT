const bcrypt = require("bcrypt");

const User = require("../models/user.js");

const jwt = require("jsonwebtoken");

const fs = require("fs");
var path = require("path");


//todo    to create resources
exports.signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((result) => {
      if (result.length >= 1) {
        return res.status(409).json({
          Message: "Email already exists.",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            res.status(500).json({
              error: err.message,
            });
          } else {
            const user = new User({
              fullName: req.body.fullName,
              email: req.body.email.toLowerCase(),
              password: hashedPassword,
            });
            user
              .save()
              .then((createdUser) => {
                console.log(
                  path.normalize(
                    appRoot + "/public/" + createdUser._id
                  )
                );
                var dir = path.normalize(
                  appRoot + "/public/" + createdUser._id
                );

                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir);
                }
                return res.status(201).json({
                  Message: "successfully added a new user.",
                  createdUser,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.login = (req, res, next) => {
  User.find({ email: req.body.email.toLowerCase() })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userID: user[0]._id,
              accessLevel: user[0].accessLevel,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).json({
            message: "Auth successful",
            name: user[0].fullName,
            _id: user[0]._id,
            email: user[0].email,
            files: user[0].files,
            accessLevel: user[0].accessLevel,
            token,
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// //todo     to fetch or read resources

//!   get all users
exports.get_all_user = (req, res, next) => {
  User.find()
    .exec()
    .then((users) => {
      res.status(200).json({
        length: users.length,
        users,
      });
    })
    .catch((err) => console.log(err));
};

//!    get single user
exports.get_single_user = (req, res, next) => {
  const id = req.params.userID;
  
  User.findOne({ _id: id })
    .exec()
    .then((result) => {
      console.log(result, "%$#%$");
      if (result.length < 1) {
        return res.status(400).json({
          message: "User not Found",
        });
      }

      return res.status(200).json({
        user: result.files,
      });
    })
    .catch((err) => console.log(err));
};

//todo    patch resources

exports.update_user = (req, res, next) => {
  
  const id = req.params.userID;
  const updateFields = {};

  User.find({ _id: id })
    .exec()
    .then((user) => {
      
      if (user.length < 1) {
        return res.status(400).json({
          message: "User not Found",
        });
      }
      
      bcrypt.compare(req.body.passOld, user.password, (err, response) => {
        
        if (err || !response) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        }
        if (response) {
          for (let [key, value] of Object.entries(req.body)) {
            updateFields[key] = value;
          }
          for (const key of Object.keys(updateFields)) {
            if (key == "password") {
              bcrypt.hash(updateFields[key], 10, (err, hashedPassword) => {
                if (err) {
                  res.status(500).json({
                    message: err.message,
                  });
                } else {
                  updateFields[key] = hashedPassword;
                  console.log(updateFields);
                  User.updateOne({ _id: id }, { $set: updateFields })
                    .exec()
                    .then((result) => {
                      return res.status(200).json({
                        message: "User Updated.",
                      });
                    });
                }
              });
            }
          }
        }
      });
    })
    .catch((err) => console.log(err));
};

// todo     Delete resources

//!   delete single resources

exports.delete_user = (req, res, next) => {
  const id = req.params.userID;
  User.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "User Deleted" });
    })
    .catch((err) => console.log(err));
};

//! upload files api

exports.upload_file = (req, res, next) => {
  
  const id = req.params.userID;
  let uploadedFiles = [];
  User.find({ _id: id })
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(400).json({
          message: "User not Found",
        });
      }
      uploadedFiles = result[0].files;
    });
  req.files.forEach((element) => {
    uploadedFiles.push({
      permission: req.body.permission,
      fileName: element.originalname,
      size: element.size,
      date: new Date().toISOString(),
    });
  });

  User.updateOne({ _id: id }, { $addToSet: { files: uploadedFiles } })
    .exec()
    .then((result) => {
      return res.status(200).json({
        message: "Files Uploaded",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// ! delte files

exports.delete_file = (req, res, next) => {
  const id = req.params.userID;
  const deleteFileName = req.params.name;
  
  User.find({ _id: id })
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(400).json({
          message: "User not Found",
        });
      }

      const files = result[0].files;

      const file = files.find((e) => e.fileName === deleteFileName);
      if (file == null) {
        return res.status(404).json({ message: "File Not Found" });
      }
      const newFiles = files.filter((result) => {
        return result.fileName !== deleteFileName;
      });
      User.updateOne({ _id: id }, { $set: { files: newFiles } })
        .exec()
        .then((result) => {
          try {
            fs.unlinkSync(
              `${appRoot}/public/${id}/${deleteFileName}`
            );
          } catch (err) {
            console.error("File dooes not exists");
          }

          return res.status(200).json({ message: "Successfully deleted file" });
        });
    })
    .catch((err) => console.log(err));
};

//! file details

exports.file_details = (req, res, next) => {
  const id = req.params.userID;
  const fileName = req.params.name;
  
  User.find({ _id: id })
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(400).json({
          message: "User not Found",
        });
      }

      const files = result[0].files;
      console.log(files);
      const file = files.find((e) => e.fileName === fileName);
      if (file == null) {
        return res.status(404).json({ message: "File Not Found" });
      }

      return res.status(200).json({ file });
    });
};
