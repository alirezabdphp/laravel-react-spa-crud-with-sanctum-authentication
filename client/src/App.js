import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from "./pages/auth/Register";
import Index from "./pages/frontend/Index";
import AddProduct from "./pages/admin/product/AddProduct";
import Products from "./pages/admin/product/Index";
import EditProduct from "./pages/admin/product/EditProduct";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import axios from 'axios';


// axios.defaults.baseURL = 'http://localhost/public-repo/laravel-react-spa-crud-with-sanctum-authentication/laravel-api/public/';
axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token') ? `Bearer ${localStorage.getItem('auth_token')}` : '';;

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : 'NO Token';
    return config;
});


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>

                <Route path="/login"><Login></Login></Route>
                <Route path="/register"><Register></Register></Route>

                <ProtectedRoutes path="/dashboard" Cmp={Dashboard}></ProtectedRoutes>

                <Route path="/products">
                    <ProtectedRoutes Cmp={Products}></ProtectedRoutes>
                </Route>

                <Route path="/product/create">
                    <ProtectedRoutes Cmp={AddProduct}></ProtectedRoutes>
                </Route>

                <Route exact path="/product/edit/:id">
                    <ProtectedRoutes Cmp={EditProduct}></ProtectedRoutes>
                </Route>



                <Route path="/">
                    <Index></Index>
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
