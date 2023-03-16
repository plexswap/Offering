import HeaderComponent from "./components/Header";
import Offering from "./components/Offering";
import FooterComponent from './components/Footer';
import { useEffect, useState } from "react";
import { GlobalProvider } from "./context/GlobalContext";

import AlertBox from "./components/AlertBox";
import React from "react";

function App() {
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!window.ethereum) {
      alert('Please install MetaMask');
    }

  }, []);
  return (
    <GlobalProvider>
      <HeaderComponent setError={setError} setErrMsg={setErrMsg}/>
      <div className="container mx-auto px-10 max-w-7xl">
        <div className="min-h-screen">
          <Offering />
        </div>
      </div>
      {error && (<AlertBox  msg={errMsg}/>)}
      <FooterComponent />
    </GlobalProvider>
  );
}

export default App;
