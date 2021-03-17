import React from "react";
import MoviesList from "./MoviesList";
import {Col, Row, Input} from "antd";
import "../App.css";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const getData = async () => {
      if (search !== "") {
        const data = await fetch(
            `https://www.omdbapi.com/?apikey=d2355bc&s=${search}`
        );
        const response = await data.json();
        setMovies(response.Search);
      }
    };

    getData();
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event);
  };

  return (
      <>
        <Row>
          <Col span={24}>
              <Input.Search
                  id="movie"
                  placeholder="Texto a buscar"
                  allowClear
                  enterButton="Search"
                  onSearch={handleSearch}
                  onPressEnter={handleSearch}
                  size="large"
              />
          </Col>
        </Row>

        <Row>
          <Col style={{ margin: "auto" }}>
            {movies.length > 0 ? (
                <MoviesList movies={movies} />
            ) : (
                <div>Sin Resultados</div>
            )}
          </Col>
        </Row>
      </>
  );
}

export default App;