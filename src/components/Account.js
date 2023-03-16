import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function Account() {
  const { account } = useContext(GlobalContext);

  return (
    <div className="btn btn-ghost btn-sm rounded-btn">
      <span>Account</span>
      <span role="img" aria-label="robot">
       </span>
      <span>
        {account === null
          ? "-"
          : account
          ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
          : ""}
      </span>
    </div>
  );
}
