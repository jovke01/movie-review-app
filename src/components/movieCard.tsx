import React from 'react';
import { MovieCard } from '@/types/Movie';
import Image from 'next/image';
import style from '../styles/component-styles/MovieCardStyle.module.scss';

const MovieCardComponent = ({ movie }: { movie: MovieCard }) => {
  return (
    <div key={movie.id} className={style.card}>
      <Image width={100} height={40} src={movie.poster} alt={movie.title} />
      <p>{movie.title}</p>
      <p>{movie.release_date ?? ''}</p>
      <p>{movie.isFavorite.toString()}</p>
      <h2>{movie.imdbRating}</h2>
    </div>
  );
};

export default MovieCardComponent;
