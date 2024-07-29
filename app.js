// Framework express
const express = require('express')
// Résolution des chemins
const path = require('path')
// Gestion des messages flash
const session = require('express-session')
const flash = require('express-flash')

// Création d'une application express
const app = express() 
const PORT = 7000

// Connexion et synchronisation avec la base de données test_db
const db = require('./database/db')
db.authenticate()
.then((result) => {
    db.sync()
}).catch((err) => {
    console.log(err)
});

// Définition de ejs comme moteur de template
app.set('view engine', 'ejs')

// Définition du répertoire statique
app.use(express.static(path.join(__dirname, 'public')));

// Autres middlewares et configurations

// Importer les routes ou autres configurations
require('./uploads/multerconfig');

// parser les requêtes en json et urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Définition du repertoire static(images, css, js, ...)
app.use(express.static(path.join(__dirname, 'public')))

// confiugration de la session
app.use(session({
    secret: 'Your&Secret@key',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// configuration du middleware express-flash
app.use(flash())
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use('/produit', require('./routes/produit.router'))
app.use('/client', require('./routes/client.router'))
app.use('/vente', require('./routes/vente.router'))
app.use('/fournisseur', require('./routes/fournisseur.router'))
app.use('/projet', require('./routes/projet.router'))
app.use('/employe', require('./routes/employe.router'))
app.use('/facture', require('./routes/Facture.router'))
app.use('/email', require('./routes/email.router'))
app.use('/commande', require('./routes/commande.router'))
app.use('/formation',require('./routes/Formation.router'))
app.use('/formateur',require('./routes/Formateur.router'))
//const produitRouter = require('./routes/Produit.router');
app.get('/', (req, res) => {
    res.render('accl');
});

app.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}`)
})