const Formateur = require('../models/Formateur')
module.exports = class FormateurController{
    static liste (req, res){
        Formateur.findAll()
        .then((result) =>{
            res.render('listformateur',{formateurs: result})
        }).catch((err) =>{
            console.log(err)    
        });
    }

    static getlimit(req,res){
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
    
        const offset = (page - 1) * limit;
    
        try {
            const { count, rows } = Formation.findAndCountAll({
                limit,
                offset
            });
    
            res.json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                data: rows
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static listformateur(req,res){
        res.render('listformateur');
    }

    static ajouterformteur(req ,res){
        const nom_formateur = req.body.nom_formateur;
        const prenom_formateur = req.body.prenom_formateur;
        const adresse_formateur = req.body.adresse_formateur;
        const affectation_formateur = req.body.affectation_formateur;
        const heure_travailler = req.body.heure_travailler;
        const duree_traviller = req.body.duree_traviller;
        if(nom_formateur == '' || prenom_formateur == '' || adresse_formateur=='' ||  affectation_formateur=='' || heure_travailler =='' || duree_traviller=='') {
            req.flash('error',"tous les champs sont obligatoire");
            return res.redirect('/formateur/list')
        }

        Formateur.create({
            nom_formateur:nom_formateur,
            prenom_formateur:prenom_formateur,
            adresse_formateur:adresse_formateur,
            affectation_formateur:adresse_formateur,
            heure_travailler:heure_travailler,
            duree_traviller:heure_travailler
        }).then((result) =>{
            req.flash('success',"Enregistrement effectue avec success");
            res.redirect('/formateur/list')
        }).catch((err) =>{
            req.flash('error','Error d enrgistrement ');
            res.redirect('/formateur/list');  
        })
    }

    static delete(req,res){
        const {id} = req.params
        Formateur.destroy({
            where:{id:id}
        }).then((result) =>{
            req.flash('success',"Suppression effectue avec success")
            res.redirect('/formateur/list')
        }).catch((err) =>{
            req.flash('error',"Error de suppressionn")
            res.redirect('/formateur/lsit')
        })
    }

    static edit(req,res){
        const {id} = req.params
        Formateur.findByPk(id)
        .then((result) =>{
            res.render('editeformateur',{formateur: result})
        }).catch((err) =>{
            req.flash('error',"Error d'edition");
            res.redirect('/formateur/list')
        });
    }

    static update(req,res){
        const {id,nom_formateur,prenom_formateur,adresse_formateur,affectation_formateur,heure_travailler,duree_traviller} = req.body
        Formateur.update({
            id:id,
            nom_formateur:nom_formateur,
            prenom_formateur:prenom_formateur,
            adresse_formateur:adresse_formateur,
            affectation_formateur:affectation_formateur,
            heure_travailler:heure_travailler,
            duree_traviller:duree_traviller
        },
        {
            where:{id:id}
        }).then((result) =>{
            req.flash('success',"Modification effectue avec success")
            res.redirect('/formateur/list')
        }).catch((err) =>{
            req.flash('error',"Modification non effectue")
            res.redirect('/formateur/list')
        });
    }
   
}