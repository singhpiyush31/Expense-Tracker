const express = require('express');

const userAuth = require('../middlewares/authentication');
const { create, expenseList } = require('../controllers/expense');


const expenseRouter = express.Router();

expenseRouter.post("/create" , userAuth, create);
expenseRouter.get("/", userAuth, expenseList)



module.exports = expenseRouter;