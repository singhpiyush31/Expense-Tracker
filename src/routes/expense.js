const express = require('express');

const Expense = require('../models/Expenses');
const User = require('../models/user');
const userAuth = require('../middlewares/authentication');


const expenseRouter = express.Router();

expenseRouter.post("/create" , userAuth, async (req,res) => {
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
});



module.exports = expenseRouter;