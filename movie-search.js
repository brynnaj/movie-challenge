const request = require('request');
const title = process.argv[2];

const movieSearch = (title, callback) => {
    const url = 'https://api.themoviedb.org/3/search/movie?query=' + encodeURIComponent(title) + '&api_key=eaf64dd69627ac888ac3bfec917bcb67';

    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to the movie database.', undefined);
        } else if (body.results.length === 0) {
            callback('No movies found with the given title.', undefined);
        } else {
            const results = body.results[0];
            const data = {
                id: results.id
            };
            callback(undefined, data);
        }
    });
};

const getSimilarMovies = (id, callback) => {
    const similarUrl = 'https://api.themoviedb.org/3/movie/' + encodeURIComponent(id) + '/similar?api_key=eaf64dd69627ac888ac3bfec917bcb67';

    request({ url: similarUrl, json: true }, (error, response, body) => {
        if (error) {
            callback('Error fetching similar movies.', undefined);
        } else {
            const similarMovies = body.results;
            callback(undefined, similarMovies);
        }
    });
};

movieSearch(title, (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Movie Id:', data.id);

        
        getSimilarMovies(data.id, (error, similarMovies) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Similar Movies:');
                similarMovies.forEach((movie) => {
                    console.log('Title:', movie.title);
                    
                });
            }
        });
    }
});




module.exports = movieSearch
module.exports = getSimilarMovies



