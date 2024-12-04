const Formation = require('../models/Formation');
module.exports = class FormationController{

    static list(req, res){
        Formation.findAll()
        .then((result) => {
            res.render('listformation',{formations : result})
        }).catch((err) => {
            console.log(err);
        })
    }

    static formationlist(req,res){
        res.render('listformation');
    }

    static ajouterformation(req, res) {
        const { nom_formation, adresse, date_debt, date_fn, nombre_participant, Montant } = req.body;
        const Photo = req.file ? req.file.filename : null;
        console.log("Données reçues :", req.body);
        console.log("Fichier reçu :", req.file);
        console.log("Photo enregistrée :", req.file); // Vérifiez le fichier téléchargé
    
        if (!nom_formation || !adresse || !date_debt || !date_fn || !nombre_participant || !Montant || !Photo) {
            req.flash('error', "Tous les champs sont obligatoires, y compris la photo");
            return res.redirect('/formation/list');
        }
    
        Formation.create({
            nom_formation,
            adresse,
            date_debt,
            date_fn,
            nombre_participant,
            Montant,
            Photo
        })
        
        .then(() => {
            req.flash('success', "Enregistrement effectué avec succès");
            res.redirect('/formation/list');
        })
        .catch((err) => {
            req.flash('error', "Erreur lors de l'enregistrement");
            res.redirect('/formation/list');
        });
    }
    

}