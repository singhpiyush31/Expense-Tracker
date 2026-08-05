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

        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;
        const totalExpenses = await Expense.countDocuments({ user: req.user._id });
        const totalPages = Math.ceil(totalExpenses / limit);

        const list = await Expense.find({ user: req.user._id }).skip(skip).limit(limit);
        res.status(200).json({ message: "Your Expenses: ", list, pages: totalPages, limit });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.listById = async (req,res) => {
    try {
        const expenseId = req.params.Id;
        const loggedInUserId = req.user._id;

        const listId = await Expense.findOne({ user: loggedInUserId, _id: expenseId });

        if(!listId) {
            return res.status(404).json({ message: "Expense not found!" });
        }

        res.status(200).json({ message: "Your Expense", listId });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

exports.updateList = async (req,res) => {
    try {
        const { title, category, amount, paymentMethod, date, note } = req.body;
        const userId = req.user._id;
        const expenseId = req.params.Id;

        const listEdit = await Expense.findOneAndUpdate(
            { user: userId, _id: expenseId },
            { title, category, amount, paymentMethod, date, note },
            { new: true, runValidators: true }
        );

        if(!listEdit) {
            return res.status(404).json({ message: "Expense not found!" });
        }

        res.status(200).json({ message: "Expense updated successfully!", listEdit });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

exports.deleteList = async (req,res) => {
    try {
        const userId = req.user._id;
        const expenseId = req.params.Id;

        const listDelete = await Expense.findOneAndDelete({ user: userId, _id: expenseId });

        if (!listDelete) {
            return res.status(404).json({ message: "Expense not found!" });
        }
        res.status(200).json({ message: "Your Expense Deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    } 
};