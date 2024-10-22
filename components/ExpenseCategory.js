import { useState, useRef } from "react";
import { currencyFormatter } from "../lib/utils";

function ExpenseCategory({ color, title, amount }) {
  const [showBtn, setShowBtn] = useState(false);
  const showHide = () => {
    setShowBtn(true);
  };

  const doubleShowHide = () => {
    setShowBtn(false);
  };

  //Modifing Expenses
  const amountRef = useRef();
  const modExpenses = async () => {
    try {
      const updatedExpense = {
        description: title,
        amount: amountRef.current.value,
      };

      const res = await fetch("http://localhost:5000/expense/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExpense),
      });
    } catch (error) {
      console.log("Error in modifying the expense: " + error);
    }
  };

  // Deleting Expenses
  const deleteExpense = async () => {
    try {
      const expenseToDelete = {
        description: title,
      };
      const res = await fetch("http://localhost:5000/expense/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseToDelete),
      });
    } catch (error) {
      console.log("Error in deleting the expense: " + error);
    }
  };

  return (
    <>
      <button onClick={showHide} onDoubleClick={doubleShowHide}>
        <div className="flex items-center justify-between rounded-full py-4 px-4 bg-cyan-800">
          <div className="flex items-center gap-2">
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ backgroundColor: color }}
            />
            <h4 className="cincometalize">{title}</h4>
          </div>
          <p>{currencyFormatter(amount)}</p>
        </div>
        <div
          className="flex items-center justify-evenly"
          style={{ display: showBtn ? "flex" : "none" }}
        >
          <button
            className="text-red-600"
            style={{ display: showBtn ? "block" : "none" }}
          >
            modify
            <div className="flex justify-center w-52">
              <input
                type="text"
                ref={amountRef}
                placeholder={`${currencyFormatter(amount)}`}
                className=" bg-cyan-800 rounded-full text-center w-20 text-slate-50"
              />
              <button
                className=" bg-cyan-800 rounded-xl text-center w-14 mx-2"
                onClick={modExpenses}
              >
                ok
              </button>
            </div>
          </button>

          <button className="text-red-600" onClick={deleteExpense}>
            delete
          </button>
        </div>
      </button>
    </>
  );
}

export default ExpenseCategory;
