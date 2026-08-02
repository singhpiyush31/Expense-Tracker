const express = require('express');

const userAuth = require('../middlewares/authentication');
const { create, expenseList, listById } = require('../controllers/expense');


const expenseRouter = express.Router();

expenseRouter.post("/create" , userAuth, create);
expenseRouter.get("/", userAuth, expenseList);
expenseRouter.get("/:Id", userAuth, listById);




module.exports = expenseRouter;