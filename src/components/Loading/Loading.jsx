import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Loading() {
  return <div className="flex justify-center items-center py-6">
  <TailSpin
  visible={true}
  ariaLabel="tail-spin-loading"
  width="80"
  height="80"
  radius="1"
  color="##f97316"
  wrapperStyle={{}}
  wrapperClass=""
/>
</div>
}
