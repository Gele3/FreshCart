import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../context/WishlistContext";
import Loading from "../Loading/Loading";
import { CartContext } from "../context/CartContext";

export default function Wishlist() {
  let { wishlist, loading, removeFromWishlist, getWishlist, wishlistCount } =
    useContext(WishlistContext);

  let { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    getWishlist();
  }, [wishlistCount]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : Array.isArray(wishlist) && wishlist.length !== 0 ? (
        <div className="container mx-auto bg-gray-50 p-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
            My Wish List
          </h2>
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-lg font-semibold text-gray-700">Product</th>
                <th className="p-4 text-lg font-semibold text-gray-700">Price</th>
                <th className="p-4 text-lg font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((product) => (
                <tr key={product.id} className="border-b-2 border-gray-200 hover:bg-gray-100 transition-colors">
                  <td className="p-6 flex items-center">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-16 h-16 mr-4 object-cover"
                    />
                    <span className="text-gray-900 font-medium">{product.title}</span>
                  </td>
                  <td className="p-6 text-gray-700">{product.price} EGP</td>
                  <td className="p-6">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <i className="fa fa-trash mr-1"></i>
                        Remove
                      </button>
                      <button
                        onClick={() => addProductToCart(product.id)}
                        className="text-green-500 hover:text-green-700 transition-colors"
                      >
                        <i className="fa-solid fa-cart-shopping mr-1"></i>
                        Add to Cart
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="text-3xl text-center my-36">Your Wishlist Is Empty</h3>
      )}
    </>
  );
}
