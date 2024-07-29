const Commande   = require('../models/Commande')
const Client = require('../models/Client')
const Produit = require('../models/Produit')
const {Op} = require('sequelize')

module.exports = class CommandeController{
    static list (req, res) {
        Commande.findAll()
        .then((result) => {
            res.render('listecommande', { Commande : result })
        }).catch((err) =>{
            console.log(err)
        });
    }

    static listCommande (req, res) {
        let produitcle = Produit.findAll()
        let clientcle = Client.findAll()

        Promise.all([produitcle, clientcle])
        .then(([Produits , clients]) =>{
            res.render('ajouterCommande', {clients: clients , Produits: Produits});
        }).catch((err) =>{
            console.log(err);
        })
    }

    static ajouterCommande(req,res){
        const produit_id  = req.body.produit_id;
        const client_id  = req.body.client_id;
        const adresse = req.body.adresse;
        const livre = req.body.livre;
        const date = req.body.date;
        const montant = req.body.montant;

        if( produit_id == '' || client_id == '' || adresse == '' || livre == '' || date == '' || montant == ''){
            req.flash('error',"Tous les champs sont obligatoire")
            return redirect('/commande/add-form')
        }

        Commande.create({
            produit_id: produit_id,
            client_id: client_id,
            adresse: adresse,
            livre: livre,
            date: date,
            montant: montant
        }).then((result) =>{
            req.flash('success',"Enregistrement effectue avec success")
            res.redirect('/commande/list')
        }).catch((err) =>{
            req.flash('error',"Enregistrement  non effectue")
            res.redirect('/commande/add-form')
        })

    }

    static delete(req ,res){
        const {id} = req.params
        Commande.destroy({
            where: {id: id},
        }).then((result) => {
            req.flash('success',"Suppression effectue avec success")
            res.redirect('/commande/list')
        }).catch((err) => {
            req.flash('error',"Error Suppression")
            res.redirect('/commande/list')
        });
    }

    static edit(req , res){
        const id = req.params.id
        Commande.findByPk(id)
        .then((result) =>{
            res.render('editCommande',{Commande: result})
        }).catch((err) =>{
            req.flash('error',"Error Edit")
            res.redirect('/commande/list')
        })
    }

    static update(req, res){
        const {id,produit_id, client_id,adresse,date,livre, montant} = req.body
        Commande.update({
            produit_id: produit_id,
            client_id: client_id,
            adresse: adresse,
            livre: livre,
            date: date,
            montant: montant
        },
        {
            where:{id:id},
        }).then((result) =>{
            req.flash('success',"Modification effectue avec success")
            res.redirect('/commande/list')
        }).catch((err) =>{
            req.flash('error',"Modification non effectue")
            res.redirect('/commande/update/${id}')
        })
    }

    static rechercher(req, res){
        const {recher} = req.query
        Commande.findAll({
            where : {
                [Op.or]: [
                    {produit_id :{ [Op.like]: `%${recher}%` }},
                    {client_id :{ [Op.like]: `%${recher}%` }},
                ]
            }
        }).then((result) =>{
            req.flash('success',"effectue avec succes")
            res.render('rechercherCommande',{ Commande: result})
        }).catch((err) =>{
            req.flash('error',"Rechercher non effectue")
            res.redirect('/commande/list')
        })
    }

    static bloque(req , res){
        
    }
}