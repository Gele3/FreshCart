import React from "react";
import payPal from "../../assets/images/PayPal.svg.png";
import amazonPay from "../../assets/images/Amazon_Pay_logo.svg.png";
import americanExpress from "../../assets/images/American-Express-Color.png";
import masterCard from "../../assets/images/MasterCard_Logo.svg.png";
import apple from "../../assets/images/apple.webp";
import googlePlay from "../../assets/images/en_badge_web_generic.png";
import logo from "../../assets/images/freshcart-logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
export default function Footer() {
  function sendData() {
    emailjs
      .send(
        "service_sm4r3rc",
        "template_7vx0ycr",
        { user_mail: formik.values.user_mail },
        {
          publicKey: "bd__HK1SGi_wtWEev",
        }
      )
      .then(
        () => {
          toast.success("Thanks for contact us");
        },
        (error) => {
          toast.error(error);
        }
      );
    setTimeout(() => {
      formik.handleReset();
    }, 1000);
  }

  let validationSchema = Yup.object().shape({
    user_mail: Yup.string().required().email(),
  });

  let formik = useFormik({
    initialValues: {
      user_mail: "",
    },
    onSubmit: sendData,
    validationSchema,
  });

  return (
    <>
      <div className="footer bg-gray-200 py-12 mt-8 ">
        <div className="container  mx-auto">          
          <div className="logo">
            <img src={logo} className="w-36 ps-7 md:ps-4" alt="logo" />
          </div>

          <div className="flex my-4 items-center justify-between flex-wrap  border-gray-300 border-y py-6">
            <div className="flex items-center justify-center w-full xl:w-auto gap-2 flex-wrap ps-4">
              <h3 className="capitalize text-xl text-center">
                payment partners
              </h3>
              <img
                src={americanExpress}
                className="w-12"
                alt="americanExpress"
              />
              <img src={amazonPay} className="w-12" alt="amazonPay" />
              <img src={payPal} className="w-12" alt="payPal" />
              <img src={masterCard} className="w-12" alt="masterCard" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
