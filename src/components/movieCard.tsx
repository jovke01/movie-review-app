import React from 'react';
import { MovieCard } from '@/types/Movie';
import Image from 'next/image';
import style from '../styles/component-styles/MovieCardStyle.module.scss';
import starIcon from '../../public/assets/icons/star.png';
import calendarIcon from '../../public/assets/icons/calendar.png';
import favorite from '../../public/assets/svgs/favorite.svg';
import favoriteChecked from '../../public/assets/svgs/favorite-checked.svg';
import { formatDate } from '@/utils/date-util';

const MovieCardComponent = ({
  movie,
  index,
}: {
  movie: MovieCard;
  index: number;
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const handleFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setIsFavorite(!isFavorite);
    }
  };
  return (
    <div
      key={movie.id}
      className={style.card}
      tabIndex={0}
      onKeyUp={(event) => handleFocus(event)}
    >
      <Image
        width={100}
        height={40}
        src={movie.poster}
        alt={movie.title}
        className={style.poster}
        priority={index < 10}
      />
      <div className={style.favorite}>
        <Image
          src={isFavorite ? favoriteChecked : favorite}
          alt="is favorite"
        />
      </div>
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
    </div>
  );
};

export default MovieCardComponent;
