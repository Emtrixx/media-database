if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const Movie = require('../models/movies');
const moviesList = require('./top100');
const fetch = require('node-fetch');
const { response } = require('express');

const dbUrl = "mongodb://localhost:27017/media-db" || process.env.DB_URL
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log("Connected to mongodb");
    }).catch(() => {
        console.log("ERROR - Could not connect to mongodb");
    })


const seedDB = async () => {
    await Movie.deleteMany({});
    for (let i = 0; i < moviesList.length; i++) {
        let response = await fetch(`https://api.themoviedb.org/3/find/${moviesList[i].id}?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&external_source=imdb_id`)
        let data = await response.json();
        const foundMovie = data.movie_results[0]
        const newMovie = new Movie({
            id: foundMovie.id,
            title: foundMovie.title,
            watched: '2002-12-09',
            description: foundMovie.overview,
            release_date: foundMovie.release_date,
            language: foundMovie.original_language
        })
        await newMovie.save()
    }

}

seedDB().then(() => {
    mongoose.connection.close()
});