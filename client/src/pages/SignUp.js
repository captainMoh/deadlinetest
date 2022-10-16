import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo3.PNG';
import loader from '../assets/oval.svg';

const SignUp = () => {

    const navigate = useNavigate();

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [cp, setCp] = useState('');
    const [ville, setVille] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [mdp, setMdp] = useState('');
    const [confirmeMdp, setConfirmeMdp] = useState('');
    const [message, setMessage] = useState('');
    const [active, setActive] = useState('');
    const [borderRed, setBorderRed] = useState('');
    const [borderMp, setBorderMp] = useState('');
    const [load, setLoad] = useState('');


    const inscription = e => {
        e.preventDefault();
        setLoad('load')
        setBorderMp('')
        setBorderRed('')

        const formulaire = {
            nom,
            prenom,
            adresse,
            cp,
            ville,
            email,
            telephone,
            pseudo,
            mdp
        }

        const options = {
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }

        if(mdp === confirmeMdp) {
            axios.post('/users/signup', formulaire, options)
            .then(() => {
                navigate('../success', { replace: true })
                setLoad('')
            })
            .catch(error => {
                setMessage(error.response.data)
                setActive('active')
                setMdp('')
                setConfirmeMdp('')
                setBorderRed('border-red')
                setLoad('')
            })
        } else {
            setMessage('La confirmation du mot de passe est incorrect')
            setActive('active')
            setBorderMp('border-red')
            setLoad('')
        }
        
    }


    return (
        <div className='signup'>
    
            <div className='left-side'>
                <div className='outer'></div>
                <div className='logo' onClick={() => navigate('../', {replace: true})}><img src={logo} alt='logo-Deadline' /></div>
            </div>
            
            <div className='right-side'>
                <div className={`chargement ${load}`}><img src={loader} alt='loader' /></div>
                <a className='house' href='/'><FontAwesomeIcon icon={faHome} /></a>
                <h1>Créer un compte</h1>
                <h6>* Tout les champs sont obligatoires</h6>
                <form onSubmit={inscription} className='formulaire'>
                    
                    <input id='Nom' name='Nom' type='text' pattern='[^<>]+' placeholder='Nom' value={nom} onChange={e => setNom(e.target.value)} required/>

                    <input id='Prenom' name='Prenom' type='text' pattern='[^<>]+' placeholder='Prénom' value={prenom} onChange={e => setPrenom(e.target.value)} required/>

                    <input id='Adresse' name='Adresse' type='text' pattern='[^<>]+' placeholder='Adresse' value={adresse} onChange={e => setAdresse(e.target.value)} required/>

                    <input id='cp' name='cp' type='text' pattern='[^<>]+' placeholder='Code Postale' value={cp} onChange={e => setCp(e.target.value)}  required/>

                    <input id='ville' name='ville' type='text' pattern='[^<>]+' placeholder='Ville' value={ville} onChange={e => setVille(e.target.value)}  required/>

                    <input className={borderRed} id='Email' name='Email' type='text' pattern='[^<>]+' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required/>

                    <input id='Telephone' name='Telephone' type='text' pattern='[^<>]+' placeholder='Téléphone' value={telephone} onChange={e => setTelephone(e.target.value)} required/>

                    <input className={borderRed} id='Pseudo' name='Pseudo' type='text' pattern='[^<>]+' placeholder='Pseudo' value={pseudo} onChange={e => setPseudo(e.target.value)} required/>

                    <input className={borderMp} id='Mot-de-Passe' name='Mot-de-Passe' type='password' pattern='[^<>]+' placeholder='Mot de passe' value={mdp} onChange={e => setMdp(e.target.value)} required/>

                    <input className={borderMp} id='Confirme-mot-de-Passe' name='Confirme-mot-de-Passe' type='password' placeholder='Confirmer mot de passe' pattern='[^<>]+' value={confirmeMdp} onChange={e => setConfirmeMdp(e.target.value)} required/>

                    <div className={`alert ${active}`}>
                        <p>{message}</p>
                    </div>
                    <button type='submit'>S'inscrire</button>
                    <a className='contacter' href='/signup'>Contactez-nous</a>
                </form>
            </div>
            
        </div>
    );
};

export default SignUp;