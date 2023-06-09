import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';
import Youtube from "react-youtube";
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/";
 
function Row({ title, fetchURL, isLargeRow}) {
    const [movies,setMovies] = useState([]);
    const[trailerUrl, setTrailerUrl] = useState("");
    

    useEffect(()=>{
        async function fetchData(){
            const requests =await axios.get(fetchURL);
            setMovies(requests.data.results);
            return requests;
        }
        fetchData();
    }, [fetchURL]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    // hi

    console.table(movies);

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } 
        else {
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v')); 
            })
            .catch((error) => console.log(error));
        }
    };

  return (
    <div className="row">
        <h2>{ title}</h2>
        <div className="row_posters">
            {/* Row Posters */}
            {movies.map(movie => ( 
                <img 
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row_poster ${isLargeRow && "rowPosterLarge"}`}
                src={`${baseUrl}${isLargeRow? movie.poster_path : movie.backdrop_path }`} alt={movie.name} />
            ))}
        </div>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row;