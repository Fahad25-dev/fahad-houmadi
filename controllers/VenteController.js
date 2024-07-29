const Vente = require('../models/Vente')
const Produit = require('../models/Produit')
const Client = require('../models/Client')
const {Op} = require('sequelize')

module.exports = class VenteController{
    static list(req , res){
        Vente.findAll()
        .then((result) =>{
            res.render('listeVente' ,{ Vente : result})
        }).catch((err) =>{
            console.log(err)
        })
    }

    static ajouterClient( req ,res){
        let clientsPromise = Client.findAll();
        let produitsPromise = Produit.findAll();

        Promise.all([clientsPromise, produitsPromise])
            .then(([clients, produits]) => {
                res.render('ajouterVente', { clients: clients, produits: produits });
            })
            .catch(err => {
                console.log(err);
        });
    }

    static listVente(req ,res){
        res.render('ajouterVente')
    }

    static ajouterVente(req ,res){
        const produit_id =  req.body.produit_id
        const client_id = req.body.client_id
        const quantite = req.body.quantite
        const prix  = req.body.prix

        if(produit_id == '' || client_id == '' || quantite == '' || prix == ''){
            req.flash('error',"Tous les champs sont obligatoire")
            return res.redirect('/vente/add-form')
        }
        Vente.create({
            produit_id : produit_id,
            client_id : client_id,
            quantite: quantite,
            prix: prix,
        }).then((result) =>{
            req.flash('success' ,"Enregistrement effectue avec success")
            res.redirect('/vente/list')
        }).catch((err) =>{
            req.flash('errro' ,"Erreru d'enregistrement")
            res.redirect('/vente/add-form')
        })
    }

    static delete(req, res) {
        const {id} = req.params
        Vente.destroy({
            where:{id:id}
        }).then((result) =>{
            req.flash('success',"suppression effectue avec success")
            res.redirect('/Vente/list')
        }).catch((err) =>{
            req.flash('error',"Error de suppression")
            res.redirect('/vente/list')
        });

    }

    static edit(req, res) {
        const id = req.params.id
        Vente.findByPk(id)
        .then((result) =>{
            res.render('editeVente',{ Vente: result})
        }).catch((err) =>{
            req.flash('error',"impossible de faire l'editioan")
            res.redirect('/Vente/list')
        })
    }

    static update(req, res) {
        const {id,client_id,produit_id,quantite,prix} = req.body
        Vente.update({
            client_id:client_id,
            produit_id:produit_id,
            quantite:quantite,
            prix:prix
        },
        {
            where: {id:id},
        }).then((result)=>{
            req.flash('success',"Moddification Success")
            res.redirect('/Vente/list')
        }).catch((err)=>{
            req.flash('error',"Moddification Error")
            res.redirect('/Vente/update/${id}')
        });
    }

    static recherche(req , res){
        const {recher} = req.query;
        Vente.findAll({
            where : {
                [Op.or]: [
                    {produit_id :{ [Op.like]: `%${recher}%` }},
                ]
            }
        }).then((results) => {
            req.flash('success',"Successfully")
            res.render( 'rechcercherVente', {Vente: results})
        }).catch((err) => {
            req.flash('error',"error")
            res.redirect('/vente/list')
        });
    }
}