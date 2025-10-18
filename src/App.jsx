import React, { useState, useEffect } from "react";

function App() {

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const types = ["SUBURB"];
  const categories = ["AMENITY"];

  useEffect(() => {
    if (!type || !category) return;

    setLoading(true);

    const typeURL = type.toLowerCase()
    const categoryURL = category.toLowerCase()

    let url = `http://localhost:5000/api?suburb=Belmont+North&type=${typeURL}&category=${categoryURL}`;


    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer test",
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data["results"].length);
        
        setData(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [type, category]);

  return (
    <div className="App">
      <div className="main">
        <div className="search">
          <div className="button-type">
            <button onClick={() => setShowDropdown(!showDropdown)}>
              {type || "Select Type"}
            </button>
            {showDropdown && (
              <ul>
                {types.map((i) => (
                  <li
                    key={i}
                    style={{ padding: "5px", cursor: "pointer" }}
                    onClick={() => {
                      setType(i);
                      setShowDropdown(false);
                    }}
                  >
                    {i}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="button-category">
            <button onClick={() => setShowDropdown3(!showDropdown3)}>
              {category || "Select Category"}
            </button>
            {showDropdown3 && (
              <ul>
                {categories.map((i) => (
                  <li
                    key={i}
                    style={{ padding: "5px", cursor: "pointer" }}
                    onClick={() => {
                      setCategory(i);
                      setShowDropdown3(false);
                    }}
                  >
                    {i}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>


        <div className="show">
          {loading && <p>Loading...</p>}
          {data.length > 0 && (
            <div>
              {/* <div>{data}</div> */}
              {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
              {data.map ((item, i) => (
                <div className="card" key={i}>
                  <h3>Category: {item.category}</h3>
                  <p>Name: {item.area_name}</p>
                  <p>Latitude: {item.lat}</p>
                  <p>Longitude: {item.lon}</p>
                  <p>Description: {item.name}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
