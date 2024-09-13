import Head from 'next/head';
import path from 'node:path';
import * as fs from 'node:fs';
import { Movie, MovieCard } from '@/types/Movie';
import MovieCardComponent from '@/components/movieCard';
import style from '../styles/Home.module.scss';
import Nav from '@/components/nav';

export default function Home({ movies }: { movies: MovieCard[] }) {
  return (
    <>
      <Head>
        <title>Movie ratings</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className={style.cardGrid}>
        {movies.map((movie) => (
          <MovieCardComponent movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), '/src/data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const movies: Movie[] = JSON.parse(jsonData);

  const formatedMovies = movies.map(
    (movie): MovieCard => ({
      id: movie.id,
      title: movie.title,
      poster: `${process.env.NEXT_PUBLIC_IMAGE_URL}/${movie.poster_path}`,
      release_date: movie?.release_date ?? null,
      isFavorite: false,
      imdbRating: movie.ratings[0].rating,
    })
  );
  const onlyUnique = (array: MovieCard[]): MovieCard[] => {
    const uniqueMovies = new Map<number, MovieCard>();
    array.forEach((movie) => {
      if (!uniqueMovies.has(movie.id)) {
        uniqueMovies.set(movie.id, movie);
      }
    });

    return Array.from(uniqueMovies.values());
  };

  const filteredMovies = onlyUnique(formatedMovies);
  const sortedMovies = filteredMovies.sort(
    (a, b) => b.imdbRating - a.imdbRating
  );
  return {
    props: {
      movies: onlyUnique(sortedMovies),
    },
  };
}
