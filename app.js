const request = require('request')
const movieSearch = require('./movie-search')
const title = process.argv[2]






movieSearch(title, (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
});

