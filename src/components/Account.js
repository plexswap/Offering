import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function Account() {
  const { account } = useContext(GlobalContext);

  return (
    <div className="btn btn-ghost btn-sm rounded-btn">
        <svg
          height="16" fill="currentColor" class="bi bi-wallet" viewBox="0 0 16 16"> 
          <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" fill="#F5A700"></path>
        </svg>
        <h3 className=' uppercase text-sm font-semibold mb-2 text-[#F5A700]'>
        {account === null
          ? ""
          : account
          ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
          : ""}
        </h3>

    </div>
  );
}


