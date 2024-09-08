import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

export default function CheckOut() {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  let validationSchema = Yup.object().shape({
    details: Yup.string().required("Details is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(002|\+20)?01[0125][0-9]{8}$/, "Ex:(01111111111)"),
    city: Yup.string().required("Ex:(cairo)"),
  });

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function PayNow(shippingAddress) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://e-commerce-git-main-muhamedmahmuds-projects.vercel.app/`,
        {
          shippingAddress,
        },
        { headers }
      );

      console.log(data);

      location.href = data.session.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: PayNow,
  });

  return (
    <>
      <div className="md:w-1/2 mx-auto my-8 py-7">
        <h3 className="text-3xl font-semibold mb-4">Check Out</h3>

        <form className="mx-auto" onSubmit={formik.handleSubmit}>
          <div className="relative   my-6 group">
            <input
              type="text"
              name="details"
              id="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Details
            </label>
          </div>
          {formik.errors.details && formik.touched.details && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {formik.errors.details}
            </div>
          )}

          <div className="relative   my-6 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          )}

          <div className="relative   my-6 group">
            <input
              type="text"
              name="city"
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
          </div>
          {formik.errors.city && formik.touched.city && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              {formik.errors.city}
            </div>
          )}

          {loading ? (
            <button className="text-white duration-300 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              <i className="fas fa-spinner fa-spin-pulse"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white duration-300 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Pay Now
            </button>
          )}
        </form>
      </div>
    </>
  );
}
