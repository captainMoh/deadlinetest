# deadlinetest

Pour s'inscrire, il faut utiliser la methode POST sur la route '/users/signup' avec les élements comme ci-dessous :

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
        
axios.post('/users/signup', formulaire, options)


Pour la connexion, il faut utiliser la methode POST sur la route '/users/login' avec les élements suivants en ajoutant le token d'identification au header :

axios.post('/users/login', {identifiant, mdp, options)
            .then(response => axios.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`)
            .catch(error => console.log(error))
            
 Une fois connecté, on à l'id de l'utilisateur, alors pour récuperer ses données on fait sur la route '/users/:id' :
 axios.get(`/users/${id}`)
 
 Pour modifier ses données on fait preil mais avec la methode PUT cette fois avec les données à modifier:
 axios.put(`/users/${id}`, {adresse, email, cp, ville}, options)
                
