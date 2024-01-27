import styled from "styled-components";
import { useState } from "react";
import MovieComponents from "./components/MovieComponents";
import MovieInfoComponent from "./components/MovieInfoComponent";
import axios from "axios";
import movix from "./assets/movix.png";

export const API_KEY = import.meta.env.VITE_API_KEY;

const Container = styled.div`
display: flex;
flex direction: column;
`;

const Header = styled.div`
display: flex;
flex direction: row;
justify-content: space-between;
align-items: center;
background-color: #9A4444;
color: black;
padding: 10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
width: 100%;
border-radius: 10px;
`;

const AppName = styled.div`
display: flex;
flex direction: row;
align-items: center;
`;

const Movieimage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  width: 30%;
  height: 40%;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  gap: 24px;
`;

const Placeholder = styled.img`
  width: 250px;
  height: 250px;
  margin: 150px;
  border-radius: 10%;
  display: flex;
  text-align: center;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );

    // console.log(response);
    updateMovieList(response.data.Search);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <>
      <Container>
        <Header>
          <AppName>
            <Movieimage src={movix} alt="background image" />
            MovixInfo
          </AppName>
          <SearchInput
            placeholder="Search here..."
            value={searchQuery}
            onChange={onTextChange}
          />
        </Header>
      </Container>
      <h1>
        Welcome. <br />
        Search information about movies and TV shows <br />
        Happy Searching!
      </h1>
      <div>
        {selectedMovie && (
          <MovieInfoComponent
            selectedMovie={selectedMovie}
            onMovieSelect={onMovieSelect}
          />
        )}

        <MovieListContainer>
          {movieList?.length ? (
            movieList.map((movie, index) => (
              <MovieComponents
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          ) : (
            <Placeholder src={movix} />
          )}
        </MovieListContainer>
      </div>
    </>
  );
}

export default App;
