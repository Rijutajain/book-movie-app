import Header from "../../common/header/Header";
import "./Details.css"
import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link, useHistory } from 'react-router-dom';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import YouTube from 'react-youtube';
import Rating from '@material-ui/lab/Rating';



const Details = (props) => {

    function starFilledHandler() {
        setStarClick(true);
    }
    const [starClick, setStarClick] = useState(false);
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            'autoplay': 1,
            'origin': window.location.origin

        },
    };
    const history = useHistory();
    function BacktoHomeHandler() {
        history.push("/");
    }
    const [movieById, setMovieById] = useState({
        title: "",
        genres: [],
        duration: "",
        release_date: "",
        rating: "",
        storyline: "",
        artists: [],
        trailer_url: ""

    });
    const movieId = useParams().id;
    useEffect(() => {
        async function getMovie() {
            try {
                var url = "http://localhost:8085/api/v1/movies/" + movieId;
                const rawresponse = await fetch(url,
                    {
                        method: 'GET',
                        headers: {
                            "Accept": "application/json;charset=UTF-8",
                        }
                    })
                if (rawresponse.ok) {
                    const fetchedMovie = await rawresponse.json();
                    console.log(fetchedMovie);
                    setMovieById(fetchedMovie);
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
        getMovie();
        console.log(opts);
    }, []);
    return (
        <div>
            <Header baseUrl={props.baseUrl} />
            <Typography noWrap style={{ marginLeft: 24, marginTop: 8, marginBottom: 0, height: 24, cursor: "pointer" }} className="typoText" variant="subtitle2" onClick={BacktoHomeHandler}>
                BacktoHome

            </Typography>
            <div className="threeSections">
                <div className="leftPanel">
                    <img src={movieById.poster_url} alt={movieById.title} />
                </div>
                <div className="middlePanel">
                    <Typography headline="variant">
                        <h2>{movieById.title}</h2>
                        <p><b>Genres: </b> {movieById.genres.join(',')}</p>
                        <p><b>Duration: </b>{movieById.duration}</p>
                        <p><b>Release Date: </b> {movieById.release_date}</p>
                        <p><b>Rating: </b> {movieById.rating}</p>
                        <p><b>Plot: </b> <a href={movieById.wiki_url} target="_blank">Wiki </a> {movieById.storyline}</p><br />

                    </Typography>
                    <YouTube videoId={movieById.trailer_url} opts={opts} />;
                </div>
                <div className="rightPanel">
                    <b>Rate this movie</b><br />
                    {/* <StarBorder
                        fontSize="inherit"
                        style={{ fontSize: "200px" }}
                    /> */}
                    <Rating name="size-large" defaultValue={0} size="large"   icon={<StarBorderIcon fontSize="inherit" />} />
                    <br/>
                    <b>Artists :</b>
                    <GridList cols={2}>
                        {movieById.artists.map(artist => (
                            <GridListTile style={{ height: 250 }} key={artist.id}>
                                <a href={artist.wiki_url}>
                                    <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} style={{ height: 250 }} />

                                    <GridListTileBar title={artist.first_name + " " + artist.last_name} />
                                </a>
                            </GridListTile>
                        ))}
                    </GridList>

                </div>
            </div>
        </div >
    );
}
export default Details;