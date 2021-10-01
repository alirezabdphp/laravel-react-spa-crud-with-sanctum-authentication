import Header from "../../layouts/Header";
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


import axios from "axios";

function Products() {
    const history = useHistory();

    const  [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);


    useEffect(()=>{
        axios.get('api/backend/products').then((response) => {
            setProductList(response.data.data.products);
            setLoading(false);
        }).catch((error) =>{
            //
        });
    }, []);


    const deleteCategory = (e, uuid) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;


        const deleteAlert = withReactContent(Swal)

        deleteAlert.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('api/backend/product/delete/'+uuid).then((response) => {
                    console.log(response.data.message);
                    thisClicked.closest("tr").remove();
                }).catch((error) =>{
                    console.log(error);
                });
            }
        })

        console.log(uuid);
    }

    return(
        <div>
            <Header></Header>

            <div className="container">
                <div className="card mt-3 text-left">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        Products
                        <Link to="/product/create" type="button" className="btn btn-sm btn-primary"><i className="bi bi-plus"></i> New Product</Link>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-hover text-center">
                            <thead>
                                <tr className="bg-secondary text-white">
                                    <th scope="col" width="10%">Thumbnail</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" width="12%">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    productList.map((product) =>
                                        <tr key={product.id}>
                                            <td>
                                                <img className="img-fluid"  src={product.thumbnail_path}></img>
                                            </td>
                                            <td>{product.title}</td>
                                            <td>{product.price}</td>
                                            <td>{product.description}</td>
                                            <td>
                                                <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                                    <Link to={`product/edit/${product.uuid}`}  className="btn btn-primary">Edit</Link>
                                                    <button type="button" onClick={(e)=> deleteCategory(e, product.uuid)} className="btn btn-danger">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;