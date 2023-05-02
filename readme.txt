-Piiquante BACKEND API-

L'API qui a été développée est une API RESTful pour une application de gestion de sauces.
En plus de pouvoir créer un compte et de se connecter avec ses identifiants,
elle permet de créer, lire, mettre à jour et supprimer des sauces, ainsi que de gérer les likes et dislikes associés à chaque sauce.
L'API utilise Node.js, Express et MongoDB pour stocker les données. Elle utilise également JSON Web Tokens (JWT) pour l'authentification
et Multer pour la gestion des fichiers image.
L'API est sécurisée et utilise un middleware pour vérifier l'authentification de chaque requête.

-Configuration-

Pour utiliser cette application, vous aurez besoin de Node.js d'installé sur votre machine.

Un fichier .env est fourni dans la version de test, il ne sera pas présent sur le repo github.
Ce fichier (.env) n'est pas nécessaire, sauf si on ne passe pas par MongoDB pour la clé secrète, dans ce cas il faudra le créer et adapter le code
(voir les commentaires sur "controllers/user.js", "middleware/auth.js").

Installez les dépendances : npm install
Démarrez le frontend: npm start run
Démarrez le serveur : nodemon server


-Structure de l'application-

L'application est structurée selon le modèle MVC (Model-View-Controller).


- controllers/
  - user.js
  - sauce.js
- images/
  -(fichiers images)
- middleware/
  - auth.js
  - multer-config.js
- models/
  - User.js
  - Sauce.js
- routes/
  - user.js
  - sauce.js
- app.js
- config.js
- server.js


-API endpoints-

L'application expose les endpoints suivants :

-Users
POST /signup : Création d'un utilisateur
POST /login : Connexion d'un utilisateur

-Sauces
POST /api/sauces : Création d'une sauce
PUT /api/sauces/:id : Modification d'une sauce
DELETE /api/sauces/:id : Suppression d'une sauce
GET /api/sauces : Récupération de toutes les sauces
GET /api/sauces/:id : Récupération d'une sauce par son identifiant
POST /api/sauces/:id/like : Ajout d'un like ou d'un dislike à une sauce

Auteur
Aloulou Neil aka JoyfulCanis on github.