
const express = require('express');
const router = express.Router();
const Task = require('../models/task.model'); 


router.post('/', async (req, res) => {
    try {
        
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status || 'Pending'
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
       
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        
        const updatedFields = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status
        };

        
        Object.keys(updatedFields).forEach(key => updatedFields[key] === undefined && delete updatedFields[key]);

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            updatedFields, 
            { new: true, runValidators: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;