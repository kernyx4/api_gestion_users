# API de Gestion des Utilisateurs

Ce projet est une API REST de gestion d'utilisateurs développée dans le cadre de l'évaluation du cours.

## Fonctionnalités
- **CRUD complet :**
  - `GET /users` : Liste tous les utilisateurs
  - `GET /users/:id` : Récupère un utilisateur spécifique
  - `POST /users` : Ajoute un utilisateur
  - `PUT /users/:id` : Met à jour un utilisateur
  - `DELETE /users/:id` : Supprime un utilisateur
- **Middleware de Logging :** Enregistre la méthode et l'URL de chaque requête entrante.
- **Validation des données :** Vérifie la présence des champs obligatoires (`name`, `email`) et la validité du courriel.

## Utilisation de Copilot
GitHub Copilot a été utilisé tout au long du projet pour :
1. Générer la structure des routes CRUD.
2. Déboguer la gestion des erreurs lors de la recherche des identifiants (`parseInt`).
3. Concevoir le middleware de validation des requêtes HTTP.

## Installation et Lancement
1. Installer les dépendances : `npm install`
2. Lancer le serveur : `npm start`
