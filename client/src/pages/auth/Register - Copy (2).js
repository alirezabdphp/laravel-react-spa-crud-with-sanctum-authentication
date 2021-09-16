import React, {Component} from "react";
import Header from "../layouts/Header";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends Component{
    state = {
        name: '',
        email: '',
        password: '',
        errors:[]
    }

    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
         })
    }

     storeUser = (e) => {
        e.preventDefault();


        document.getElementById('saveBtn').disabled = true;
        document.getElementById('saveBtn').innerText = 'Loading...';
        axios.post('http://127.0.0.1:8000/api/store-user', this.state).then((response) => {
            // localStorage.setItem('user', JSON.stringify(response.data.data));
            this.setState({
                name: '',
                email: '',
                password: '',
                errors:[]
            });
            document.getElementById('saveBtn').disabled = false;
            document.getElementById('saveBtn').innerText = 'Save User';

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            this.props.history.push('/login')
        }).catch((error) =>{
            if (error.response){
                this.setState({errors: error.response.data.errors});
            }
            document.getElementById('saveBtn').disabled = false;
            document.getElementById('saveBtn').innerText = 'Save User';
        });
    }


    render() {
        return(
            <>
                <Header></Header>
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">User Register</h5>

                                    <form onSubmit={this.storeUser}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Name</label>
                                            <input type="text" name="name" value={this.state.name} onInput={this.handleInput}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Full Name" />
                                            <span className="text-danger">{this.state.errors.name}</span>
                                        </div>

                                        <div className="form-group mt-2">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="text" name="email" value={this.state.email} onInput={this.handleInput}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email Address" />
                                            <span className="text-danger">{this.state.errors.email}</span>
                                        </div>

                                        <div className="form-group mt-2">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password" name="password" value={this.state.password} onInput={this.handleInput}  className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                            <span className="text-danger">{this.state.errors.password}</span>
                                        </div>

                                        <button  id="saveBtn" className="btn btn-primary mt-2">Save User</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

export default Register;