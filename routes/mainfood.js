const router = require("express").Router();
const MainFood = require("../models/mainfood");
const multer = require("multer");
const passport = require("passport");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get("/mainfood", (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 4;
  const priceMin = req.query.priceMin || 0;
  const priceMax = req.query.priceMax || 500000;
  const price =
    priceMin && priceMax ? { $gte: priceMin, $lte: priceMax } : { $gte: 0 };
  const liveSearch =
    { name: new RegExp(req.query.liveSearch, "i"), price } || {};
  MainFood.paginate(
    liveSearch,
    { page: +page, limit: +limit },
    (err, result) => {
      res.json(result);
    }
  );
});
router.put(
  "/mainfood/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("productImage"),
  (req, res) => {
    const { id } = req.params;
    MainFood.findById(id)
      .then(data => {
        data.name = req.body.name;
        data.price = req.body.price;
        if (req.file !== undefined)
          data.picture = `uploads/${req.file.filename}`;

        data
          .save()
          .then(result => res.json(result))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);
router.get("/mainfood/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  MainFood.findById(id)
    .then(data => res.json(data))
    .catch(err => console.log(err));
});
router.delete(
  "/mainfood/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;
    MainFood.findById(id)
      .then(data => {
        data
          .remove()
          .then(() => res.json({ sucess: true }))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);
router.post(
  "/mainfood",
  passport.authenticate("jwt", { session: false }),
  upload.single("productImage"),
  (req, res) => {
    const mainFood = new MainFood({
      name: req.body.name,
      price: req.body.price
    });
    if (req.file !== undefined)
      mainFood.picture = `uploads/${req.file.filename}`;

    mainFood
      .save()
      .then(data => res.json(data))
      .catch(e => res.json(e.message));
  }
);

router.purge("/mainfood/", (req, res) => {
  MainFood.collection
    .drop()
    .then(res.json({ msg: "mainfood collection dropped" }))
    .catch(e => console.log(e));
});

module.exports = router;
