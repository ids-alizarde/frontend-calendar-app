import { fetchWithOutToken, fetchWithToken } from '../helpers/fetch';
import { Constants } from '../services/Constants';
import Swal from 'sweetalert2';
import { eventsCleaned } from './calendarEvents';

export const startLogin = ( email, password ) => {
    
    return async ( dispatch ) => {
        
        const resp = await fetchWithOutToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();

        if ( body.ok ) {

            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));

        } else {

            Swal.fire( 'Error', body.msg, 'error' );
        }

    }
}

const login = ( user ) => ({

    type: Constants.authLogin,
    payload: user

});

export const startRegister = ( email, password, name ) => {
    
    return async ( dispatch ) => {
        
        const resp = await fetchWithOutToken( 'auth/register', { email, password, name }, 'POST' );
        const body = await resp.json();

        if ( body.ok ) {

            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));

        } else {

            Swal.fire( 'Error', body.msg, 'error' );
        }

    }
}

export const startChecking = () => {

    return async ( dispatch ) => {

        const resp = await fetchWithToken( 'auth/renovate' );
        const body = await resp.json();

        if ( body.ok ) {

            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));

        } else {

            dispatch( finishChecking() );
        }
    }
}

const finishChecking = () => ({
    type: Constants.authCheckingFinished
})

export const startLogout = () => {
    
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( eventsCleaned() );
        dispatch( logout() );
    }
}

const logout = () => {

    return {
        type: Constants.authLogout
    }
}
