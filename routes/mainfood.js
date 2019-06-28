const router = require('express').Router();
const MainFood = require('../models/mainfood');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
    }
});

const upload = multer({storage : storage});


router.get('/mainfood', (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 4;
    MainFood.paginate({}, {page : +page, limit: +limit}, (err, result) => {
        res.json(result);
    });
});

router.post('/mainfood', upload.single('productImage'),(req, res) => {
    const mainFood = new MainFood({
        name: req.body.name,
        price: req.body.price,
    });
    if (req.file !== undefined) mainFood.picture = `uploads/${req.file.filename}`;
    

    mainFood.save()
            .then(data => res.json(data))
            .catch(e => res.json(e.message));
    
});

router.purge('/mainfood/', (req, res) =>{
    MainFood.collection
    .drop()
    .then(res.json({msg: "mainfood collection dropped"}))
    .catch(e => console.log(e));
});

module.exports = router;