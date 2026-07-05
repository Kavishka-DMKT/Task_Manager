const TaskModel = require('../models/task.model'); 


const getTodos = async (req, res) => {
    try {
        const todos = await TaskModel.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch todos', error: error.message });
    }
};


const createTodo = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body || {};
        
        if (!title) {
            return res.status(400).json({ message: 'Title is required' }); 
        }

        const newTask = new TaskModel({
            title,
            description,
            priority,
            status
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create todo', error: error.message });
    }
};


const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body || {};

        const updatedTask = await TaskModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update todo', error: error.message });
    }
};


const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete todo', error: error.message });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };