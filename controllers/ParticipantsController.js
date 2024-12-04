const Participants = require('../models/Participants');
const Formation = require('../models/Formation')

module.exports = class ParticipantsController{
    
    static liste (req ,res){
        Participants.findAll()
        .then((result) =>{
            res.render('listeParticipants',{Participants: result})
        }).catch((err) =>{
            console.log(err);
        })
    }

    static liste(req, res){
        Formation.findAll()
        .then((result) =>{
            res.render('listeParticipants',{Participants: result})
        }).catch((err) =>{
            console.log(err);
        })
    }

    static Participantslist(res ,req){
        res.render('listeParticipants');
    }
}