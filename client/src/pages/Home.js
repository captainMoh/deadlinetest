import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.PNG';
import loader from '../assets/oval.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

    const navigate = useNavigate();

    const [identifiant, setIndentifiant] = useState('');
    const [mdp, setMdp] = useState('');
    const [connect, setConnect] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [email, setEmail] = useState('');
    const [adresse, setAdresse] = useState('');
    const [cp, setCp] = useState('');
    const [ville, setVille] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState('Mot de passe et/ou identifiant incorrect');
    const [active, setActive] = useState('');
    const [load, setLoad] = useState('');
    const [borderRed, setBorderRed] = useState('');
    const [textBtnModifier, setTextBtnModifier] = useState('Enregistrer les modifications');
    const [borderBlack, setBroderBlack] = useState('');

    const options = {
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    }

    const loadUser = userId => {
        axios.get(`/users/${userId}`)
            .then(docs =>  {
                setDataUser(docs.data)
                setAdresse(docs.data.Adresse)
                setEmail(docs.data.Email)
                setCp(docs.data.Cp)
                setVille(docs.data.Ville)
            })
            .then(() => setConnect(true))
            .catch(error => console.log(error))
        setLoad('')
    }

    const modifUser = () => {
        setTextBtnModifier('Enregistrement...')
        setLoad('load');
        
        const modification = {
           adresse,
           email,
           cp,
           ville
        }

        axios.put(`/users/${dataUser._id}`, modification, options)
            .then(() => setTextBtnModifier('Enregistré'))
            .then(() => {
                setBroderBlack('')
                setDisabled(true)
                setTextBtnModifier('Enregistrer les modifications')
                setLoad('')
            })
            .catch(error => {
                setLoad('')
                console.log(error);
            })
    }

    const supprCompte = () => {
        setLoad('load')
        axios.delete(`/users/${dataUser._id}`, options)
            .then(docs => {
                setLoad('')
                delete axios.defaults.headers.common['authorization']
                console.log(docs)
            })
            .then(() => navigate('./supprimer', {replace: true}))
            .catch(error => {
                setLoad('')
                console.log(error);
            })
    }


    const connexion = e => {
        e.preventDefault();

        setLoad('load')
        setBorderRed('')

        const formulaire = {
            identifiant,
            mdp
        }

        axios.post('/users/login', formulaire, options)
            .then(response => {
                axios.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`
                
                setIndentifiant('');
                setMdp('');
                loadUser(response.data.userId);
            })
            .catch(error => {
                setMessage('Mot de passe et/ou identifiant incorrect');
                setActive('active');
                setBorderRed('border-red');
                setMdp('');
                setLoad('')
                console.log(error)
            })

    }

    const logOut = () => {
        delete axios.defaults.headers.common['authorization']
        window.location.reload();
    }

    const activeModif = () => {
        setBroderBlack('border-black');
        setDisabled(false)
    }

    return (
        <div className='home'>
            {!connect ? 
                <div className='connexion'>
                
                    <div className='left-side'>
                    <div className={`chargement ${load}`}><img src={loader} alt='loader' /></div>
                        <div className='logo'><img src={logo} alt='logo-Deadline' /></div>
                        <form className='form-connexion' onSubmit={connexion}>
                        <h1>Connectez-vous à votre compte</h1>
                            <input className={borderRed} id='id' name='id' type='text' pattern='[^<>]+' placeholder='Pseudo ou Email' value={identifiant} onChange={e => setIndentifiant(e.target.value)} required/>

                            <input className={borderRed} id='Mot-de-Passe' name='Mot-de-Passe' pattern='[^<>]+' type='password' placeholder='Mot de passe' value={mdp} onChange={e => setMdp(e.target.value)} required/>

                            <div className={`alert ${active}`}>
                                <p>{message}</p>
                            </div>
                            <button type='submit'>Connexion</button>
                            <button onClick={() => navigate('./signup', { replace: true })}>S'inscrire</button>
                            <a className='contacter' href='/'>Contactez-nous</a>
                        </form>
                    </div>
                    
                    <div className='right-side'>
                        <div className='photo'>
                            <div className='outer-photo'>
                                <h1>Accélérez votre chantier, gérer mieux</h1>
                            </div>
                        </div>
                    </div>
                    
                </div> 
                    : 
                <div className='profil'>

                    <div className={`chargement ${load}`}><img src={loader} alt='loader' /></div>
                    <div className='informations'>
                    
                        <h1>Mes informations personnelles</h1>
                        <h3>Pseudo: <span>{dataUser.Pseudo}</span></h3>
                        <h3>Nom: <span>{dataUser.Nom}</span></h3>
                        <h3>Prénom: <span>{dataUser.Prenom}</span></h3>

                        <div className='adresse'>
                            <h3>Adresse:</h3>
                            <input className={borderBlack} type='text' pattern='[^<>]+' value={adresse} onChange={e => setAdresse(e.target.value)} disabled={disabled} />
                            <button className='icone-modifier' onClick={activeModif}><FontAwesomeIcon icon={faPen} /></button>
                        </div>

                        <div className='adresse'>
                            <h3>Code Postale:</h3>
                            <input className={borderBlack} type='text' pattern='[^<>]+' value={cp} onChange={e => setCp(e.target.value)} disabled={disabled} />
                            <button className='icone-modifier' onClick={activeModif}><FontAwesomeIcon icon={faPen} /></button>
                        </div>

                        <div className='adresse'>
                            <h3>Ville:</h3>
                            <input className={borderBlack} type='text' pattern='[^<>]+' value={ville} onChange={e => setVille(e.target.value)} disabled={disabled} />
                            <button className='icone-modifier' onClick={activeModif}><FontAwesomeIcon icon={faPen} /></button>
                        </div>

                        <div className='mail'>
                            <h3>Mail:</h3>
                            <input className={borderBlack} type='text' pattern='[^<>]+' value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} />
                            <button className='icone-modifier' onClick={activeModif}><FontAwesomeIcon icon={faPen} /></button>
                        </div>

                        <h3>Téléphone: <span>{dataUser.Telephone}</span></h3>
                        <button className='modifications' onClick={modifUser}>{textBtnModifier}</button>
                        <button className='deconnexion' onClick={logOut}>Déconnexion</button>
                        <button className='supprimer' onClick={supprCompte}>Supprimer mon compte</button>
                    </div>

                    <div className='logo'></div>
                </div>
            }
        </div>
    );
};

export default Home;