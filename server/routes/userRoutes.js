const router = require("express").Router();
const {
    login,
    register,
    setAvatar,
    getAllUsers,
    test,

  } = require("../controllers/userController");

  
  router.post("/login", login);
  router.post("/register", register);
  router.post("/setAvatar", setAvatar );
  router.post("/allUsers", getAllUsers);
  router.get("/test/:id", test);
  
  module.exports = router;