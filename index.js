const express = require('express');
    morgan = require('morgan');

    //import built-in node and modules fs and path
    fs = require('fs'),
    path = require('path');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

let topMovies = [
    {
        title: 'Muppets Treasure Island',
        director: 'Brian Henson'
    },
    {
        title: 'Muppets Christmas Carol',
        director: 'Brian Henson'
    },
    {
        title: 'Muppets From Space',
        director: 'Tim Hill'
    },
    {
        title: 'Labyrinth',
        director: 'Jim Henson'
    },
    {
        title: 'Pan\'s Labyrinth',
        director: 'Guillermo del Toro'
    },
    {
        title: 'Titanic',
        director: 'James Cameron'
    },
    {
        title: 'The Green Mile',
        director: 'Frank Darabont'
    },
    {
        title: 'Ella Enchanted',
        director: 'Tommy O\'Haver'
    },
    {
        title: 'Taken',
        director: 'Pierre Morel'
    },
    {
        title: 'Olympus Has Fallen',
        director: 'Antoine Fuqua'
    }
];

app.use(morgan('common', {stream: accessLogStream,}));
app.use(express.static('public'));

//GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get('/', (req, res) => {
    res.send('Welcome to my app!')
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

//Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('There was an error. Please try again later.');
});

//listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});