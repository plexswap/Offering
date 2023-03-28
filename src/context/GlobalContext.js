import { ethers } from "ethers";
import React, { createContext, useReducer } from "react";
import { AppReducer } from './AppReducer'
import TokenABI from '../abi/SymplexiaToken.json'
import SalesVaultABI from '../abi/SalesVault.json'
import { baseTokenAddress, salesVaultAddress }  from "../config/contracts";

const initialState = {
    account: null, 
    nativeBalance: null, 
    tokenBalance: null, 
    salePrice: null,
    remainingTokens: null, 
    provider: null
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const delAccount = () => {
        dispatch({
            type: 'DELETE_ACCOUNT'
        })
    }

    const addAccount = (account) => {
        dispatch({
            type: 'ADD_ACCOUNT',
            payload: account.id
        })
    }

    const updateTokenBalance = (balance) => {
        dispatch({
            type: 'UPDATE_TOKEN_BALANCE',
            payload: balance
        })
    }

    const updateNativeBalance = (balance) => {
        dispatch({
            type: 'UPDATE_NATIVE_BALANCE',
            payload: balance
        })
    }

    const updateSalePrice = (saleprice) => {
        dispatch({
            type: 'UPDATE_SALE_PRICE',
            payload: saleprice
        })
    }

    const updateRemainingTokens = (remainingTokens) => {
        dispatch({
            type: 'UPDATE_REMAINING_TOKENS',
            payload: remainingTokens
        })
    }

    const updateProvider = (provider) => {
        dispatch({
            type: 'UPDATE_PROVIDER',
            payload: provider
        })
    }

    const UpdateContractsInfo = async () => {
        try {
            const provider = state.provider;
            const signer   = provider.getSigner();
            const address  = await signer.getAddress();
            const network  = await provider.getNetwork();
            const chainId  = network.chainId;

            const nativeBalance = await provider.getBalance(address)
            updateNativeBalance(parseFloat(ethers.utils.formatEther(nativeBalance)).toFixed(4))

            const tokenContract = new ethers.Contract(baseTokenAddress[chainId], TokenABI, signer)
            const balanceOf = await tokenContract.balanceOf(address) 
            updateTokenBalance(ethers.utils.formatUnits(balanceOf, 9))

            const saleContract    = new ethers.Contract(salesVaultAddress[chainId], SalesVaultABI, signer)
            const salePrice       = await saleContract.salePrice()
            updateSalePrice(ethers.utils.formatUnits(salePrice, 9))
            const remainingTokens = await saleContract.remainingTokens()
            updateRemainingTokens(ethers.utils.formatUnits(remainingTokens, 9))

        } catch(e) {
            console.log(e)
        }
    }
    return (
        <GlobalContext.Provider value={
            {
                account: state.account, 
                nativeBalance: state.nativeBalance,
                tokenBalance: state.tokenBalance,
                salePrice: state.salePrice,
                remainingTokens:  state.remainingTokens,
                provider: state.provider,
                delAccount,
                addAccount,
                updateTokenBalance,
                updateNativeBalance,
                updateSalePrice,
                updateRemainingTokens,
                updateProvider,
                UpdateContractsInfo,
            }
        }
        >
            {children}
        </GlobalContext.Provider>
    )
}