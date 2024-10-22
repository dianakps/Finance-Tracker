"use client";
import { currencyFormatter } from "../lib/utils";
import ExpenseCategory from "../components/ExpenseCategory";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart, Doughnut } from "react-chartjs-2";
import Modal from "../components/Modal";
import { useState, useRef, useEffect } from "react";
import IncomeCategory from "../components/IncomeCategory";
ChartJs.register(ArcElement, Tooltip, Legend);

export default function Home() {
  // Income side modal
  const [showAddIncome, setAshowAddIncome] = useState(false);
  const amountRefIncome = useRef();
  const descriptionRefIncome = useRef();

  // Expense side modal
  const [showAddExpense, setAshowAddExpense] = useState(false);
  const amountRefExpense = useRef();
  const descriptionRefExpense = useRef();
  const colorRef = useRef();

  // Fetching income data from backend
  const [incomeData, setIncomeData] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/income/fetch")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setIncomeData(data);
          let sum = 0;
          data.forEach((a) => {
            sum += a.amount;
          });
          setBalance(sum);
        }
      });
  }, []);

  //Fetching expenses data from backend
  const [expensesData, setExpensesData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/expense/fetch")
      .then((res) => res.json())
      .then((data) => setExpensesData(data));
  });

  // Income -  Handling Submit
  const handleForm = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRefIncome.current.value,
      description: descriptionRefIncome.current.value,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/income/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIncome),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error " + error);
    }
  };

  // Expense -  Handling Submit
  const handleFormExpense = async (e) => {
    e.preventDefault();

    const newExpense = {
      amount: amountRefExpense.current.value,
      description: descriptionRefExpense.current.value,
      color: colorRef.current.value,
      date: new Date().toISOString(),
    };

    console.log(newExpense);

    try {
      const response = await fetch("http://localhost:5000/expense/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error " + error);
    }
  };

  return (
    <>
      {/* Income */}
      <Modal show={showAddIncome} onClose={setAshowAddIncome}>
        <form onSubmit={handleForm}>
          <div className="flex flex-col gap-4 py-2">
            <label htmlFor="amount">Income Amount</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              type="number"
              ref={amountRefIncome}
              min={0.01}
              step={0.01}
              placeholder="Enter income amount"
              required
            />
          </div>

          <div className="flex flex-col gap-4 py-2">
            <label htmlFor="amount">Description</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              name="description"
              ref={descriptionRefIncome}
              type="text"
              placeholder="Enter income description"
              required
            />
          </div>
          <div className="py-5">
            <button type="submit" className="btn ">
              Add
            </button>
          </div>
          <div className=" h-40 overflow-y-scroll ">
            <h4>Income History</h4>
            <div className="flex flex-col gap-2 p-10">
              {incomeData.map((e) => {
                return (
                  <IncomeCategory
                    key={e.id}
                    date={e.date}
                    title={e.description}
                    amount={e.amount}
                  />
                );
              })}
            </div>
          </div>
        </form>
      </Modal>
      {/* Expenses */}
      <Modal show={showAddExpense} onClose={setAshowAddExpense}>
        <form onSubmit={handleFormExpense}>
          <div className="flex flex-col gap-4 py-2">
            <label htmlFor="amount">Expense Amount</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              type="number"
              ref={amountRefExpense}
              min={0.01}
              step={0.01}
              placeholder="Enter income amount"
              required
            />
          </div>

          <div className="flex flex-col gap-4 py-2">
            <label htmlFor="amount"> Description</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              name="description"
              ref={descriptionRefExpense}
              type="text"
              placeholder="Enter income description"
              required
            />
          </div>
          <div className="flex gap-4 py-2">
            <label htmlFor="color">Select color</label>
            <input
              className=" bg-slate-500 w-16 h-7 "
              type="color"
              ref={colorRef}
            />
          </div>
          <div className="py-5">
            <button type="submit" className="btn ">
              Add
            </button>
          </div>
        </form>
      </Modal>

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button className="btn " onClick={() => setAshowAddExpense(true)}>
            + Expenses
          </button>
          <button className="btn" onClick={() => setAshowAddIncome(true)}>
            + Income
          </button>
        </section>
        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expensesData.map((e) => {
              return (
                <ExpenseCategory
                  key={e.id}
                  color={e.color}
                  title={e.description}
                  amount={e.amount}
                />
              );
            })}
          </div>
        </section>
        {/* Chart */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expensesData.map((e) => e.description),
                datasets: [
                  {
                    label: "Expenses",
                    data: expensesData.map((e) => e.amount),
                    backgroundColor: expensesData.map((e) => e.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
