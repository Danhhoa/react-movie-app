/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY } from "../App";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  /* align-items: center; */
  border-bottom: 1px solid lightgray;
  & h3 {
    color: #fff;
    font-weight: 400;
  }
  padding: 0.5rem calc((100vw - 1200px) / 2);
  background-image: ${(props) => `url(${props.picture})`};
  background-position: 50% 0;
  background-size: cover;
  background-color: rgba(2, 13, 24, 0.75);
  position: relative;
  &:before {
    position: absolute;
    content: "";
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: rgba(2, 2, 2, 0.75);
    opacity: 0.8;
  }
`;

const CoverImage = styled.img`
  width: 30%;
  height: 30%;
  object-fit: cover;
  border-radius: 20px;
  z-index: 1;
`;

const CastImage = styled.img`
  margin: 0 30px;
  width: 5rem;
  height: 5rem;
  border-radius: 100rem;
  object-fit: cover;
  border: 2px solid transparent;
  cursor: pointer;
  &:hover {
    border: 2px solid yellow;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
`;

const MovieName = styled.span`
  max-width: 700px;
  font-size: 3rem;
  font-weight: 800;
  font-family: "Merriweather", serif;
  color: #dbdbdb;
  margin: 15px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  margin-bottom: 3rem;
  z-index: 1;
`;
const MovieInfo = styled.span`
  font-style: 16px;
  font-weight: 500;
  font-size: 20px;
  color: #dbdbdb;
  overflow: hidden;
  margin: 4px 0;
  /* text-transform: capitalize; */
  text-overflow: ellipsis;
  z-index: 1;
  & span {
    /* opacity: 0.6; */
    color: #b5b5b5;
    font-weight: 300;
  }
`;

const Close = styled.span`
  overflow: hidden;
  position: relative;
  border: none;
  padding: 0;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background: transparent;
  color: #1da1f2;
  font: inherit;
  text-indent: 100%;
  cursor: pointer;
  z-index: 1;

  &:focus {
    outline: solid 0 transparent;
    box-shadow: 0 0 0 2px #8ed0f9;
  }

  &:hover {
    background: rgba(29, 161, 142, 0.1);
  }

  &:before,
  &:after {
    position: absolute;
    top: 15%;
    left: calc(50% - 0.047em);
    width: 0.125em;
    height: 70%;
    border-radius: 0.125em;
    transform: rotate(45deg);
    background: currentcolor;
    content: "";
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const CastList = styled.div`
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
`;
const CastInfo = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  z-index: 1;
`;
const CastRealName = styled.span`
  color: #dbdbdb;
  margin-top: 20px;
  word-break: break-word;
  text-align: center;
  z-index: 1;
`;
const CastName = styled.span`
  color: #7a7a7a;
  margin-top: 5px;
  word-break: break-word;
  text-align: center;
  z-index: 1;
  font-weight: 400;
`;
const Overview = styled.span`
  color: #afb5a7;
  line-height: 1.5rem;
  margin: 1rem 0;
  font-size: 1em;
  z-index: 1;
`;
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const [movieCast, setMovieCast] = useState();
  const { selectedMovie } = props;
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${API_KEY}&append_to_response=videos`
      )
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);
  useEffect(() => {
    axios
      .get(
        `http://api.themoviedb.org/3/movie/${selectedMovie}/casts?api_key=${API_KEY}`
      )
      .then((response) => setMovieCast(response.data));
  }, [selectedMovie]);
  return (
    <Container
      picture={
        "https://image.tmdb.org/t/p/original/" + movieInfo?.backdrop_path
      }
    >
      {movieInfo ? (
        <>
          <CoverImage
            src={
              "https://image.tmdb.org/t/p/original/" + movieInfo?.poster_path
            }
          />
          <InfoColumn>
            <MovieName>{movieInfo?.original_title}</MovieName>
            {movieCast?.crew
              .filter((item) => item.job === "Director")
              .map((item, index) => (
                <MovieInfo key={index}>
                  Director : <span>{item.name}</span>
                </MovieInfo>
              ))}
            ;
            <MovieInfo>
              Writers :
              {movieCast?.crew
                .filter((item) => item.job === "Writer")
                .map((item) => (
                  <span> {item.name}, </span>
                ))}
            </MovieInfo>
            <MovieInfo>
              Runtime : <span>{movieInfo?.runtime} minutes</span>
            </MovieInfo>
            <MovieInfo>
              Release Date : <span>{movieInfo?.release_date}</span>
            </MovieInfo>
            <Overview>{movieInfo?.overview}</Overview>
            <MovieInfo>CAST</MovieInfo>
            <CastList>
              {movieCast?.cast.slice(0, 5).map((item, index) => (
                <CastInfo key={index}>
                  <CastImage
                    src={
                      "https://image.tmdb.org/t/p/original/" + item.profile_path
                    }
                  />
                  <CastRealName>{item.name}</CastRealName>
                  <CastName>{item.character}</CastName>
                </CastInfo>
              ))}
              ;
            </CastList>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </Container>
  );
};
export default MovieInfoComponent;
