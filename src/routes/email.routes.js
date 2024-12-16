const express = require('express');
const {sendEmail} = require('../services/mailer')
const router = express.Router();


router.post('/send',async(req,res) => {
    const {to,subject,text} = req.body;
    try{
        const info = await sendEmail(to,subject,text);
        res.status(200).json({message: 'Email sent', messageId: info.messageId});
    }
    catch(error){
        res.status(500).json({message: 'Error sending email', error: error.message});
    }
})

module.exports = router;