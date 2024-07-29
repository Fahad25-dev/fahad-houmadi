const Produit = require('../models/Produit')
const { Op } = require('sequelize');

module.exports = class ProduitController{
    static list(req, res){
        Produit.findAll()
        .then((result) =>{
            res.render('listeProduit', { Produits: result, success: req.flash('success') })
        }).catch((err) =>{
            console.log(err)
        });
    }
    
    static listProduit(req, res) {
        res.render('ajouter')
    }

    static ajouter(req, res) {
        const nom = req.body.nom
        const categorie = req.body.categorie
        const quantite = req.body.quantite
        const prix = req.body.prix
        if(nom == '' || categorie == ''|| quantite == '' || prix == '') {
            req.flash('error', "Tous les champs sont obligatorires")
           return  res.redirect('/produit/add-form')
        }
        Produit.create({
            nom: nom,
            categorie: categorie,
            quantite: quantite,
            prix: prix,
        }).then((result) => {
            req.flash('success', "Ajouté avec succès")
            res.redirect('/produit/list')
        }).catch((err) => {
            req.flash('error', "Erreur d'ajout de la categorie")
            res.redirect('/produit/add-form')
        });
    }


    static delete(req, res){
        const { id } = req.params
        Produit.destroy({
            where : {id: id}
        }).then((result) => {
            req.flash('success', "suppression effectue avec success")
            res.redirect('/produit/list')
        }).catch((err) =>{
            req.flash('error' , "Error de suppression")
            res.redirect('/produit/list')
        });
    }

    static edit(req ,res){
        const id = req.params.id
        Produit.findByPk(id)
        .then((result) =>{
            res.render('editeProduit' ,{ Produits: result})
        }).catch((err) =>{
            req.flash('erro',"Impossible de terminer cette operation")
            res.redirect('/produit/list')
        });
    }

    static updateCate(req, res){
        const {id ,nom, categorie,quantite,prix} = req.body
        Produit.update({
            nom: nom,
            categorie: categorie,
            quantite: quantite,
            prix: prix,
            },
            {
            where:{id: id}
            }).then((result) => {
            req.flash('success',"Modification effectuee avec succes")
            res.redirect('/produit/list')
            }).catch((err) =>{
            req.flash('error',"Erreur de modification")
            res.redirect('/produit/update/${id}')
       });
    }

    static rechercher(req, res) {
        const { recher } = req.query;
        Produit.findAll({
            where: {
                [Op.or]: [
                    { nom: { [Op.like]: `%${recher}%` } },
                    { categorie: { [Op.like]: `%${recher}%` } }
                ]
            }
        }).then((result) => {
            req.flash('success', "Recherche réussie");
            res.render('rechercheProduit', { Produits: result });
        }).catch((err) => {
            console.error("Erreur lors de la recherche :", err);
            req.flash('error', "Erreur lors de la recherche");
            res.redirect('/produit/list');
        });
    }

}