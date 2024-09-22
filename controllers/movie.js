let movies = [
    {
        id: '1',
        name: 'Batman',
        year: 1994,
        genre: 'Action'
    },
    {
        id: '2',
        name: 'Superman',
        year: 2000,
        genre: 'Action'
    },
    {
        id: '3',
        name: 'Titanic',
        year: 1990,
        genre: 'Drama'
    }
];

const movieControllers = {
    getMovies: (req, res) => {
        res.status(200).json(movies);
    },
    getMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = movies.find((movie) => movie.id === id);
        if (movieExist) {
            return res.status(200).json(movieExist);
        } else {
            return res.status(404).json({ message: `Movie don't exists!` });
        }
    },
    createMovie: (req, res) => {
        const { name, genre, year } = req.body;
        if (!name || !genre || !year) {
            return res
                .status(400)
                .json({
                    message: 'Please add a name, genre and year to the request'
                });
        } else {
            const newMovie = {
                id: String(movies.length + 1),
                name,
                genre,
                year
            };
            movies.push(newMovie);
            return res.status(201).json(newMovie);
        }
    },
    updateMovie: (req, res) => {
        const { id } = req.params;
        const { name, genre, year } = req.body;

        const movieExist = movies.find((movie) => movie.id === id);
        if (movieExist) {
            if (!name || !genre || !year) {
                return res
                    .status(400)
                    .json({
                        message:
                            'Please add a name, genre and year to the request'
                    });
            } else {
                movieExist.name = name;
                movieExist.genre = genre;
                movieExist.year = year;
                res.status(200).json(movieExist);
            }
        } else {
            return res.status(404).json({ message: `Movie don't exists!` });
        }
    },
    deleteMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = movies.find((movie) => movie.id === id);
        if (movieExist) {
            movies = movies.filter((movie) => movie.id !== id);
            res.status(200).json(`Movie: ${movies.id} deleted successfully`);
        } else {
            return res.status(404).json({ message: `Movie don't exists!` });
        }
    }
};

export default movieControllers;
