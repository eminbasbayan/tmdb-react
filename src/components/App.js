import React from 'react';


import MovieList from './MovieList';
import SearchBar from './SearchBar';
import axios from 'axios';
require('dotenv').config();
console.log(process.env.REACT_APP_API_KEY);

class App extends React.Component {

    /* State bir obje olduğu için içindeki array proporty olarak gelir. O yüzden movies = değil : olacak. */
    state = {
        movies:
            [
        
            ],

            searchQuery: ""
    }

    // fetch API

 /*   async componentDidMount() {
        const baseURL = "http://localhost:3002/movies";
        const response = await fetch(baseURL);
        const data = await response.json();
        this.setState({movies: data})
    } */

        // AXIOS API
        async componentDidMount() {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`); 
            console.log(response.data.results);
            this.setState({movies: response.data.results})
        }

    deleteMovie = async (movie) => {
        // axios Request 
        axios.delete(`http://localhost:3002/movies/${movie.id}`)
        
        // fetch delete request
     /*    const baseURL =  `http://localhost:3002/movies/${movie.id}` // Silme işleminin gerçekleştiği ID
        await fetch(baseURL, {
            method: "DELETE"
        }) */
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        /* this.setState ({
            movies: newMovieList
        })
         */

        this.setState(state => ({
            movies: newMovieList
        }))
    }

    searchMovie = (event) => {
        this.setState({searchQuery: event.target.value})
    }

    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.title.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        )

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar searchMovieProp={this.searchMovie}/>
                    </div>
                </div>
                <MovieList
                    movies={filteredMovies}
                    deleteMovieProp={this.deleteMovie} />
            </div>
        )
    }
}

export default App;