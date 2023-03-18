import { React, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CotPic from "./Pics/Cot_panorama.png";
import CotSeal from "./Pics/Cot_seal.png";
import CotBrgy from "./Pics/Cotbrgy.png";
import PreRegister from "./Pre-Register.jsx";

export default function Logmein() {
  return (
    <div className="bg-none h-screen flex justify-center sm:items-center ">
      <Image
        className="absolute w-screen relative"
        src={CotPic}
        layout="fill"
        alt=" "
      />
      <PreRegister />
    </div>
  );
}
