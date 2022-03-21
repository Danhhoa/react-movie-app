/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react"
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { API_KEY } from "../App";
import YoutubeEmbed from "./YoutubeEmber";
const Container = styled.div`
display: flex;
height: 600px;
justify-content: center;
padding: 0.5rem calc((100vw - 1200px) / 2);
background-image: ${(props) => `url(${props.picture})`};
background-position: 50% 0;
background-size: cover;
background-repeat: no-repeat;
background-color: rgba(0, 0, 0, 0.75);
position: relative;
& h3 {
  color: #fff;
  font-weight: 500;
}
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

const ContentSection = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  margin-top: -350px;
  padding: 0 50px;
`;

const CoverImage = styled.img`
  width: 20%;
  height: 20%;
  padding-top: 2rem;
  object-fit: cover;
  border-radius: 20px;
  z-index: 1;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  padding: 0 60px;
`;

const MovieName = styled.span`
max-width: 700px;
font-size: 3rem;
font-weight: 800;
font-family: "Merriweather", serif;
color: #dbdbdb;
margin: 15px 0;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
word-break: break-word;
margin-bottom: 3rem;
z-index: 1;
`;
const MovieInfo = styled.span`
font-style: 16px;
font-weight: 400;
font-size: 20px;
color: #dbdbdb;
overflow: hidden;
margin: 5px 0;
/* text-transform: capitalize; */
text-overflow: ellipsis;
z-index: 1;
& span {
  color: #b5b5b5;
  font-weight: 300;
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

const CastImage = styled.img`
  margin: 0 30px;
  margin-top: -10px;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
  cursor: pointer;
  &:hover {
    border: 2px solid #c19309;
  }
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

const movieTrailer = styled.video`
  background-color: red;
  display:flex;
  width:500px;
  z-index: 1;
`;
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const [movieCast, setMovieCast] = useState();
  const [movieTrailer, setMovieTrailer] = useState();
  const { selectedMovie } = props;
  const { movieId } = useParams()
  console.log(movieId);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
      )
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);

  useEffect(() => {
    axios
      .get(
        `http://api.themoviedb.org/3/movie/${movieId}/casts?api_key=${API_KEY}`
      )
      .then((response) => setMovieCast(response.data));
  }, [selectedMovie]);

  return (
    <React.Fragment>
      <Container picture={
        "https://image.tmdb.org/t/p/original/" + movieInfo?.backdrop_path
      }>
      </Container>
      
      {movieInfo ? (
        <>
        <ContentSection>
          <CoverImage
            src={
              "https://image.tmdb.org/t/p/original/" + movieInfo?.poster_path
            }
          />
          <InfoColumn>
            <MovieName>{movieInfo?.original_title}</MovieName>

            <MovieInfo>
              Director :
              {movieCast?.crew
                .filter((item) => item.job === "Director")
                .map((item, index) => (
                  <span key={index}> {item.name} </span>
                ))}
            </MovieInfo>

            <MovieInfo>
              Writers :
              {movieCast?.crew
                .filter((item) => item.job === "Writer")
                .map((item, index, arr) =>
                  arr.length - 1 === index ? (
                    <span key={index}> {item.name} </span>
                  ) : (
                    <span key={index}> {item.name}, </span>
                  )
                )}
            </MovieInfo>

            <MovieInfo>
              {console.log(movieInfo.videos.results[0].key)}
              Director :
              {movieCast?.crew
                .filter((item) => item.job === "Director")
                .map((item, index) => (
                  <span key={index}> {item.name} </span>
                ))}
            </MovieInfo>

            <MovieInfo>
              Writers :
              {movieCast?.crew
                .filter((item) => item.job === "Writer")
                .map((item, index, arr) =>
                  arr.length - 1 === index ? (
                    <span key={index}> {item.name} </span>
                  ) : (
                    <span key={index}> {item.name}, </span>
                  )
                )}
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
              {console.log(movieCast)}
              {movieCast?.cast.slice(0, 5).map((item, index) =>
              (
                <CastInfo key={index}>
                  <CastImage
                    src={"https://image.tmdb.org/t/p/original/" + item.profile_path}
                  />
                  <CastRealName>{item.name}</CastRealName>
                  <CastName>{item.character}</CastName>
                </CastInfo>
              ))}
            </CastList>
          <YoutubeEmbed embedId={`${movieInfo.videos.results[0].key}`} />
          </InfoColumn>
          
          </ContentSection>
        </>
      ) : (
        <h3>Loading...</h3>
      )}

    </React.Fragment>

  );
};
export default MovieInfoComponent;
