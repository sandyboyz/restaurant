const router = require('express').Router();
const Users = require('../models/users');

router.post('/register-admin', (req, res) => {
Users.findOne({role: 'admin'})
    .then(data => {
        if (!data) {
            const user = new Users({
                role: 'admin',
                password: '$2y$10$XMAQdYlT/gINoUHlLg.DouHmeRXBBRGGCSOdXPGY6fJ6rO48pa3Je'
            });
            user.save()
                .then(data => res.json(data))
                .catch(e => console.log(e));
        }
        else {
            res.json("admin exist")
        }
    })
    .catch(e => console.log(e))
});

router.post('/register-worker', (req, res) =>{

});

router.post('/login', (req, res) => {

});


module.exports = router;