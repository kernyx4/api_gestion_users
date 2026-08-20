const express = require('express');
const app = express();
const PORT = 3000;

// Permet à l'API de lire les données JSON envoyées dans les requêtes
app.use(express.json());

// ==========================================
// 1. MIDDLEWARE (Logging)
// ==========================================
// Ce middleware enregistre chaque requête reçue dans la console
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} sur ${req.url}`);
  next();
});

// Base de données temporaire en mémoire
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// ==========================================
// 2. MIDDLEWARE DE VALIDATION
// ==========================================
// Vérifie que les données envoyées sont valides
const validateUserData = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Le nom et le courriel sont requis.' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Format de courriel invalide.' });
  }
  next();
};

// ==========================================
// 3. ROUTES CRUD
// ==========================================

// GET : Récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// GET : Récupérer un utilisateur par son ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
  res.status(200).json(user);
});

// POST : Créer un nouvel utilisateur (avec validation)
app.post('/users', validateUserData, (req, res) => {
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT : Mettre à jour un utilisateur (avec validation)
app.put('/users/:id', validateUserData, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

  user.name = req.body.name;
  user.email = req.body.email;
  res.status(200).json(user);
});

// DELETE : Supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

  const deletedUser = users.splice(index, 1);
  res.status(200).json({ message: 'Utilisateur supprimé.', user: deletedUser[0] });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
