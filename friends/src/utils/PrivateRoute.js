import React from 'react';
import { Route } from 'react-router-dom'; //can use Redirect as well

// 1. Wrap a plain route component and pass in the same props.
// 2. Check to see if we are logged in, and if so, render component 
// 3. If the user is not logged in, we redirect to login


const PrivateRoute = ({component: Component, ...rest}) => {

    const redirect = () => {
        window.location.href = '/login'
    }
    
    return  (<Route {...rest} render={
        (props) => {
            if (localStorage.getItem('token')) {
            return <Component {...props}/>
            } else {
                return(
                    <div>
                        <h1>Log in to view this page</h1>
                       <button onClick={redirect}> Click here to log in</button>
                    </div>
                )
            }
        }
    }
    />);

}

export default PrivateRoute;