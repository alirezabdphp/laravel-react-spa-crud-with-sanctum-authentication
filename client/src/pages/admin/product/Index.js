import Header from "../../layouts/Header";
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

function AddProduct() {
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
                                    <th scope="col" width="3%">#</th>
                                    <th scope="col">Thumbnail</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;