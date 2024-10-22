import { useState } from "react";
import { currencyFormatter } from "../lib/utils";

function IncomeCategory({ title, amount, date }) {
  //Showing - Hiding options
  const [show, setShow] = useState(false);
  const showOptions = () => {
    setShow(!show);
  };

  //Deleting income
  const deleteIncome = async () => {
    try {
      const incomeToDelete = {
        description: title,
      };
      const res = await fetch("http://localhost:5000/income/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomeToDelete),
      });
    } catch (error) {
      console.log("Error in deleting income: " + error);
    }
  };

  return (
    <>
      <button
        className="flex justify-between px-2 w-full rounded-xl text-sm  bg-slate-600"
        onClick={showOptions}
      >
        <div>
          <p className="font-semibold text-start">{title}</p>
          <p className=" font-extralight ">{date.toString()}</p>
        </div>
        <div className="flex justify-evenly">
          <p>{currencyFormatter(amount)}</p>
        </div>
      </button>
      <div
        className="flex justify-evenly"
        style={{ display: show ? "flex" : "none" }}
      >
        <button onClick={deleteIncome}>delete</button>
      </div>
    </>
  );
}

export default IncomeCategory;
