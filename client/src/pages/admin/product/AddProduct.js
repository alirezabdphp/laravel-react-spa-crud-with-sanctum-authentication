import Header from "../../layouts/Header";
import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

function AddProduct() {
    const history = useHistory();

    const [newProduct, setNewProduct] = useState({
        'title' : '',
        'price' : '',
        'description' : '',
        'errors' : [],
    });
    const [thumbnail, setThumbnail] = useState('');

    const handleInput = (e) => {
        e.persist();
        setNewProduct({...newProduct, [e.target.name]: e.target.value})
    };

    const  storeProduct = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', newProduct.title);
        formData.append('price', newProduct.price);
        formData.append('description', newProduct.description);
        formData.append('thumbnail', thumbnail);

        document.getElementById('productSaveBtn').disabled = true;
        document.getElementById('productSaveBtn').innerText = 'Loading...';

        axios.post('api/backend/product/store', formData).then((response) => {
            history.push('/products')
        }).catch((error) =>{
            if (error.response){
                setNewProduct({...newProduct, errors: error.response.data.errors});
            }

            document.getElementById('productSaveBtn').disabled = false;
            document.getElementById('productSaveBtn').innerText = 'Save User';
        });
    }

    return(
        <div>
            <Header></Header>

            <div className="container">
                <div className="card mt-3 text-left">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        New Product
                        <Link to="/products" type="button" className="btn btn-sm btn-primary"> Products</Link>
                    </div>
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={storeProduct}>
                                            <div className="form-group">
                                                <label htmlFor="title">Title</label>
                                                <input type="text" name="title" onChange={handleInput} value={newProduct.title} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Name" />
                                            </div>

                                            <div className="form-group mt-2">
                                                <label htmlFor="price">Price</label>
                                                <input type="number" name="price" onChange={handleInput} value={newProduct.price} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Price" />
                                            </div>

                                            <div className="form-group mt-2">
                                                <label htmlFor="description">Description</label>
                                                <textarea name="description" onChange={handleInput} value={newProduct.description} className="form-control"></textarea>
                                            </div>

                                            <div className="form-group mt-2">
                                                <label htmlFor="price">Thumbnail</label>
                                                <input type="file" onChange={(e)=>setThumbnail(e.target.files[0])} className="form-control" accept="image/*" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Price" />
                                            </div>

                                            <button  className="btn btn-primary mt-2" id="productSaveBtn">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default AddProduct;