const Expense = require('../models/Expenses');
const User = require('../models/user');

exports.create = async (req,res) => {
    try {
        const { title, category, amount, paymentMethod, date, note } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required!" });
        }
        if(!category) {
            return res.status(400).json({ message: "Category is required!" })
        }
        if(!amount) {
            return res.status(400).json({ message: "Amount is required!" });
        }
        if(!paymentMethod) {
            return res.status(400).json({ message: "Payment Method is required!" });
        }
        if(!date) {
            return res.status(400).json({ message: "Date is required!" });
        }
        const expense = new Expense({
            title, category, amount, paymentMethod, date, note, user: req.user._id
        });
        await expense.save();
        return res.status(201).json({ message: "Expenses Created Successfully!" , expense});        
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

exports.expenseList = async (req,res) => {
    try {
        const list = await Expense.find({ user: req.user._id });
        res.status(200).json({ message: "Your Expenses: ", list });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.listById = async (req,res) => {
    try {
        const listId = await Expense.findById(req.params.Id);
        res.status(200).json({ message: "Your Expense", listId });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

exports.updateList = async (req,res) => {
    try {
        const listEdit = await Expense.findByIdAndUpdate(req.params.Id, req.body);
        await listEdit.save();
        res.status(200).json({ message: "Updated Expense List", listEdit });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

exports.deleteList = async (req,res) => {
    try {
        const listDelete = await Expense.findByIdAndDelete(req.params.Id);
        res.status(200).json({ message: "Your Expense Deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    } 
};