import React, {useEffect, useState} from 'react';
import Header from "../layouts/Header";
import axios from 'axios';
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

function Register() {

    const history = useHistory();

    useEffect(()=>{
        if (localStorage.getItem('auth_token')){
            history.push('/dashboard')
        }
    },[])

    const [newUser, setNewUser] = useState({
        'name' : '',
        'email' : '',
        'password' : '',
        'errors' : [],
    });


    const handleInput = (e) => {
        e.persist();
        setNewUser({...newUser, [e.target.name]: e.target.value})
    };

    const  storeUser = (e) =>{
        e.preventDefault();

        const data = {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        }

        document.getElementById('saveBtn').disabled = true;
        document.getElementById('saveBtn').innerText = 'Loading...';

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/store-user', data).then((response) => {
                localStorage.setItem('user_name', JSON.stringify(response.data.data.user_name))
                localStorage.setItem('auth_token', response.data.data.token)

                history.push('/dashboard')
            }).catch((error) =>{
                if (error.response){
                    setNewUser({...newUser, errors: error.response.data.errors});
                }

                document.getElementById('saveBtn').disabled = false;
                document.getElementById('saveBtn').innerText = 'Save User';
            });
        });
    }


    return (
        <>
            <Header/>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">User Register</h5>

                                <form onSubmit={storeUser}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={newUser.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full Name" />
                                        <span className="text-danger">{newUser.errors.name}</span>
                                    </div>

                                    <div className="form-group mt-2">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="text" name="email" onChange={handleInput} value={newUser.email}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                        <span className="text-danger">{newUser.errors.email}</span>
                                     </div>

                                    <div className="form-group mt-2">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={newUser.password}  className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                        <span className="text-danger">{newUser.errors.password}</span>
                                    </div>

                                    <button  className="btn btn-primary mt-2" id="saveBtn">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
