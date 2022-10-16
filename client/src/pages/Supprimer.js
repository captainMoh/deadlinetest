import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Supprimer = () => {

    const navigate = useNavigate()
    return (
        <div className='suppr'>
            <div className='infos'>
                <h1>Vous nous quittez <FontAwesomeIcon icon={faSadCry} /></h1>
                <h6>Votre compte à bien été supprimé</h6>
                <button onClick={() => navigate('../signup', { replace: true })}>Créer un nouveau compte</button>
                <button onClick={() => navigate('../', { replace: true })}>Se connecter à un autre compte</button>
            </div>
        </div>
    );
};

export default Supprimer;