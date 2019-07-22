const router = require("express").Router();
const { MainFood, backup_mainfood } = require("../models/mainfood");
const Order = require("../models/order");
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

router.get("/order", (req, res) => {
  Order.find()
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.post("/order", (req, res) => {
  const order = new Order({
    name: req.body.name,
    order: req.body.order
  });

  MainFood.find()
    .then(data => {
      let array = [...data];
      let newOrder = [...order.order];
      let filter = newOrder.map(order => {
        let [newArray] = array.filter(val => {
          if (val._id.equals(order._id)) {
            return val;
          }
        });

        if (newArray !== undefined) {
          return {
            ...newArray._doc,
            quantity: order.quantity
          };
        }
      });

      filter = filter.filter(el => el !== undefined);

      order.order = filter;
      order.totalPrice = filter.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity;
      }, 0);
      if (order.order.length === 0)
        return res.status(400).end("Order minimum 1 item");
      if (order.name.length === 0)
        return res.status(400).end("Name cannot be empty");
      if (order.name.length < 3)
        return res.status(400).end("Name minimal 3 character");
      if (!/^[-_a-zA-Z]+(\s+[-_a-zA-Z]+)*$/.test(order.name))
        return res
          .status(400)
          .end("Name cannot be number or symbol and space in start/end");
      order
        .save()
        .then(data => res.json(data))
        .catch(err => res.status(400).end("Invalid Order"));
    })
    .catch(err => console.log(err));
});

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

router.get("/mainfood/:id", (req, res) => {
  const { id } = req.params;
  MainFood.findById(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
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
          .then(() => res.status(202).end("Deleted Food"))
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
      .catch(e => res.status(400).end("Invalid Add Food"));
  }
);

router.purge("/mainfood/", (req, res) => {
  MainFood.collection
    .drop()
    .then(res.json({ msg: "mainfood collection dropped" }))
    .catch(e => console.log(e));
});

module.exports = router;
