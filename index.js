/* const express = require('express');
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');
    //import built-in node and modules fs and path
    fs = require('fs'),
    path = require('path'); */

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const uuid = require("uuid");
const morgan = require("morgan");
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*let users = [
    {
        id: 1,
        name: 'Emir Garilao',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Nikki Torres',
        favoriteMovies: ['Titanic', 'Ella Enchanted']
    },
    {
        id: 3,
        name: 'Katrina Harris',
        favoriteMovies: ['Harry Potter and the Sorcerer Stone', 'Taken']
    }
]

let movies = [
    {
        'Title': '300',
        'Description': 'The plot revolves around King Leonidas (Gerard Butler), who leads 300 Spartans into battle against the Persian "God-King" Xerxes (Rodrigo Santoro) and his invading army of more than 300,000 soldiers. As the battle rages, Queen Gorgo (Lena Headey) attempts to rally support in Sparta for her husband.',
        'Genre': {
            'Name': 'Action',
            'Definition': 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.',
        },
        'Director': {
            'Name': 'Zack Snyder',
            'Bio': 'Zachary Edward Snyder is an American film director, producer, screenwriter, and cinematographer. He made his feature film debut in 2004 with Dawn of the Dead, a remake of the 1978 horror film of the same name.',
        },
        'Image Path': "https://upload.wikimedia.org/wikipedia/en/5/5c/300poster.jpg",
        'Featured': 'true'
    },
    {
        'Title': 'Notting Hill',
        'Description': 'The story is of a romance between a London bookseller (Grant) and a famous American actress (Roberts) who happens to walk into his shop.',
        'Genre': {
            'Name': 'Romantic Comedy',
            'Definition': 'Romantic comedy (also known as romcom or rom-com) is a subgenre of comedy and slice of life fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas, such as how true love is able to surmount most obstacles.',
        },
        'Director': {
            'Name': 'Roger Michell',
            'Bio': 'Roger Michell was a South African-born British theatre, television and film director. He was best known for directing films such as Notting Hill and Venus, as well as the 1995 made-for-television film Persuasion.',
        },
        'Image Path': "https://m.media-amazon.com/images/M/MV5BMTE5OTkwYzYtNDhlNC00MzljLTk1YTktY2IxZjliZmNjMjUzL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
        'Featured': 'false'
    },
    {
        'Title': 'Hachi: A Dog\'s Tale',
        'Description': 'Hachi: A Dog\'s Tale is a 2009 American drama film that is an adaptation of the 1987 Japanese film Hachikō Monogatari. The original film told the true story of the Akita dog named Hachikō who lived in Japan in the 1920s.',
        'Genre': {
            'Name': 'Drama',
            'Definition': 'The drama genre is strongly based in a character, or characters, that are in conflict at a crucial moment in their lives. Most dramas revolve around families and often have tragic or painful resolutions.',
        },
        'Director': {
            'Name': 'Lasse Hallstrom',
            'Bio': 'He first became known for directing almost all the music videos by the pop group ABBA, and subsequently became a feature film director.',
        },
        'Image Path': "https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/chameleon/title-movie/233845_HachiDogsTale_2010_1400x2100_ENG.jpg?itok=B74hPEGN",
        'Featured': 'false'
    },
    {
        'Title': 'National Treasure',
        'Description': 'In the film, Benjamin Franklin Gates, a historian, along with friend Riley Poole and archivist Abigail Chase, search for a massive lost Freemason treasure, of which a map is hidden on the back of the Declaration of Independence, pointing to the secret location of this "national treasure".',
        'Genre': {
            'Name': 'Adventure',
            'Definition': 'Adventure Films are exciting stories, with new experiences or exotic locales. Adventure films are very similar to the action film genre, in that they are designed to provide an action-filled, energetic experience for the film viewer. Rather than the predominant emphasis on violence and fighting that is found in action films, however, the viewer of adventure films can live vicariously through the travels, conquests, explorations, creation of empires, struggles and situations that confront the main characters, actual historical figures or protagonists.',
        },
        'Director': {
            'Name': 'Jon Turteltaub',
            'Bio': 'He was born on August 8, 1963 and is an American film director and producer',
        },
        'Image Path': "https://m.media-amazon.com/images/M/MV5BMTY3NTc4OTYxMF5BMl5BanBnXkFtZTcwMjk5NzUyMw@@._V1_.jpg",
        'Featured': 'false'
    },
    {
        'Title': 'Pan\'s Labyrinth',
        'Description': 'The story takes place in Spain during the summer of 1944, five years after the Spanish Civil War, during the early Francoist period. The narrative intertwines this real world with a mythical world centered on an overgrown, abandoned labyrinth and a mysterious faun creature, with whom the main character, Ofelia, interacts. Ofelia\'s stepfather, the Falangist Captain Vidal, hunts the Spanish Maquis who fight against the Francoist regime in the region, while Ofelia\'s pregnant mother Carmen grows increasingly ill. Ofelia meets several strange and magical creatures who become central to her story, leading her through the trials of the old labyrinth garden. The film employs make-up, animatronics, and CGI effects to bring life to its creatures.',
        'Genre': {
            'Name': 'Fantasy',
            'Definition': 'Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore. Its roots are in oral traditions, which then became fantasy literature and drama.',
        },
        'Director': {
            'Name': 'Guillermo del Toro',
            'Bio': 'A Mexican filmmaker, author, and actor. He directed the Academy Award-winning fantasy films Pan\'s Labyrinth (2006) and The Shape of Water (2017), winning the Academy Awards for Best Director and Best Picture for the latter.',
        },
        'Image Path': "https://m.media-amazon.com/images/M/MV5BYzFjMThiMGItOWRlMC00MDI4LThmOGUtYTNlZGZiYWI1YjMyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
        'Featured': 'false'
    },
    {
        'Title': 'Titanic',
        'Description': 'Incorporating both historical and fictionalized aspects, it is based on accounts of the sinking of the RMS Titanic and stars Leonardo DiCaprio and Kate Winslet as members of different social classes who fall in love aboard the ship during its ill-fated maiden voyage.',
        'Genre': {
            'Name': 'Drama',
            'Definition': 'The drama genre is strongly based in a character, or characters, that are in conflict at a crucial moment in their lives. Most dramas revolve around families and often have tragic or painful resolutions.',
        },
        'Director': {
            'Name': 'James Cameron',
            'Bio': 'He is known for making science fiction and epic films, and first gained recognition for writing and directing The Terminator (1984). Cameron found further success with Aliens (1986), The Abyss (1989), Terminator 2: Judgment Day (1991), and the action comedy True Lies (1994). He also wrote and directed Titanic (1997) and Avatar (2009), with Titanic earning him Academy Awards in Best Picture, Best Director and Best Film Editing. Avatar, filmed in 3D technology, earned him nominations in the same categories.',
        },
        'Image Path': "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png",
        'Featured': 'false'
    },
    {
        'Title': 'The Green Mile',
        'Description': 'It stars Tom Hanks as a death row prison guard during the Great Depression who witnesses supernatural events following the arrival of an enigmatic convict (Michael Clarke Duncan) at his facility. ',
        'Genre': {
            'Name': 'Drama',
            'Definition': 'The drama genre is strongly based in a character, or characters, that are in conflict at a crucial moment in their lives. Most dramas revolve around families and often have tragic or painful resolutions.',
        },
        'Director': {
            'Name': 'James Cameron',
            'Bio': 'He is known for making science fiction and epic films, and first gained recognition for writing and directing The Terminator (1984). Cameron found further success with Aliens (1986), The Abyss (1989), Terminator 2: Judgment Day (1991), and the action comedy True Lies (1994). He also wrote and directed Titanic (1997) and Avatar (2009), with Titanic earning him Academy Awards in Best Picture, Best Director and Best Film Editing. Avatar, filmed in 3D technology, earned him nominations in the same categories.',
        },
        'Image Path': "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_FMjpg_UX1000_.jpg",
        'Featured': 'false'
    },
    {
        'Title': 'Ella Enchanted',
        'Description': 'The story is a retelling of Cinderella featuring various mythical creatures including fairies, elves, ogres, gnomes, and giants.',
        'Genre': {
            'Name': 'Fantasy',
            'Definition': 'Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore. Its roots are in oral traditions, which then became fantasy literature and drama.',
        },
        'Director': {
            'Name': 'Tommy O\'Haver',
            'Bio': 'An AMerican film director and screenwriter who grew up in Carmel, Indiana, a suburb of Indianapolis.'
        },
        'Image Path': "https://m.media-amazon.com/images/M/MV5BZGI1MjMzMWEtZDc3Ni00Y2RiLTllOGQtMTVlZjRkOGE3MGNlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
        'Featured': 'false'
    },
    {
        'Title': 'Taken',
        'Description': 'It s a 2008 French English-language action-thriller film written by Luc Besson and Robert Mark Kamen, and directed by Pierre Morel. It stars Liam Neeson, Maggie Grace, Famke Janssen, Katie Cassidy, Leland Orser, and Holly Valance. Neeson plays Bryan Mills, an ex-CIA officer who sets about tracking down his teenage daughter Kim (Grace) and her best friend Amanda (Cassidy) after the two girls are kidnapped by Albanian human traffickers while traveling in France during a vacation.',
        'Genre': {
            'Name': 'Action',
            'Definition': 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.',
        },
        'Director': {
            'Name': 'Pierre Morel',
            'Bio': 'He is a French film director and cinematographer. His work includes District 13, From Paris with Love, and Taken.',
        },
        'Image Path': "https://m.media-amazon.com/images/M/MV5BMTM4NzQ0OTYyOF5BMl5BanBnXkFtZTcwMDkyNjQyMg@@._V1_FMjpg_UX1000_.jpg",
        'Featured': 'false'
    },
    {
        'Title': 'Olympus Has Fallen',
        'Description': 'The plot depicts a North Korean-led guerrilla assault on the White House, and focuses on disgraced Secret Service agent Mike Banning\'s efforts to rescue U.S. President Benjamin Asher.',
        'Genre': {
            'Name': 'Action',
            'Definition': 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.',
        },
        'Director': {
            'Name': 'Antoine Fuqua',
            'Bio': 'He is an American filmmaker, known for his work in the action and thriller genres. He was originally known as a director of music videos, and made his film debut in 1998 with The Replacement Killers. His critical breakthrough was the award-winning 2001 crime thriller Training Day.'
        },
        'Image Path': "https://m.media-amazon.com/images/M/MV5BNTU0NmY4MWYtNzRlMS00MDkxLWJkODYtOTM3NGI2ZDc1NTJhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
        'Featured': 'false'
    }
];
*/

app.use(morgan('common', {stream: accessLogStream,}));
app.use(express.static('public'));

//Default text response
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
});

//CREATE
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + 'already exists');
        } else {
            Users
            .create({
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

//Get all users
app.get('/users', (req, res) => {
    Users.find()
    .then((users) => {
        res.status(201).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Get a user by username
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//UPDATE
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
    }
},
{ new: true }, //This line makes sure that the updated document is returned
(err, updatedUser) => {
    if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    } else {
        res.json(updatedUser);
    }
});
});

//Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

//DELETE a movie to a user's list of favorites
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

//DELETE a user by username
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
        } else {
            res.status(200).send(req.params.Username + ' was deleted');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//GET all movies
app.get('/movies', (req, res) => {
    Movies.find()
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//GET a movie by title
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//GET a movie by genre
app.get('/movies/genre/:genreName', (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.genreName })
    .then((movie) => {
        res.json(movie.Genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error ' + err);
    });
});

//GET a movie by director
app.get('/movies/director/:directorName', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.directorName })
    .then((movie) => {
        res.json(movie.Director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error ' + err);
    });
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

//Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('There was an error. Please try again later.');
});

//listen for requests
app.listen(3000, () => {
    console.log('Your app is listening on port 3000.');
});