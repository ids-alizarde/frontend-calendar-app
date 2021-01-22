import { Constants } from '../services/Constants';


const initialState = {
    modalOpen: false,
}

export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case Constants.UIOpenModal:
            
            return{
                ...state,
                modalOpen: true
            }

        case Constants.UICloseModal:
            
            return{
                ...state,
                modalOpen: false
            }
    
        default:
            return state;
    }
}