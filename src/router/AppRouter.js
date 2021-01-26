import Swal from 'sweetalert2';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth );

    useEffect(() => {
       
        dispatch( startChecking() );

    }, [ dispatch ])

    if ( checking ) {
        
        Swal.fire({
            title: 'Cargando..........',
            timerProgressBar: true,
            didOpen: () => {

                Swal.showLoading()
            }
        })
        
    } else {

        Swal.close();
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes exact path="/login" component={ LoginScreen } isLoggedIn={ !!uid } ></PublicRoutes>
                    <PrivateRoutes exact path="/" component={ CalendarScreen } isLoggedIn={ !!uid } ></PrivateRoutes>
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}

