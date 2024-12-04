const Commande   = require('../models/Commande')
const Client = require('../models/Client')
const Produit = require('../models/Produit')
const {Op} = require('sequelize')

module.exports = class CommandeController{
    static list (req, res) {
        Commande.findAll(
            {
                include: [
                    { model: Produit, as: 'produit', attributes: ['nom'] }, // Inclure le nom du produit
                    { model: Client, as: 'client', attributes: ['nomclient'] }    // Inclure le nom du client
                ]
            }
        )
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
        Promise.all([
            Commande.findByPk(id),
            Produit.findAll(),
            Client.findAll()
        ]).then(([commande, produit, client]) => {
            if(!commande){
                req.flash('error',"Commande introuvable")
                return res.redirect('/commande/list')
            }
            res.render('editCommande',{Commande:commande, produit:produit, client:client})
        })
       .catch((err) =>{
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

    static bloque(req, res) {
        const id = req.params.id;
    
        // Utiliser findByPk pour trouver une commande par son ID
        Commande.findByPk(id)
        .then((commande) => {
            if (!commande) {
                console.log("Commande introuvable", id);
                req.flash('error', "Commande introuvable");
                return res.redirect('/commande/list');
            }
            // Changer l'état de 'isBlocked'
            const newStatut = !commande.isBlocked;
            console.log("Ancien statut:", commande.isBlocked, "Nouveau statut:", newStatut);
            commande.update({ isBlocked: newStatut })
            .then(() => {
                const message = newStatut ? "Commande bloquée avec succès" : "Commande débloquée avec succès";
                req.flash('success', message);
                res.redirect('/commande/list');
            })
            .catch((err) => {
                console.error("Erreur lors de la mise à jour de la commande:", err);
                req.flash('error', "Erreur lors de la mise à jour de la commande");
                res.redirect('/commande/list');
            });
        })
        .catch((err) => {
            console.error("Erreur lors de la récupération de la commande:", err);
            req.flash('error', "Erreur lors de la récupération de la commande");
            res.redirect('/commande/list');
        });
    }
    
}