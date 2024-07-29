const { raw } = require('mysql2');
const Employe = require('../models/Employe');
const employe = require('../models/Employe');
const { where } = require('sequelize');
module.exports = class EmployeController{
    
    static list(req, res){
        Employe.findAll()
        .then((result) =>{
            res.render('listEmploye',{Employe: result})
        }).catch((err) =>{
            console.log(err)
        });
    }

    static listemployer(req, res){
        res.render('ajouterEmployer')
    }

    static ajouter(req, res){
        const nom_employe = req.body.nom_employe;
        const prenom_employe = req.body.prenom_employe;
        const adresse = req.body.adresse;
        const affectation_employe = req.body.affectation_employe;
        const tache_employe = req.body.tache_employe;
        const heure_travail = req.body.heure_travail;

        if (affectation_employe == '' || heure_travail == '' || nom_employe == '' || prenom_employe == '' || adresse =='' || tache_employe == '') {
            req.flash('error',"tous les champs sont obligatoire");
            res.redirect('/add-form');
        }
        Employe.create({
            nom_employe: nom_employe,
            prenom_employe: prenom_employe,
            adresse: adresse,
            affectation_employe:affectation_employe,
            tache_employe: tache_employe,
            heure_travail:heure_travail
        }).then((result) =>{
            req.flash('success',"Enregistrement effectue avec success")
            res.redirect('/employe/list')
        }).catch((err) =>{
            req.flash('error',"Enregistrement non effectue")
            res.redirect('/employe/add-form')
        });
    }

    static delete(req, res) {
        const {id} = req.params
        Employe.destroy({
            where: {id: id}
        }).then((result) =>{
            req.flash('success',"Suppression  effectue")
            res.redirect('/employe/list')
        }).catch((err) =>{
            req.flash('error',"Suppression non effectue");
            res.redirect('/employe/list')
        });
            
    }

    static edit(req, res) {
        const id = req.params.id;
        Employe.findByPk(id)
        .then((result) =>{
            res.render('editEmploye',{Employe: result})
        }).catch((err) =>{
            req.flash('success',"Edition non successfully")
            res.redirect('/employe/list');
        })
    }

    static update(req, res){
        const {id,nom_employe,prenom_employe,adresse,affectation_employe,tache_employe,heure_travail} = req.body
        Employe.update({
            nom_employe:nom_employe,
            prenom_employe:prenom_employe,
            adresse :adresse,
            affectation_employe :affectation_employe,
            tache_employe :tache_employe,
            heure_travail :heure_travail,
        },
        {
            where:{id:id}
        }).then((result) =>{
            req.flash('success',"Employe updated")
            res.redirect('/employe/list')
        }).catch((err) =>{
            req.flash('error','Error updating employee')
            res.redirect('/employe/update/${id}')
        });
    }
}