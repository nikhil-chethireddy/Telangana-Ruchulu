import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    const response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse[0], jsonResponse[1]);

    setFoodItems(jsonResponse[0]);
    setFoodCat(jsonResponse[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />

      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain" }}
        >
          <div className="carousel-inner" style={{ maxHeight: "550px" }}>
            <div className="carousel-item active">
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/jsfblo0hthfqzuztj3up"
                className="d-block w-100"
                // style={{ filter: "brightness(70%)", height: "500px" }}
                style={{
                  objectFit: "contain",
                  height: "500px",
                  maxWidth: "100%",
                  margin: "0 auto",
                  filter: "brightness(70%)",
                }}
                alt="biryani"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×400/?burger"
                className="d-block w-100"
                style={{
                  objectFit: "contain",
                  height: "500px",
                  maxWidth: "100%",
                  margin: "0 auto",
                  filter: "brightness(70%)",
                }}
                alt="burger"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×400/?pizza"
                className="d-block w-100"
                style={{
                  objectFit: "contain",
                  height: "500px",
                  maxWidth: "100%",
                  margin: "0 auto",
                  filter: "brightness(70%)",
                }}
                alt="pizza"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
          <div
            className="carousel-caption d-none d-md-block"
            style={{ zIndex: "1" }}
          >
            <div className="container-fluid">
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container m-3">
        {foodCat !== [] &&
          foodCat.map((data) => {
            return (
              <div className="row">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItems !== [] ? (
                  foodItems
                    .filter((item) => {
                      return (
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                      );
                    })
                    .map((x) => {
                      return (
                        <div key={x._id} className="col-12 col-md-6 col-lg-3">
                          <Card foodItem={x} options={x.options} />
                        </div>
                      );
                    })
                ) : (
                  <div>No Such Data Found</div>
                )}
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
