const Projet = require('../models/Projet')

module.exports = class ProjetController{

    static list(req, res){
        Projet.findAll()
        .then((results) =>{
            res.render('listProjet',{Projets: results} )
        }).catch((err) =>{
            console.log(err);
        })
    }

    static listProjet(req, res){
        res.render('ajouterProjet',)
    }

    static ajouter(req, res){
        const nom_projet = req.body.nom_projet
        const resource = req.body.resource
        const suivi = req.body.suivi
        const duree = req.body.duree

        if(nom_projet == '' || suivi == '' || duree == '' || resource ==  ''){
            req.flash('error',"Tous les champs sont obligatoire...")
            res.redirect('/projet/add-form')
        }
        
        Projet.create({
            nom_projet: nom_projet,
            resource: resource,
            suivi: suivi,
            duree: duree
        }).then((result) =>{
            req.flash('success',"Enregistrement effuctue avec success")
            res.redirect('/projet/list')
        }).catch((err) =>{
            req.flash('error',"Enregistrement Non effuctue")
            res.redirect('/projet/add-form')
        });
    }

    static delete(req, res){
        const {id} = req.params;
        Projet.destroy(
            {
                where: {id: id},
            }).then((result) =>{
                req.flash('success',"Suppression effectue avec success")
                res.redirect('/projet/list')
            }).catch((err) =>{
                req.flash('error',"suppression Non effectue")
                res.redirect('/projet/list')
            });
    }

    static edit(req, res){
        const id = req.params.id;
        Projet.findByPk(id)
        .then((result) =>{
            res.render('editProjet', {Projets: result})
        }).catch((err) =>{
            req.flash('error', "Error de suppression")
            res.redirect('/projet/add-form')
        })
    }

    static update(req, res){
        const {id,nom_projet,resource,suivi,duree} = req.body
        Projet.update(
            {
                nom_projet:nom_projet,
                resource:resource,
                suivi:suivi,
                duree:duree
            },
            {
                where: {id:id}
            }).then((result)=>{
                req.flash('success',"Modification effectue avec success")
                res.redirect('/projet/list')
            }).catch((err)=>{
                req.flash('error',"Modification Non effectue")
                res.redirect('/projet/update/${id}')
            });
    }
}