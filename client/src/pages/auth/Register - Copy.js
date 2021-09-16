import {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import Header from "../layouts/Header";
import axios from "axios";
import {toast} from "react-toastify";

function Register() {
    useEffect(()=>{
        if (localStorage.getItem('user')){
            history.push('/dashboard')
        }
    },[])

    // const state = {
    //     name: '',
    //     email: '',
    //     password: '',
    //     errors: [],
    // }

    const [name, setName]=useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();

   async function storeUser() {
       let user={name,email,password}

       await axios.post('http://127.0.0.1:8000/api/store-user', JSON.parse(JSON.stringify(user))).then((response) => {
           localStorage.setItem('user', JSON.stringify(response.data.data))

           toast.success(response.data.message, {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
           });

           history.push('/dashboard')
       }).catch((error) =>{
           // console.log(error.response.data.errors)
           this.setState({setErrors: error.response.data.errors})
       });
    }

    return(
        <>
            <Header></Header>
            <div className="row mt-5 justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">User Register</h5>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input type="text" value={name} onInput={(e)=>setName(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <span></span>
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" value={email} onInput={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" value={password} onInput={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>

                            <button onClick={storeUser} className="btn btn-primary mt-2">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;