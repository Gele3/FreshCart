import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useFormik } from "formik";

export default function AllProducts() {
  let { addProductToCart, loading } = useContext(CartContext);
  const { addToWishlist, wishlistCheck, removeFromWishlist } =
    useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);
  const [load, setLoad] = useState(false);

  async function getProducts() {
    try {
      setLoad(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
      setSearch(data.data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  }


  useEffect(() => {
    getProducts();
  }, [wishlistCheck]);
  return (
    <>
      {!load ? (
        <>


          <div className="products px-5">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {search.map((product) => (
                <div
                  key={product.id}
                  className="product relative rounded-lg overflow-hidden duration-500 cursor-pointer flex flex-col justify-between"
                >
                  <i
                    onClick={() => {
                      wishlistCheck.some((i) => i === product.id)
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product.id);
                    }}
                    className={`fa-solid fa-heart ${wishlistCheck.some((i) => i == product.id)
                        ? "text-red-500 "
                        : "hover:text-red-500"
                      } absolute bottom-4 right-2 duration-300 text-2xl`}
                  ></i>
                  <Link to={`details/${product.id}`}>
                    <div>
                      <img
                        loading="lazy"
                        src={product.imageCover}
                        className="w-full block"
                        alt={product.title}
                      />
                    </div>
                    <div className="p-2">
                      <h2 className="text-green-500">
                        {product.category.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {product.description.split(" ").slice(0, 3).join(" ")}
                      </p>
                      <div className="rating flex justify-between items-center my-2 ">
                        <span>{product.price}EGP</span>
                        <span>
                          <i className="fa-solid fa-star rating-color"></i>
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-2 pt-0">
                    {loading ? (
                      <div className="flex justify-center">
                      <button
                        type="button"
                        className="bg-green-500 w-1/2 p-2 rounded text-white btn"
                      >
                        <i className="fas fa-spinner fa-spin-pulse"></i>
                      </button>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <button
                          onClick={() => addProductToCart(product.id)}
                          className="bg-green-500 w-1/2 p-2 rounded text-white btn"
                        >
                          + Add
                        </button>
                      </div>

                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
