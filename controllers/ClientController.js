const client = require('../models/Client')
module.exports = class ClientController{

    static list(req,res){
        client.findAll()
        .then((result) =>{
            res.render('listeClient',{ Clients : result})
        }).catch((err) =>{
            console.log(err)
        })
    }

    static listClient(req ,res){
        res.render('ajouterClient')
    }

    static ajouterClient(req , res){
        const nomclient = req.body.nomclient
        const prenom = req.body.prenom
        const adresse = req.body.adresse
        const email = req.body.email
        const contact = req.body.contact

        if( nomclient == '' || prenom == '' || adresse=='' || email=='' || contact == ''){
            req.flash('error' ,"Tous les champs sont obligatoire")
            return res.redirect('/client/add-form')
        }

        Client.create({
            nomclient: nomclient,
            prenom:prenom,
            adresse:adresse,
            email:email,
            contact:contact,
        }).then((result) =>{
            req.flash('success',"Enregistrement effectue avec success")
            res.redirect('/client/list')
        }).catch((err)=>{
            req.flash('error' ,"Error d'enregstrement du client ")
            res.redirect('/client/add-form')
        });

    }

    static delete(req ,res){
        const { id } = req.params 
        Client.destroy({
            where: {id: id}
        }).then((result) =>{
            req.flash('success',"Suppression effectue avec success")
            res.redirect('/client/list')
        }).catch((err) =>{
            req.flash('error',"Error de suppression")
            res.redirect('/cleint/list')
        })
    }

    static edit(req , res){
        const id = req.params.id
        Client.findByPk(id)
        .then((result) =>{
            res.render('editClient' ,{Client : result})
        }).catch((err)=>{
            req.flash('error',"Improssible de faire l'edition")
            res.redirect('/client/list')
        })
    }

    static update(req , res){
        const {id, nomclient, prenom,adresse,email,contact} = req.body
        client.update({
            nomclient:nomclient,
            prenom:prenom,
            adresse:adresse,
            email:email,
            contact:contact,
        },
        {
            where:{id:id}
        }).then((result) =>{
            req.flash('success',"Modification effectue avec success")
            res.redirect('/client/list')
        }).catch((err)=>{
            req.flash('error',"Modification Non effectue")
            res.redirect('/client/update/${id}')
        });
    }

}
