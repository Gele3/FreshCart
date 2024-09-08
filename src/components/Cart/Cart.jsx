import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let {
    cart,
    getCartItems,
    loading,
    updateProductCount,
    removeProduct,
    clearCart, // Add clearCart function from context (assumed to be available)
    totalPrise,
    cartId,
  } = useContext(CartContext);
  let navigate = useNavigate();

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : cart ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5">
          {cart.length > 0 ? (
            <>
              <table className="w-5/6 mx-auto text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={product.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateProductCount(
                                product.product.id,
                                product.count - 1
                              )
                            }
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span
                              id="first_product"
                              className="bg-gray-50  border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 "
                            >
                              {product.count}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              updateProductCount(
                                product.product.id,
                                product.count + 1
                              )
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeProduct(product.product.id)}
                          className="font-medium text-red-600"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-4 text-2xl text-center">Total Price</td>
                    <td
                      colSpan={3}
                      className="py-4 text-2xl text-end text-mainColor"
                    >
                      {totalPrise} EGP
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between items-center my-4">
                <button
                  onClick={() => clearCart()} // Clear cart function to be triggered here
                  type="button"
                  className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate(`/checkout/${cartId}`)}
                  type="submit"
                  className="text-white duration-300 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                >
                  Check Out
                </button>
              </div>
            </>
          ) : (
            <h3 className="text-3xl text-center my-36">Your Cart Is Empty</h3>
          )}
        </div>
      ) : (
        <h3 className="text-3xl text-center my-36">Your Cart Is Empty</h3>
      )}
    </>
  );
}
