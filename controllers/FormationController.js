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

    static ajouterformation(req, res){
        const nom_formation = req.body.nom_formation
        const adresse = req.body.adresse
        const date_debt = req.body.date_debt
        const date_fn  = req.body.date_fn
        const nombre_participant = req.body.nombre_participant
        const Montant = req.body.Montant 
        const Photo = req.file ? req.file.filename : null;
        if (nom_formation  == '' || adresse == '' || date_debt == '' || date_fn =='' || nombre_participant == '' || Montant==''||  Photo=='') {
            req.flash('error', "Tous les champs sont obligatoires, y compris la photo");
            return res.redirect('/formation/list');
        }

        Formation.create({
            nom_formation:nom_formation,
            adresse:adresse,
            date_debt:date_debt,
            date_fn:date_fn,
            nombre_participant:nombre_participant,
            Montant:Montant,
            Photo:Photo
// la pagntion 
        }).then((result) => {
            req.flash('success',"enregistrement effectue avec success");
            res.redirect('/formation/list');
        }).catch((err) => {
            req.flash('error', "Erreur lors de l'enregistrement du client");
            res.redirect('/formation/list');
        });
    }

}