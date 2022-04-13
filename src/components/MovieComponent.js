import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";

const MovieComponent = (props) => {
  // console.log("Movie: " , props.movie)
  const { title, release_date, id, vote_average, poster_path } = props.movie;

  return (
    <div className="searchMovieContainer" onClick={() => props.onMovieSelect(id)} >
      <Link to={"/movie/" + id} style= {{textDecoration: 'none'}}>
        <img id="posterSearch" src={"https://image.tmdb.org/t/p/original/" + poster_path} />
        <span className="nameSearch">{title}</span>
        <div className="infoSearch">
          <span className="releaseDay">{release_date}</span>
        </div>
      </Link>
    </div>
  );
};
export default MovieComponent;
