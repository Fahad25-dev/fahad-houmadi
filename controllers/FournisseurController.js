const Fournisseur = require('../models/Fournisseur')

module.exports = class FournisseurController{
    static list(req,res){
        Fournisseur.findAll()
        .then((result) =>{
            res.render('listFournisseur', {Fournisseurs : result})
        }).catch((err) =>{
            console.log(err)
        });
    }

    static listfournisseur(req, res){
        res.render('ajouterFournisseur')
    }

    static ajouterFournisseur(req, res){
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const adresse = req.body.adresse;
        const telephone = req.body.telephone;
        const email = req.body.email;

        if(nom == "" || prenom == "" || adresse == "" || telephone == "" || email == ""){
            req.flash('error',"Veuillez remplir tous les champs")
            res.redirect('/fournisseur/add-form')
        }

        Fournisseur.create({
            nom: nom,
            prenom:prenom,
            adresse:adresse,
            telephone:telephone,
            email:email
        }).then((result) =>{
            req.flash('success',"Enregistrement effectue avec success")
            res.redirect('/fournisseur/list')
       }).catch((error)=>{
            req.flash('error',"Erreur lors de l'enregistrement")
            res.redirect('/fournisseur/add-form')
       })

    }

    static delete(req, res){
        const {id} = req.params
        Fournisseur.destroy({
            where: {id:id}
        }).then((result) => {
            req.flash('success'," Suppression effectue avec Success")
            res.redirect('/fournisseur/list')
        }).catch((err) => {
            req.flash('error',"Erreur lors de la suppression")
            res.redirect('/fournisseur/list')
        })
    }

    static edit(req,res){
        const {id} = req.params
        Fournisseur.findByPk(id)
       .then((result) => {
        res.render('editeFournisseur', {Fournisseur: result})
        }).catch((err) => {
            req.flash('error',"Improssible de faire l'edition")
            res.redirect('/fournisseur/list')
       })
    }

    static update(req, res){
        const {id,nom,prenom,adresse,email,telephone} = req.body
        Fournisseur.update({ 
            nom:nom,
            prenom:prenom,
            adresse:adresse,
            telephone:telephone,
            email:email
          },
          {
            where : {id:id}
        }).then((result)=>{
            req.flash('success',"Modification effectue avec success")
            res.redirect('/fournisseur/list')
        }).catch((err) =>{
            req.flash('error',"Erreur lors de la modification")
            res.redirect('/fournisseur/update/${id}')
        });
    }
}