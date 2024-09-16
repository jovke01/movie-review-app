import { Movie, MovieCard } from '@/types/Movie';
import path from 'node:path';
import * as fs from 'node:fs';

const formatMovies = (movies: Movie[]) => {
  return movies.map(
    (movie): MovieCard => ({
      id: movie.id,
      title: movie.title,
      poster: `${process.env.NEXT_PUBLIC_IMAGE_URL}/${movie.poster_path}`,
      release_date: movie?.release_date ?? null,
      isFavorite: false,
      imdbRating: movie.ratings[0].rating,
    })
  );
};

const filterUnique = (array: MovieCard[]): MovieCard[] => {
  const uniqueMovies = new Map<number, MovieCard>();
  array.forEach((movie) => {
    if (!uniqueMovies.has(movie.id)) {
      uniqueMovies.set(movie.id, movie);
    }
  });
  return Array.from(uniqueMovies.values());
};

export const getFormattedMovies = async () => {
  const filePath = path.join(process.cwd(), '/src/data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const movies = JSON.parse(jsonData);
  const formatedMovies = formatMovies(movies);
  const filteredMovies = filterUnique(formatedMovies);

  return filteredMovies.sort((a, b) => b.imdbRating - a.imdbRating);
};
