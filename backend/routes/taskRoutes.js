const express=require("express");
const router=express.Router();

const {getTasks, createTasks, deleteTasks}=require("../controller/taskControl");

router.get("/",getTasks);
router.post("/", createTasks)
router.delete("/:id", deleteTasks)

module.exports = router