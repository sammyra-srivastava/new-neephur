import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app_config from "../../config";
import { ShoppingBag } from "@mui/icons-material";
import toast from "react-hot-toast";

const BrowseByFlorist = () => {
  const url = app_config.backend_url;

  const [floristData, setfloristData] = useState(null);
  const [flowerArray, setFlowerArray] = useState([]);
  const [fLoading, setFLoading] = useState(true);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);

  const fetchFlorist = () => {
    fetch(url + "/florist/getbyid/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setfloristData(data);
        setLoading(false);
      });
  };

  const fetchFlowers = () => {
    fetch(url + "/flower/getbyflorist/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFlowerArray(data);
        setFLoading(false);
      });
  };

  const addToCart = (flower) => {
    setCart([
      ...cart,
      { item: flower, qty: 1, shopName: floristData.shopname },
    ]);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to 🛒Cart");
  };

  useEffect(() => {
    fetchFlorist();
    fetchFlowers();
  }, []);

  const filterData = () => {};

  const displayData = () => {
    if (!loading) {
      return (
        <div className="browse-by-florist-back"> 
      <div className="container mt-3 mb-5 " >
        <div class="col-md-12 col-xl-10 ml-3">
      <div class="card mt-5 mb-5 shadow-0 border rounded-3">
        <div class="card-body ">
          <div class="row">
            <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
              <div class="bg-image hover-zoom ripple rounded ripple-surface">
                <img
                  src={url + "/uploads/" + floristData.image}
                  class="w-100"
                  alt=""
                />
                <a href="#!">
                  <div class="hover-overlay">
                  </div>
                </a>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6 ">
            <h1 style={{fontFamily:"monospace", color:"purple"}}>{floristData.shopName}</h1>
            <h5 style={{fontFamily:"Times New Roman", color:"red"}}>Timings :- {floristData.timings}</h5>
            <h5 style={{ fontFamily:"Times New Roman",color:"red"}}>Contact info:- {floristData.mobile}</h5>
            <h5 style={{ fontFamily:"Times New Roman",color:"red"}} >Address:- {floristData.address}</h5>
            </div>
        </div>
        </div>
            {displayFlowers()}
        </div>
        </div>
        </div>
        </div>
        

      );
    }
  };
  const orderFlower = () => {};

  const displayFlowers = () => {
    if (!fLoading)
      return (
        <div className="row ml-5">
          {flowerArray.map(({ _id, name, color, price_per_kg, image }) => (
            <div className="col-lg-4 col-md-12 mb-4">
              <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                <img
                  src={url + "/uploads/" + image} className="w-100" onClick={orderFlower}/>
                <div
                  onClick={(e) =>
                    addToCart({ _id, name, color, price_per_kg, image })
                  }
                >
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                   
                  >
                    <div className="d-flex justify-content-start align-items-start h-100">
                      <h5>
                        <span className="badge bg-light pt-2 ms-3 mt-3 text-dark">
                          ₹{price_per_kg}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
  };

  return (
    
  <div>{displayData()}</div>
  
  );
 
};

export default BrowseByFlorist;
