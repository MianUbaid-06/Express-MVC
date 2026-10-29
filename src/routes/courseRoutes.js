const router = require("express").Router();

const controller = require("../controllers/courseController");
const auth = require("../middleware/authMiddleware");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post("/", auth, controller.create);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.remove);

module.exports = router;