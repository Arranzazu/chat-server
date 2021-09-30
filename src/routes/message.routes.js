const { Router } = require("express");
const controllers = require("../controllers");
const middleware = require("../middleware");

const router = Router();

router.post("/create", middleware.users.isValid, controllers.message.create);
router.post("/chat", middleware.users.isValid, controllers.message.chat);

// router.post("/create", controllers.message.create);
// router.post("/chat", controllers.message.chat);

module.exports = router;
