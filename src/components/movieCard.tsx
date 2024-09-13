import React from 'react';
import { MovieCard } from '@/types/Movie';
import Image from 'next/image';
import style from '../styles/component-styles/MovieCardStyle.module.scss';
import starIcon from '../../public/assets/icons/star.png';
import calendarIcon from '../../public/assets/icons/calendar.png';
import { formatDate } from '@/utils/date-util';

const MovieCardComponent = ({ movie }: { movie: MovieCard }) => {
  return (
    <div key={movie.id} className={style.card}>
      <Image
        width={100}
        height={40}
        src={movie.poster}
        alt={movie.title}
        className={style.poster}
      />
      <div className="flex">
        <p className={style.title}>{movie.title}</p>
        <div className={style.textWIcon}>
          <Image src={starIcon} alt="rating icon" />
          <p>{movie.imdbRating}</p>
        </div>
      </div>
      <div className={style.textWIcon}>
        <Image src={calendarIcon} width={24} height={24} alt="calendar icon" />
        <p>{formatDate(movie.release_date) ?? ''}</p>
      </div>

      {/*<p>{movie.isFavorite.toString()}</p>*/}
    </div>
  );
};

export default MovieCardComponent;
