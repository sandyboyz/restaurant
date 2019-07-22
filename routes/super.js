const router = require("express").Router();
const { MainFood, backup_mainfood } = require("../models/mainfood");
const Users = require("../models/users");
const { Counter, createCounter } = require("../models/counter");
const Order = require("../models/order");
const checkIsAdmin = require("../utils/checkRole");
const passport = require("passport");

router.post(
  "/reset-worker",
  passport.authenticate("jwt", { session: false }),
  checkIsAdmin(),
  (req, res) => {
    Counter.collection
      .drop()
      .then(() => {
        Users.deleteMany({ role: "worker" })
          .then(() => {
            createCounter("Users");
            res.status(201).end("Reset Worker Successfully");
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/reset-food",
  passport.authenticate("jwt", { session: false }),
  checkIsAdmin(),
  (req, res) => {
    MainFood.collection
      .drop()
      .then(() => {
        backup_mainfood
          .find()
          .then(data => {
            MainFood.insertMany(data)
              .then(() => res.status(201).end("Reset Food Successfully"))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/reset-order",
  passport.authenticate("jwt", { session: false }),
  checkIsAdmin(),
  (req, res) => {
    Order.collection
      .drop()
      .then(() => res.status(201).end("Reset Order Successfully"))
      .catch(err => console.log(err));
  }
);

module.exports = router;
