const express = require('express');
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');
    //import built-in node and modules fs and path
    fs = require('fs'),
    path = require('path');

app.use(bodyParser.json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

let users = [
    {
        id: 1,
        name: 'Emir Garilao',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Nikki Torres',
        favoriteMovies: 'Titanic'
    },
    {
        id: 3,
        name: 'Katrina Harris',
        favoriteMovies: 'Harry Potter and the Sorcerer Stone'
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
    },
    {
        'Title': 'The Green Mile',
        'Description': 'It stars Tom Hanks as a death row prison guard during the Great Depression who witnesses supernatural events following the arrival of an enigmatic convict (Michael Clarke Duncan) at his facility. ',
        'Genre': {
            'Name': 'Drama',
            'Definition': 'The drama genre is strongly based in a character, or characters, that are in conflict at a crucial moment in their lives. Most dramas revolve around families and often have tragic or painful resolutions.',
        },
        'Director': {
            'Name': 'Frank Darabont',
            'Bio': 'He is an American film director, scrrenwriter and producer. He has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for such horror films as A Nightmare on Elm Street 3: Dream Warriors (1987), The Blob (1988) and The Fly II (1989). As a director, he is known for his film adaptations of Stephen King novellas and novels, such as The Shawshank Redemption (1994), The Green Mile (1999), and The Mist (2007).',
        }
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
        }
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
        }
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
        }
    }
];

app.use(morgan('common', {stream: accessLogStream,}));
app.use(express.static('public'));

//GET requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix API!');
});

//CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need names')
    }

})

//UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})

//CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieName} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
})

//DELETE
app.delete('/users/:id/:movieTitle', (req,res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
});

//DELETE
app.delete('/users/:id', (req,res) => {
    const { id } = req.params;

    let users = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('no such user')
    }
});

//READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

//READ
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
})

//READ
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
})

//READ
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }
})

//app.get('/documentation', (req, res) => {
//    res.sendFile('public/documentation.html', { root: __dirname });
//});

//app.get('/movies', (req, res) => {
//    res.json(topMovies);
//});

Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('There was an error. Please try again later.');
});

//listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});