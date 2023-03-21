import { ethers } from 'ethers';
import React, { useContext, useRef, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import SalesVaultABI from '../abi/SalesVault.json';
import CoinABI from '../abi/token.json';
import { baseTokenAddress, salesVaultAddress, baseTokenInfo }  from "../config/contracts";
import { chainInfo }  from "../config/chains";

function Offering() {
    const { account, tokenBalance, nativeBalance, salePrice, remainingTokens, provider } = useContext(GlobalContext);
    const [loading,  setLoading]        = useState(false);
    const [tokenAmount, setTokenAmount] = useState(0);
    const [coinQty,  setCoinAmount]     = useState(0);

    const coinAmount = useRef(null);
    console.log(provider)
    

    const addToken = async () => {
        const network       = await provider.getNetwork();
        const tokenAddress  = baseTokenAddress[network.chainId];
        const tokenSymbol   = baseTokenInfo.Symbol;
        const tokenDecimals = baseTokenInfo.Decimals;
        const tokenImage    = baseTokenInfo.Image;

        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address:  tokenAddress, // The address that the token is at.
                        symbol:   tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image:    tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Something went wrong!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const validatePrice = () => {
        if(parseFloat(coinAmount.current.value) >= 0.01) {
            return true;    
        }
        return false;
    }

    const approveBNB = async (e) => {
        e.preventDefault();
        try {
            if (!window.ethereum) {
                alert('Please install MetaMask');
                return
            }
            if (!account) {
                alert('Please connnect wallet');
                return;
            }
           if(!validatePrice()) {
                alert('Purchase should be made minimum 0.1 BNB');
                return;
            }

            setLoading(true);
            const signer   = provider.getSigner();
            const network  = await provider.getNetwork();
            const nativeContract = new ethers.Contract(chainInfo[network.chainId].native.address, CoinABI, signer);
            const price = ethers.utils.parseEther(coinAmount.current.value);
            const transaction = await nativeContract.approve(salesVaultAddress[network.chainId], price, {from: account});
            await transaction.wait();
            buyToken(price, signer);
        } catch (e) {
            setLoading(false);
        }
    }

    const buyToken = async (price, signer) => {
        try {
            const network  = await provider.getNetwork();
            const contract = new ethers.Contract(salesVaultAddress[network.chainId], SalesVaultABI, provider);
     
            if (nativeBalance < coinAmount.current.value) {
                setLoading(false);
                alert('Insufficient Balance');
                return;
            }

            const transaction = await contract.connect(signer).buyTokens(account, { value: price })
            await transaction.wait()

            setLoading(false);
            alert('purchase done');
        } catch (error) {
            window.alert("User rejected or transaction reverted!")
        }
    }

    const receivedToken = () => {
        setTokenAmount(parseFloat(coinAmount.current.value) * parseFloat(salePrice))
        spentCoin()
    }

    const spentCoin = () => {
        setCoinAmount(tokenAmount / salePrice)
    }


    return (
        <div className="my-11 p-7 flex items-center flex-col md:flex-row justify-between border border-white border-opacity-20 rounded-3xl shadow-xl ">

            <div className="my-10 border p-10 rounded-xl border-white border-opacity-30 border-gray border-opacity-80 shadow-xl  ">

                <form onSubmit={approveBNB}>
                    <div className="my-3">
                        <label className="text-base font-bold text-[#F5A700]">BNB Amount</label>
                        <input ref={coinAmount}  className="w-full h-12 rounded-lg p-2 text-xl focus:outline-none mt-1 bg-white bg-opacity-30 border" 
                           type="number"
                           min="0.1"
                           max="10"
                           step="0.1"
                           required onChange={receivedToken} 
                        />
                    </div>
                    <div className="my-3">
                        <label className="text-base font-bold text-[#F5A700]">PLEX-F Amount</label>
                        <input className="w-full h-12 rounded-lg p-2 text-xl focus:outline-none mt-1 border" type="text" value={tokenAmount ? tokenAmount : 0} disabled onChange={spentCoin}/>
                    </div>

                    <div className="mt-10">
                        <button disabled={loading} className="w-full py-2 px-6 uppercase bg-[#F5A700] hover:bg-[#FFC11A] rounded  font-bold text-white">{loading ? 'Pending' : 'Buy Now'}</button>

                    </div>
                </form>
            </div>
            <div className="before:fixed before:top-0 before:left-0 before:w-full page__bg -z-30"></div>
            <div className="md:pl-8 text-center md:text-left md:mr-2">
                <h1 className="text-base sm:text-xl font-bold uppercase text-[#F5A700]" >Special Sales Offering</h1>
                <h1 className="text-2xl sm:text-4xl font-bold uppercase text-black" >Symplexia Financial Ecosystem</h1>
                <button className='mt-5 px-6 py-2 bg-[#F5A700] text-white rounded font-bold hover:bg-[#FFC11A]' onClick={() => addToken()}>Add PLEX-F to your MetaMask</button>

                <div className='mt-10 text-left'>
                    <h3 className=' uppercase text-sm font-semibold mb-2 text-[#F5A700]'>Instructions:</h3>
                    <ul className='text-sm list-outside list-disc'>
                        <li className='ml-4'>Minimum purchase allowed: 0.1 BNB</li>
                        <li className='ml-4'>BNB Balance: {nativeBalance}</li>
                        <li className='ml-4'>PLEX-F Balance: {tokenBalance} </li>
                        <li className='ml-4'>Sale Price: {salePrice} </li>
                        <li className='ml-4'>Available for Sale: {remainingTokens} </li>
                    </ul>
                </div>
            </div>
        </div>
        
    );
}

export default Offering;
