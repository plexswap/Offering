import React, { createContext, useReducer } from "react";
import { AppReducer } from './AppReducer'

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
            }
        }
        >
            {children}
        </GlobalContext.Provider>
    )
}