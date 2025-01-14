const Employe = require('../models/Employe');
const Facture = require('../models/Facture');
const Projet = require('../models/Projet');
const Client = require('../models/Client');
module.exports= class FactureController{

    static list(req, res){
        Facture.findAll(
            {
                include:[
                    {model: Employe,as:'employe',attributes:['nom_employe'] },
                    {model:Client ,as:'client',attributes:['nomclient']},
                    {model:Projet,as:'projet',attributes:['nom_projet']}

                ]
            }
        )
        .then((result) =>{
            res.render('listFacture',{Facture: result});
        }).catch((err) =>{
            console.log(err);
        })
    }

    static listFactures(req, res){
        res.render('ajouterFacture')
    }

    static listfac(req, res){
        let projetPromise = Projet.findAll();
        let employePromise = Employe.findAll();
        let clientPromise = Client.findAll();

        Promise.all([projetPromise,employePromise,clientPromise])
        .then(([projets, employes,clients]) =>{
            res.render('ajouterFacture', { projets: projets, employes: employes, clients:clients});
        }).catch((err) =>{
            console.log(err);
        })
    }

    static ajouter(req, res){
        const projetId = req.body.projetId
        const employeId = req.body.employeId
        const clientId = req.body.clientId
        const adress = req.body.adress
        const datadebt = req.body.datadebt
        const datadefn = req.body.datadefn
        const montant = req.body.montant

        if(datadebt =='' || datadefn == '' || montant =='' || projetId == '' || employeId == ''|| clientId == '' || adress == ''){
            req.flash('error',"tous les champs sont obligatoire")
            return redirect('/facture/add-form')
        }

        Facture.create({
            projetId:projetId,
            employeId:employeId,
            clientId:clientId,
            adress:adress,
            datadebt:datadebt,
            datadefn:datadefn,
            montant:montant,
        }).then((result) =>{
            req.flash('success',"success")
            res.redirect('/facture/list')
        }).catch((err) =>{
            req.flash('error',"error")
            res.redirect('/facture/add-form')
        })
    }

    static delete(req, res){
        const {id} = req.params 
        Facture.destroy({
            where: {id: id}
        }).then((result) => {
            req.flash('success','Successfully deleted')
            req.redirect('/facture/list')
        }).catch((err) => {
            req.flash('error', "Error deleting")
            res.redirect('/facture/list')
        })
    }

    static edit(req , res){
        const id = req.params.id
        Promise.all([
            Facture.findByPk(id),
            Employe.findAll(),
            Client.findAll(),
            Projet.findAll()
        ])
        .then(([facture, client, employe, projet]) =>{
            if(!facture){
                req.flash('error',"error")
              return  res.redirect('/facture/list')
            }
            res.render('editFacture',{facture:facture, client:client, employe:employe, projet:projet})
        }).catch((err) =>{
            req.flash('error',"error")
            res.redirect('/facture/list')
        })
    }

    static update(req , res){
        const {id,projetId,employeId,clientId,adress,datadebt,datadefn,montant} = req.body
        Facture.update({
            projetId:projetId,
            employeId:employeId,
            clientId:clientId,
            adress:adress,
            datadebt:datadebt,
            datadefn:datadefn,
            montant:montant
        },
        {
            where:{id:id}
        }).then((result) =>{
            req.flash('success',"Modification effectue avec success")
            res.redirect('/facture/list')
        }).catch((err) =>{
            req.flash('error',"Error de Modification")
            res.redirect('/facture/update/${id}')
        })
    }
}