import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const Connecte = () => {

    const navigate = useNavigate();
    
    return (
        <div className='connecte'>
            <div>
                <h1>Bienvenue parmis nous, vous êtes inscrit <FontAwesomeIcon className='icon' icon={faCheckCircle} /></h1>
                <button onClick={() => navigate('../', { replace: true })}>Connectez-vous maintenant</button>
            </div>
        </div>
    );
};

export default Connecte;