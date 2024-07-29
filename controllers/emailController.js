const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    // Configuration du transporteur
});

module.exports = {
    sendRegistrationConfirmationEmail: function(email) {
        const mailOptions = {
            from: 'houmadifahad100@gmail.com',
            to: email,
            subject: 'Confirmation d\'inscription',
            text: 'Merci pour votre inscription !'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation d\'inscription :', error);
            } else {
                console.log('E-mail de confirmation d\'inscription envoyé avec succès :', info.response);
            }
        });
    },
    // Autres méthodes d'envoi d'e-mails...
};
