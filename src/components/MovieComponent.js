import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";

const MovieContainer = styled.div`
  width: calc(calc(100% / var(--columns)) - var(--spacing) - var(--spacing));
  height: fit-content;
  margin-left: var(--spacing);
  margin-bottom: 0.5rem;
  margin-top: 10px;
  margin-right: var(--spacing);
  cursor: pointer;
`;

const CoverImage = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  /* height: 100%; */
  flex-shrink: 0;
  object-fit: cover;
`;
const MovieName = styled.span`
  font-style: 18px;
  font-weight: 400;
  color: #dbdbdb;
  margin: 5px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  line-height: 1.5;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-style: 16px;
  font-weight: 400;
  color: #7a7a7a;
  text-transform: capitalize;
  line-height: 1.5;
`;
const MovieComponent = (props) => {
  const { title, release_date, id, vote_average, poster_path } = props.movie;

  return (
    <MovieContainer onClick={() => props.onMovieSelect(id)} >
      <Link to={"/movie/" + id}>
        <CoverImage src={"https://image.tmdb.org/t/p/original/" + poster_path} />
        <MovieName>{title}</MovieName>
        <InfoColumn>
          <MovieInfo>{release_date}</MovieInfo>
        </InfoColumn>
        <InfoColumn>
          <MovieInfo>{id}</MovieInfo>
        </InfoColumn>
      </Link>
    </MovieContainer>
  );
};
export default MovieComponent;
