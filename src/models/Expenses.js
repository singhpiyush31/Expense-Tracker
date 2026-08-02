const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 60,
    },
    amount: {
    type: Number,
    required: true,
    },
    category: {
        type: String,
        required: true,
        enum: 
            ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Health", "Education", "Others"],
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: 
            ["UPI", "Cash", "Debit Card", "Credit Card", "Net Banking"],
    },
    date: {
        type: Date,
        required: true,
    },
    note: {
        type: String,
    },
}, { timestamps: true} )

module.exports = mongoose.model("Expense", expensesSchema);