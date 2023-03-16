import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import Web3Modal from 'web3modal';
import { GlobalContext } from "../context/GlobalContext";
import logo from './../assets/Logo_Symplexia_Retina_440x106-Base.png';
import TokenABI from '../abi/SymplexiaToken.json'
import SalesVaultABI from '../abi/SalesVault.json'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { baseTokenAddress, salesVaultAddress }  from "../config/contracts";
import { chainInfo } from "../config/chains";
import { Account } from "./Account";
import { Balance } from "./Balance";
import { ChainId } from "./ChainId";


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

    const [chainId, setChainId] = useState(56)

    const { account, addAccount, delAccount, 
            updateTokenBalance, updateNativeBalance, updateSalePrice, 
            updateRemainingTokens, updateProvider } = useContext(GlobalContext);

    const getTokenBalance = async(signer, address) => {
        const tokenContract = new ethers.Contract(baseTokenAddress[chainId], TokenABI, signer)
        const balanceOf = await tokenContract.balanceOf(address) 
        updateTokenBalance(ethers.utils.formatUnits(balanceOf, 9))
        console.log(ethers.utils.formatUnits(balanceOf, 9))
    }

    const getSalePrice = async(signer) => {
        const saleContract    = new ethers.Contract(salesVaultAddress[chainId], SalesVaultABI, signer)
        const salePrice       = await saleContract.salePrice()
        updateSalePrice(ethers.utils.formatUnits(salePrice, 9))
        console.log(ethers.utils.formatUnits(salePrice, 9))
    }

    const getRemainingTokens = async(signer) => {
        const saleContract    = new ethers.Contract(salesVaultAddress[chainId], SalesVaultABI, signer)
        const remainingTokens = await saleContract.remainingTokens()
        updateRemainingTokens(ethers.utils.formatUnits(remainingTokens, 9))
        console.log(ethers.utils.formatUnits(remainingTokens, 9))
    }

    const getNativeBalance = async (provider, address) => {
        const nativeBalance = await provider.getBalance(address)
        updateNativeBalance(parseFloat(ethers.utils.formatEther(nativeBalance)).toFixed(4))
        console.log(parseFloat(ethers.utils.formatEther(nativeBalance)).toFixed(4))
    }

    const connectWallet = async () => {
        const web3modal = new Web3Modal({ providerOptions });
        const instance = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        console.log(provider)
        updateProvider(provider)
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        addAccount({ id: address });
        const network = await provider.getNetwork();
        setChainId(network.chainId)
        console.log(network)
        if( !chainInfo[chainId] ) {
            setError(true) 
            setErrMsg('Contract is not deployed on current network!')
        } else {
            setError(false) 
            setErrMsg('')
            getTokenBalance(signer, address)
            getNativeBalance(provider, address)
            getSalePrice(signer)
            getRemainingTokens(signer)
        }
        
    }
    useEffect(()=>{
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', accounts => {
                addAccount({ id: accounts[0] })
                connectWallet()
            })
            window.ethereum.on('chainChanged', chainId => {
                window.location.reload();
            })
        }
    }, [account]);
    return (
       
        <div className="mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row justify-between shadow-lg navbar bg-neutral text-neutral-content rounded-box">
            <div className="max-w-[180px] ">
                <img src={logo} alt="logo" />
            </div>
            
            <div className="mt-4 sm:mt-0">
                {account ? (
                    <div className="flex items-center flex-col">
                        <button className="px-6 py-2 bg-[#F5A700] hover:bg-[#FFC11A] rounded text-white font-bold" onClick={() => {
                            delAccount()
                            updateProvider(null)
                        }}>Disconnect Wallet</button>
                    </div>
                ) : (
                    <button className="px-6 py-2 bg-[#F5A700] hover:bg-[#FFC11A] rounded text-white font-bold" onClick={() => connectWallet()}>Connect Wallet</button>
                )}

            </div>
                       
        </div>
    );
};

export default HeaderComponent;
