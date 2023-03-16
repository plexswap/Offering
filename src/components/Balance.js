import { formatEther } from "@ethersproject/units";
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function Balance() {
  const { nativeBalance } = useContext(GlobalContext);

  return (
    <div className="btn btn-ghost btn-sm rounded-btn">
      <span>Balance</span>
      <svg
        className="w-6 h-6 hover:text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
        />
      </svg>
      <span> { nativeBalance } </span>
    </div>
  );
}
