import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import Web3Modal from 'web3modal';
import { GlobalContext } from "../context/GlobalContext";
import logo from './../assets/Logo_Symplexia_Retina_440x106-Base.png';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { chainInfo } from "../config/chains";
import { Account } from "./Account";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,             // required
    options: {
      rpc: {
        56: "https://bsc-mainnet.nodereal.io/v1/e44eb77ea3f94d11b77ef27be519e58d",
        97: "https://bsc-testnet.nodereal.io/v1/bda30ee3f00240008f71e887a77d147a",
        5 : "https://eth-goerli.nodereal.io/v1/e7da0de5463245908c15cedc454e2d1c"
      }
    }
  }
};

const HeaderComponent = ({setError, setErrMsg}) => {

    const { account, addAccount, delAccount, updateProvider, UpdateContractsInfo } = useContext(GlobalContext);

    const connectWallet = async () => {
        const web3modal = new Web3Modal({ providerOptions });
        const instance  = await web3modal.connect();
        const provider  = new ethers.providers.Web3Provider(instance);
        console.log(provider)
        updateProvider(provider)
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        addAccount({ id: address });
        const network = await provider.getNetwork();
        console.log(network)
        if( !chainInfo[network.chainId] ) {
            setError(true) 
            setErrMsg('Contract is not deployed on current network!')
        } else {
            setError(false) 
            setErrMsg('')
            UpdateContractsInfo()
        }
    }

    useEffect(()=>{
        UpdateContractsInfo()
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', accounts => { connectWallet() })
            window.ethereum.on('chainChanged', chainId => { window.location.reload(); })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    return (
       
        <div className="mx-auto py-2 px-4 flex flex-wrap flex-col sm:flex-row justify-between shadow-lg navbar bg-neutral text-neutral-content rounded-box">
            <div className="flex items-center flex-col md:flex-row justify-between">
              <div className="max-w-[160px] ">
                <img src={logo} alt="logo" />
              </div>
              <a href="https://swap.plexfinance.us/"
                className='text-sm pt-2 ml-4 pl-14 font-bold text-[#52585b] hover:text-[#BDC2C4]'>Financial Center
              </a>
            </div>
            <div className="flex items-center flex-col md:flex-row">
            <Account />
            <div className="ml-4 mt-4 sm:mt-0">
                {account ? (
                    <div className="flex items-center flex-col">
                        <button className="px-6 py-1 bg-[#F5A700] hover:bg-[#FFC11A] rounded-3xl text-white font-bold" onClick={() => {
                            delAccount()
                            updateProvider(null)
                            window.location.reload()
                        }}>Disconnect Wallet</button>
                    </div>
                ) : (
                    <button className="px-6 py-1 bg-[#F5A700] hover:bg-[#FFC11A] rounded-3xl text-white font-bold" onClick={() => connectWallet()}>Connect Wallet</button>
                )}
            </div>
            </div>
                       
        </div>
    );
};

export default HeaderComponent;
