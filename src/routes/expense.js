const express = require('express');

const userAuth = require('../middlewares/authentication');
const { create, expenseList, listById, updateList, deleteList, total } = require('../controllers/expense');


const expenseRouter = express.Router();

expenseRouter.post("/create" , userAuth, create);
expenseRouter.get("/", userAuth, expenseList);
expenseRouter.get("/total", userAuth, total);
expenseRouter.get("/:Id", userAuth, listById);
expenseRouter.patch("/:Id", userAuth, updateList);
expenseRouter.delete("/:Id", userAuth, deleteList);




module.exports = expenseRouter;