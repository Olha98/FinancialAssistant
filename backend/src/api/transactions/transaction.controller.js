const { TransactionModel } = require('./transaction.model');
const { expensesCategories } = require('../dataset');

const createTransaction = async (req, res) => {
  const { body, user } = req;
  const userId = user._id;
  const info = { ...body, userId };
  const newTransaction = await TransactionModel.createTransaction(info);
  return res.status(201).json({
    status: 'success',
    transaction: newTransaction,
  });
};

const getTransactionCategories = (_, res) => {
  const categories = Object.values(expensesCategories);
  return res.json({
    categories,
  });
};

const getListExpensesMonth = async (req, res) => {
  const { user } = req;
  let { page, limit, month, year } = req.query;
  let pagination = true;
  if (!limit) {
    pagination = false;
    limit = 10;
  }
  if (!page) {
    page = 1;
  }
  const today = new Date();
  if (!year) {
    year = today.getFullYear();
  }
  if (!month) {
    month = today.getMonth() + 1;
  }
  const startDate = new Date(year, month - 1);
  const endDate = new Date(year, month);
  const query = {
    userId: user._id,
    transactionDate: { $gte: startDate, $lt: endDate },
    type: 'EXPENSE',
  };

  const {
    totalAmount,
    totalCount,
    categories,
  } = await TransactionModel.getStatsMonthExpenses(query);
  const countPages = Math.ceil(totalCount / limit);

  const options = {
    select: '_id amount category comment transactionDate',
    page,
    limit,
    pagination,
  };
  const { docs } = await TransactionModel.paginate(query, options);

  return res.json({
    expenses: docs,
    categories,
    countPages,
    totalCount,
    totalAmount,
  });
};

const updateTransaction = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'missing fields' });
  }
  const { transactionId } = req.params;
  const transaction = await TransactionModel.findByIdAndUpdate(
    transactionId,
    req.body,
    {
      new: true,
    },
  );
  if (!transaction) {
    return next(new AppError(`No transactionId found with that ID`, 404));
  }
  return res.json(transaction);
};

module.exports = {
  createTransaction,
  getTransactionCategories,
  getListExpensesMonth,
  updateTransaction,
};
