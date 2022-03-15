/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY } from "../App";
const Container = styled.div.attrs((props) => ({
  picture: "",
}))`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  & h3 {
    color: #fff;
    font-weight: 400;
  }
  padding: 0.5rem calc((100vw - 1200px) / 2);
  /* background-image: url("https://image.tmdb.org/t/p/original/" + ); */
`;

const CoverImage = styled.img`
  width: 30%;
  height: 30%;
  object-fit: cover;
  border-radius: 20px;
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
  & span {
    /* opacity: 0.6; */
    color: #7a7a7a;
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
    left: calc(50% - 0.0625em);
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
`;
const CastInfo = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const CastRealName = styled.span`
  color: #dbdbdb;
  margin-top: 20px;
  word-break: break-word;
  text-align: center;
`;
const CastName = styled.span`
  color: #7a7a7a;
  margin-top: 5px;
  word-break: break-word;
  text-align: center;
`;
const Overview = styled.span`
  color: #afb5a7;
  line-height: 1.5rem;
  margin: 1rem 0;
  font-size: 1em;
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
      .then((response2) => setMovieCast(response2.data.cast));
  }, [selectedMovie]);
  return (
    <Container picture={movieInfo?.backdrop_path}>
      {movieInfo ? (
        <>
          <CoverImage
            src={
              "https://image.tmdb.org/t/p/original/" + movieInfo?.poster_path
            }
          />
          <InfoColumn>
            <MovieName>{movieInfo?.original_title}</MovieName>
            <MovieInfo>
              Runtime : <span>{movieInfo?.runtime} minutes</span>
            </MovieInfo>
            <MovieInfo>
              Release_Date : <span>{movieInfo?.release_date}</span>
            </MovieInfo>
            <Overview>{movieInfo?.overview}</Overview>
            <MovieInfo>CAST</MovieInfo>
            <CastList>
              <CastInfo>
                <CastImage
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    movieCast?.[0].profile_path
                  }
                />
                <CastRealName>{movieCast?.[0].name}</CastRealName>
                <CastName>{movieCast?.[0].character}</CastName>
              </CastInfo>
              <CastInfo>
                <CastImage
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    movieCast?.[1].profile_path
                  }
                />
                <CastRealName>{movieCast?.[1].name}</CastRealName>
                <CastName>{movieCast?.[1].character}</CastName>
              </CastInfo>
              <CastInfo>
                <CastImage
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    movieCast?.[2].profile_path
                  }
                />
                <CastRealName>{movieCast?.[2].name}</CastRealName>
                <CastName>{movieCast?.[2].character}</CastName>
              </CastInfo>
              <CastInfo>
                <CastImage
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    movieCast?.[3].profile_path
                  }
                />
                <CastRealName>{movieCast?.[3].name}</CastRealName>
                <CastName>{movieCast?.[3].character}</CastName>
              </CastInfo>
              <CastInfo>
                <CastImage
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    movieCast?.[4].profile_path
                  }
                />
                <CastRealName>{movieCast?.[4].name}</CastRealName>
                <CastName>{movieCast?.[4].character}</CastName>
              </CastInfo>
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
