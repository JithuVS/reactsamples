import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = {
  tt: "",
  bt: "",
  id: "",
  img: "agnes",
};

function Api() {
  const [request, setRequest] = useState(apiUrl),
    [error, setError] = useState(false),
    [loading, setLoading] = useState(false),
    [generated, setGenerated] = useState(null),
    [images, setImages] = useState(null);

  useEffect(() => {
    getMemes();
  }, []);

  const getMemes = () => {
    axios.get("https://api.memegen.link/images").then((response) => {
      let data = response.data;
      if (data) {
        setImages(data.slice(2, 8));
        setGenerated(data[3].url);
      }
    });
  };

  const click = (e) => {
    e.preventDefault();
    setRequest({
      ...request,
      id: e.target.id,
      img: e.target.id.split("/")[4],
    });
  };
  const blur = (e) => {
    let id = e.target.id,
      value = e.target.value,
      tt = request.tt,
      bt = request.bt;
    if (id === "toptxt") {
      tt = value;
    } else {
      bt = value;
    }
    setRequest({
      ...request,
      tt: tt,
      bt: bt,
    });
  };

  const clickGenerate = (e) => {
    let reqArray = Object.values(request);
    if (reqArray[0] && reqArray[1] && reqArray[2]) {
      setLoading(true);
      setError(false);
      axios
        .get(
          `https://api.memegen.link/images/${reqArray[3]}/${reqArray[0]}/${reqArray[1]}.jpg`
        )
        .then((response) => {
          setGenerated(response.config.url);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      setError(true);
    }
  };

  return (
    <>
      <h4> API Call </h4>
      <div
        style={{
          color: error ? "red" : "blue",
        }}
      >
        Enter all three fields!
      </div>
      <div className="section">
        <fieldset
          style={{
            width: "50%",
          }}
        >
          <legend>Enter</legend>
          <form
            style={{
              paddingTop: "2%",
              textAlign: "left",
            }}
          >
            <label htmlFor="toptxt"> Top </label>
            <br></br>
            <input
              className="fields"
              type="text"
              id="toptxt"
              placeholder="Top text"
              onBlur={blur}
              data-testid="toptxt"
            ></input>

            <br></br>
            <label htmlFor="bottomtxt"> Bottom </label>
            <br></br>
            <input
              className="fields"
              type="text"
              id="bottomtxt"
              placeholder="Bottom text"
              onBlur={blur}
              data-testid="bottomtxt"
            ></input>
          </form>
        </fieldset>

        <fieldset
          style={{
            width: "50%",
          }}
          className="flexwrap"
        >
          <legend> Choose </legend>
          <div className="flexwrap" onClick={click}>
            {images
              ? images.map((i, j) => {
                  const color = request.id === i.url ? "blue" : "black";
                  return (
                    <img
                      alt={`meme${j}`}
                      key={j}
                      className="imageFrame"
                      style={{
                        borderColor: color,
                      }}
                      id={i.url}
                      src={i.url}
                      data-testid={`meme${j}`}
                    ></img>
                  );
                })
              : null}
          </div>
        </fieldset>
      </div>
      <button
        className="buttons"
        onClick={clickGenerate}
        style={{
          width: "40%",
          margin: "2%",
          padding: "5px",
        }}
        data-testid="generate"
      >
        Generate
      </button>

      <div>
        {loading ? (
          <div data-testid="loading"> Loading... </div>
        ) : (
          <img data-testid="generatedImage" src={generated}></img>
        )}
        <div>{generated ? null : "No images Loaded!"}</div>
      </div>
    </>
  );
}

export default Api;
