import Header from "../../common/header/Header";
import React, { useEffect, useState } from "react";
import "./Home.css"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const Home = (props) => {
    const [ReleaseStartDateInput, setReleaseStartDateInput] = useState("");
    const [ReleaseEndDateInput, setReleaseEndDateInput] = useState("");
    const [movieInput, setMovieInput] = useState("");
    const [artistList, setArtist] = React.useState([]);
    const [selectedAr, setAr] = React.useState([]);
    const [genreList, setGenre] = React.useState([]);
    const [selectedGe, setGe] = React.useState([]);
    const [movies, setMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    
    useEffect(() => {
        async function getArtist() {
            const fetchedResponse = await getData("artists");
            const fetchedArtistArray = fetchedResponse.artists;
            setArtist(fetchedArtistArray);
        }
        async function getGenre() {
            const fetchedResponse = await getData("genres");
            const fetchedGenreArray = fetchedResponse.genres;
            setGenre(fetchedGenreArray);
        }
        async function getMovies() {
            const fetchedResponse = await getData("movies?status=published");
            const fetchedMovies = fetchedResponse.movies;
            setMovies(fetchedMovies);
        }
        async function getReleasedMovies() {
            const fetchedResponse = await getData("movies?status=released");
            const fetchedReleasedMovies = fetchedResponse.movies;
            setReleasedMovies(fetchedReleasedMovies);
        }
        getArtist();
        getGenre();
        getMovies();
        getReleasedMovies();
    }, []);

    async function getData(appendedUrl) {
        try {
            const rawresponse = await fetch('/api/v1/' + appendedUrl,
                {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json;charset=UTF-8",
                    }
                })
            if (rawresponse.ok) {
                const response = await rawresponse.json();
                return response;
            }
            else {
                const errorback = await rawresponse.json();
                const error = new Error(errorback.message);
                throw error;
            }
        } catch (e) {
            alert(e.message);
        }
    }

    async function handleApplyButton() {
        var url = "movies?status=released";
        if (movieInput != "") {
            url = url + "&title=" + movieInput;
        }
        if (ReleaseStartDateInput != "") {
            url = url + "&start_date=" + ReleaseStartDateInput;
        }
        if (ReleaseEndDateInput != "") {
            url = url + "&end_date=" + ReleaseEndDateInput;
        }
        if (selectedGe.join(',') != "") {
            url = url + "&genre=" + selectedGe.join(',');
        }
        if (selectedAr.join(',') != "") {
            url = url + "&artists=" + selectedAr.join(',');
        }
        const fetchedResponse = await getData(url);
        const fetchedFilteredMoviesArray = fetchedResponse.movies;
        setReleasedMovies(fetchedFilteredMoviesArray);
    }

    function ReleaseStartDateHandler(e) {
        setReleaseStartDateInput(e.target.value);
    }

    function ReleaseEndDateHandler(e) {
        setReleaseEndDateInput(e.target.value);
    }

    function movieInputHandler(e) {
        setMovieInput(e.target.value);
    }

    function handleArtist(e) {
        setAr(e.target.value);
    }

    function handleGenre(e) {
        setGe(e.target.value);
    }

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
                            <Link to={"/movie/" + releasedMovie.id}>
                                <img src={releasedMovie.poster_url} alt={releasedMovie.title} style={{ cursor: "pointer" }} />
                                <GridListTileBar title={releasedMovie.title} subtitle={<span>Release Date: {releasedMovie.release_date}</span>} />
                            </Link>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <div className="filter">
                <Card sx={{ minWidth: 240, maxWidth: 240 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="textSecondary">
                            FIND MOVIES BY:
                        </Typography>
                        <FormControl style={{ marginTop: 10, minWidth: 240, maxWidth: 240 }}>
                            <InputLabel htmlFor="moviename">Movie Name</InputLabel>
                            <Input id="moviename" value={movieInput} onChange={movieInputHandler} />
                        </FormControl>
                        <br />
                        <FormControl style={{ marginTop: 10, minWidth: 240, maxWidth: 240 }}>
                            <InputLabel htmlFor="select-multiple-checkbox">Genre</InputLabel>
                            <Select
                                multiple
                                value={selectedGe}
                                onChange={handleGenre}
                                input={<Input id="select-multiple-checkbox" placeholder="Genre" />}
                                renderValue={selected => selected.join(', ')}>
                                {genreList.map(genreEn => (
                                    <MenuItem key={genreEn.id} value={genreEn.genre}>
                                        <Checkbox checked={selectedGe.indexOf(genreEn.genre) > -1} />
                                        <ListItemText primary={genreEn.genre} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl style={{ marginTop: 10, minWidth: 240, maxWidth: 240 }}>
                            <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                            <Select
                                multiple
                                value={selectedAr}
                                onChange={handleArtist}
                                input={<Input id="select-multiple-checkbox" placeholder="Artist" />}
                                renderValue={selected => selected.join(', ')}>
                                {artistList.map(artistEn => {
                                    var artistname = artistEn.first_name + " " + artistEn.last_name;
                                    return (
                                        <MenuItem key={artistEn.id} value={artistname}>
                                            <Checkbox checked={selectedAr.indexOf(artistname) > -1} />
                                            <ListItemText primary={artistname} />
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl style={{ marginTop: 10, minWidth: 240, maxWidth: 240 }}>
                            <TextField id="releasestartdate" type="date" label="Release Date Start" InputLabelProps={{ shrink: true }} value={ReleaseStartDateInput} onChange={ReleaseStartDateHandler} />
                        </FormControl>
                        <FormControl style={{ marginTop: 10, minWidth: 240, maxWidth: 240 }}>
                            <TextField id="releaseenddate" type="date" label="Release Date End" InputLabelProps={{ shrink: true }} value={ReleaseEndDateInput} onChange={ReleaseEndDateHandler} />
                        </FormControl>
                        <FormControl style={{ marginTop: 20, minWidth: 240, maxWidth: 240 }}>
                            <Button variant="contained" color="primary" onClick={handleApplyButton}>APPLY</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
}
export default Home;