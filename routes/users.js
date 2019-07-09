const router = require("express").Router();
const Users = require("../models/users");
const Counter = require("../models/counter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const checkIsAdmin = require("../utils/checkRole");

// Utills
const pad = require("../utils/pad");

router.get("/", (req, res) => {
  res.status(403).end("Unauthorized");
});

router.get("/check-counter", (req, res) => {
  Counter.find()
    .then(data => res.status(200).json(data))
    .catch(e => console.log(e));
});

router.post("/register-admin", (req, res) => {
  Users.findOne({ role: "admin" })
    .then(data => {
      if (!data) {
        const user = new Users({
          role: "admin"
        });
        bcrypt.hash("admin", 10, (err, hash) => {
          user.password = hash;
          user
            .save()
            .then(data => res.json(data))
            .catch(e => console.log(e));
        });
      } else {
        res.status(401).json({ msg: "Cannot Create Another Admin" });
      }
    })
    .catch(e => console.log(e));
});

router.post("/login-admin", (req, res) => {
  Users.findOne({ role: "admin" })
    .then(data => {
      if (!data) return res.status(404).json({ msg: "Admin not created yet" });
      bcrypt.compare(req.body.password, data.password).then(isMatch => {
        if (!isMatch) return res.status(401).json({ msg: "Password Wrong" });
        const payload = {
          role: data.role
        };
        jwt.sign(payload, "navi", { expiresIn: "30m" }, (err, token) => {
          res.status(200).json({
            success: true,
            token: "Bearer " + token
          });
        });
      });
    })
    .catch(e => res.status(401).json({ msg: "Something Wrong" }));
});

router.post("/login-worker", (req, res) => {
  const { workerID, password } = req.body;
  Users.findOne({ workerID })
    .then(data => {
      if (!data)
        return res.status(404).json({ msg: "WorkerID or Password Invalid" });
      bcrypt.compare(password, data.password).then(isMatch => {
        if (!isMatch)
          return res.status(401).json({ msg: "WorkerID or Password Invalid" });
        const payload = {
          id: data.workerID,
          name: data.workerName,
          role: data.role
        };
        jwt.sign(payload, "navi", { expiresIn: "30m" }, (err, token) => {
          res.status(200).json({
            success: true,
            token: "Bearer " + token
          });
        });
      });
    })
    .catch(e => res.status(401).json({ msg: "Something Wrong" }));
});

router.post(
  "/checkToken",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      auth: true
    });
  }
);

// Need Role-Based Authorization
// Admin
router.get(
  "/post-food",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
router.get(
  "/get-worker",
  passport.authenticate("jwt", { session: false }),
  checkIsAdmin(),
  (req, res) => {
    Users.find({ role: "worker" })
      .select("-password")
      .then(data => res.status(200).json(data))
      .catch(e => console.log(e));
  }
);

router.put(
  "/update-worker/:id",
  passport.authenticate("jwt", { session: false }),
  checkIsAdmin(),
  (req, res) => {
    const id = req.params.id;
    Users.findById(id)
      .then(data => {
        data.workerName = req.body.workerName;
        data
          .save()
          .then(data => res.json(data))
          .catch(err => console.log(err));
      })
      .catch(e => console.log(e));
  }
);

router.delete(
  "/delete-worker/:id",
  passport.authenticate("jwt", { session: false }),
  checkIsAdmin(),
  (req, res) => {
    const id = req.params.id;
    Users.findById(id)
      .then(data => {
        data.remove()
          .then(() => res.json({success: true}))
          .catch(err => console.log(err));
      })
      .catch(e => console.log(e));
  }
);

router.post(
  "/register-worker",
  passport.authenticate("jwt", { session: false }),
  checkIsAdmin(),
  (req, res) => {
    const worker = new Users({
      role: "worker",
      workerName: req.body.workerName
    });
    const prefix = "WORKER_";
    Counter.findOne({ id: "Users" })
      .then(counter => {
        worker.workerID = prefix + pad(counter.seq, 4);
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          if (!err) {
            worker.password = hash;
            worker
              .save()
              .then(data => {
                counter.seq += 1;
                counter.save().catch(e => console.log(e));
                res.status(200).json(data);
              })
              .catch(e => console.log(e));
          }
        });
      })
      .catch(e => console.log(e));
  }
);
module.exports = router;
