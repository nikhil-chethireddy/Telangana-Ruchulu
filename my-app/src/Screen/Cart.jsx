import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import trash from "../trash.svg";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    console.log("Order Response", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col" className="text-success">
                #
              </th>
              <th scope="col" className="text-success">
                Name
              </th>
              <th scope="col" className="text-success">
                Quantity
              </th>
              <th scope="col" className="text-success">
                Option
              </th>
              <th scope="col" className="text-success">
                Amount
              </th>
              <th scope="col" className="text-success"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row" className="text-white">
                  {index + 1}{" "}
                </th>
                <td className="text-white">{food.name}</td>
                <td className="text-white">{food.qty}</td>
                <td className="text-white">{food.size}</td>
                <td className="text-white">{food.price}</td>
                <td className="text-white">
                  <button type="button" className="btn p-0 bg-white">
                    <img
                      alt="delete"
                      src={trash}
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
