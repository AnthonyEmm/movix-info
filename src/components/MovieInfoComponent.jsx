import { useState, useEffect } from "react";
import styled from "styled-components";
import { API_KEY } from "../App";
import axios from "axios";

const Container = styled.div`
display: flex;
flex direction: row;
padding: 20px 30px;
justify-content: center;
border-bottom: 1px solid whitesmoke;
`;

const CoverImage = styled.img`
  height: 400px;
  object-fit: cover;
  border-radius: 5px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-transform: capitalize;
`;

const MovieInfo = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: black;
  margin: 2px 3px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-transform: capitalize;
  & span {
    opacity: 0.7;
  }
`;

const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 6px;
  border-radius: 10%;
  cursor: pointer;
  & span {
    opacity: 0.8;
  }
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);

  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type}: {movieInfo?.Title}
            </MovieName>
            <MovieInfo>
              Language : <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              IMDB Rating : <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Rated : <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Release Date : <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Duration : <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre : <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director : <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors : <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Country : <span>{movieInfo?.Country}</span>
            </MovieInfo>
            <MovieInfo>
              Plot : <span>{movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoColumn>
          <Close title="Close" onClick={() => props.onMovieSelect()}>
            X
          </Close>
        </>
      ) : (
        <div className="loader"></div>
      )}
    </Container>
  );
};

export default MovieInfoComponent;
