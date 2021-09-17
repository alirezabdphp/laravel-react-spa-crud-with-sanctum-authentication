import {useHistory} from "react-router-dom";
import React, {useEffect} from "react";

function ProtectedRoutes(props) {
    const history = useHistory();
    let Cmp = props.Cmp;

    useEffect(()=>{
        // This is only for Basic example .
        // You have to need server site check for your security
        if (!localStorage.getItem('auth_token')){
            history.push('/login')
        }
    },[]);

    return(
        <>
            <Cmp></Cmp>
        </>
    )
}

export default ProtectedRoutes;
