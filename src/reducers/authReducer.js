import { Constants } from '../services/Constants';

const initialState = {
    checking: true,
    // uid: null,
    // name: null
}


export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case Constants.authLogin:
            
            return {
                ...state,
                ...action.payload,
                checking: false,
            }
        case Constants.authCheckingFinished:

            return {
                ...state,
                checking: false
            }

        case Constants.authLogout:
            
            return {
                checking: false
            }
    
        default:
            return state;
    }
}
