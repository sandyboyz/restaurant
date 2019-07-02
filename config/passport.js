const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt =  require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("Users");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "navi";

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        done(null, jwt_payload);
    }));
};