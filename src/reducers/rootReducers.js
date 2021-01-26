import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { calendarReducer } from './calendarReducer';
import { uiReducer } from './uiReducer';


export const rootReducers = combineReducers({
    UI: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
});