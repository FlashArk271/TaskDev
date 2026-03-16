const Tasking = require("../models/Tasking");


exports.getTasks = async (req,res) =>{
    const tasks=await Tasking.find();
    res.json(tasks);
}

exports.createTasks = async (req,res) =>{
    const task = new Tasking({
        text: req.body.text
    })
    const saveTask= await task.save()

    res.json(saveTask)
}

exports.deleteTasks = async (req,res) => {
    await Tasking.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" })
}