export const AppReducer = ( state, action ) => {
    switch(action.type) {
        case 'DELETE_ACCOUNT':
            return {
                ...state,
                account: null
            }
        case 'ADD_ACCOUNT':
            return {
                ...state,
                account: action.payload
            }

        case 'UPDATE_NATIVE_BALANCE':
            return {
                ...state,
                nativeBalance: action.payload
            }
        
        case 'UPDATE_TOKEN_BALANCE':
            return {
                ...state,
                tokenBalance: action.payload
            }

        case 'UPDATE_SALE_PRICE':
            return {
                ...state,
                salePrice: action.payload
            }

        case 'UPDATE_REMAINING_TOKENS':
            return {
                ...state,
                remainingTokens: action.payload
            }

        case 'UPDATE_PROVIDER':
            return {
                ...state,
                provider: action.payload
            }
        default:
            return state;
    };
}