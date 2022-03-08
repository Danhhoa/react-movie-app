import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px #aaa;
  cursor: pointer;
`;

const CoverImage = styled.img`
  height: 362px;
  object-fit: cover;
`;
const MovieName = styled.span`
  font-style: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-style: 16px;
  font-weight: 500;
  color: black;
  text-transform: capitalize;
`;
const MovieComponent = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  return (
    <MovieContainer onClick={() => props.onMovieSelect(imdbID)}>
      <CoverImage src={Poster} />
      <MovieName>{Title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year: {Year}</MovieInfo>
        <MovieInfo>Type: {Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};
export default MovieComponent;
