import Header from "../layouts/Header";
import {useEffect, useState} from "react";
import axios from "axios";

function Index() {
    const  [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);


    useEffect(()=>{
        axios.get('api/frontend/products').then((response) => {
            setProductList(response.data.data.products);
            setLoading(false);
        }).catch((error) =>{
            //
        });
    }, []);


    const getDesctription = (description) => {
        var subStr = JSON.stringify(description).substr(1, 30);
        var newStr = subStr.replace('"', " ");
        return newStr;
    };

    return(
        <div>
            <Header></Header>
            <div className="container">
                <div className="row pt-3 justify-content-center">
                    {
                        productList.map((product)=>
                            <div className="col-md-3 mb-3" key={product.id}>
                                <div className="card">
                                    <div className="product-image">
                                        <img className="card-img-top img-fluid"  src={product.thumbnail_path}></img>
                                    </div>
                                    <div className="card-body product-card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">
                                            {getDesctription(product.description)}
                                        </p>
                                        <a href="javascript:void(0)" className="btn btn-primary">
                                            <b>${product.price}</b> / Go somewhere
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Index;