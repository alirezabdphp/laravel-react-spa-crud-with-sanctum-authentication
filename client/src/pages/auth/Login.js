import Header from "../layouts/Header";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

function Login()
{
    const history = useHistory();
    useEffect(()=>{
        if (localStorage.getItem('auth_token')){
            history.push('/dashboard')
        }
    },[])


    const [loginInput, setLoginInput] = useState({
        email: '',
        password: '',
        errors: [],
    });


    const handleInput = (e) => {
        e.persist();
        setLoginInput({...loginInput, [e.target.name]:e.target.value})
    }


    async function loginUser() {
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        document.getElementById('actionBtn').disabled = true;
        document.getElementById('actionBtn').innerText = 'Loading...';

        axios.post('api/login-user', data).then((response) => {
            localStorage.setItem('user_name', JSON.stringify(response.data.data.user_name))
            localStorage.setItem('auth_token', response.data.data.token)
            history.push('/dashboard')
        }).catch((error) =>{
            if (error.response){
                setLoginInput({...loginInput, errors: error.response.data.errors});
            }

            document.getElementById('actionBtn').disabled = false;
            document.getElementById('actionBtn').innerText = 'Login';
        });
    }

    return(
        <div>
            <Header></Header>

            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">User Login</h5>

                                <div className="form-group mt-2">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="text" name="email" onChange={handleInput} value={loginInput.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <span className="text-danger">{loginInput.errors.email}</span>
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" name="password" onChange={handleInput} value={loginInput.password}  className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                    <span className="text-danger">{loginInput.errors.password}</span>
                                </div>

                                <button onClick={loginUser} className="btn btn-primary mt-2" id="actionBtn">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;