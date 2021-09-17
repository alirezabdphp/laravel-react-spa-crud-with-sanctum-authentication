import Header from "../../layouts/Header";
import {useHistory} from "react-router-dom";
import {useState} from "react";

function AddProduct() {
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    async function storeProduct() {
        const formData = new FormData();
        formData.append('title', title)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('thumbnail', thumbnail)

        let result = await fetch("http://127.0.0.1:8000/api/product/store", {
            method: 'POST',
            body:formData
        })

        history.push('/all-products')
    }

    return(
        <div>
            <Header></Header>

            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add Product</h5>

                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" value={title} onInput={(e)=>setTitle(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Name" />
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" value={price} onInput={(e)=>setPrice(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Price" />
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="description">Description</label>
                                    <textarea value={description} onInput={(e)=>setDescription(e.target.value)} className="form-control"></textarea>
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="price">Thumbnail</label>
                                    <input type="file" onChange={(e)=>setThumbnail(e.target.files[0])} className="form-control" accept="image/*" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Price" />
                                </div>

                                <button onClick={storeProduct} className="btn btn-primary mt-2">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddProduct;