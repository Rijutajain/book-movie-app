import Header from "../../common/header/Header";
import React, { useEffect, useState } from "react";
import "./Home.css"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link, useHistory } from 'react-router-dom';

const Home = (props) => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        async function getMovies() {
            try {
                const rawresponse = await fetch('http://localhost:8085/api/v1/movies?status=published',
                    {
                        method: 'GET',
                        headers: {
                            "Accept": "application/json;charset=UTF-8",
                        }
                    })
                if (rawresponse.ok) {
                    const response = await rawresponse.json();
                    const fetchedMovies = response.movies;
                    // console.log(fetchedMovies);
                    setMovies(fetchedMovies);
                }
                else {
                    const error = new Error();
                    error.message = 'Something went wrong.';
                    throw error;
                }
            } catch (e) {
                alert(e.message);
            }
        }
        getMovies();
    }, []);

    const [releasedMovies, setReleasedMovies] = useState([]);
    useEffect(() => {
        async function getReleasedMovies() {
            try {
                const rawresponse = await fetch('http://localhost:8085/api/v1/movies?status=released',
                    {
                        method: 'GET',
                        headers: {
                            "Accept": "application/json;charset=UTF-8",
                        }
                    })
                if (rawresponse.ok) {
                    const response = await rawresponse.json();
                    const fetchedReleasedMovies = response.movies;
                    // console.log(fetchedMovies);
                    setReleasedMovies(fetchedReleasedMovies);
                }
                else {
                    const error = new Error();
                    error.message = 'Something went wrong.';
                    throw error;
                }
            } catch (e) {
                alert(e.message);
            }
        }
        getReleasedMovies();
    }, []);

    return (
        <div>
            <Header baseUrl={props.baseUrl} />
            <div className="upcomingMovies">Upcoming Movies</div>
            <div className="upcomingMoviesOuterDiv">
                <GridList style={{ flexWrap: "nowrap" }} cols={6}>
                    {movies.map(movie => (
                        <GridListTile style={{ height: 250 }} key={movie.id}>
                           
                            <img src={movie.poster_url} alt={movie.title} />
                        
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>
            </div>

            <div className="releasedMoviesOuterDiv">
                <GridList cols={4}>
                    {releasedMovies.map(releasedMovie => (
                        <GridListTile style={{ height: 350 }} key={releasedMovie.id}>
                             <Link to = {"/movie/" + releasedMovie.id}>
                            <img src={releasedMovie.poster_url} alt={releasedMovie.title} />
                            
                            <GridListTileBar title={releasedMovie.title} subtitle={<span>Release Date: {releasedMovie.release_date}</span>} />
                            </Link>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </div>
    );
}
export default Home;