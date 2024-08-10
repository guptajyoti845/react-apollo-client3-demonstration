import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { favoriteBookVar } from './reactiveVars';

function ToggleFavoriteButton({ book }) {
    const favoriteBooks = useReactiveVar(favoriteBookVar);

    const isFavorite = favoriteBooks.some(favBook => favBook.id === book.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            favoriteBookVar(favoriteBooks.filter(favBook => favBook.id !== book.id));
        } else {
            favoriteBookVar([...favoriteBooks, book]);
        }
    };

    return (
        <button onClick={toggleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
}

export default ToggleFavoriteButton;
