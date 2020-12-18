import React from 'react';
import ExpenseListItem from '../ExpenseListItem/ExpenseListItem';
import useReduxState from '../../../hooks/useReduxState';
import useExpense from '../hooks/useExpense';
import { Button, ExpensesList } from './expenseListStyled';

const ExpenseList = ({ date }) => {
  const { page, loadMore, getDate } = useExpense(date);

  const { userTransactions } = useReduxState();
  const { expenses, expenseStats } = userTransactions;
  return (
    expenses.length > 0 &&
    expenseStats && (
      <>
        <ExpensesList>
          {expenses.map(expense => (
            <ExpenseListItem
              date={getDate(expense.transactionDate)}
              key={expense._id}
              expense={expense}
            />
          ))}
        </ExpensesList>
        {page < expenseStats.countPages && (
          <Button onClick={loadMore}>...</Button>
        )}
      </>
    )
  );
};

export default ExpenseList;
