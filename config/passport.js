const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const { User } = require('../models/User');
  const keys = require('./keys');


module.exports = function (passport) {

    passport.use(new googleStrategy({

        clientID:  keys.googleClientID,
        clientSecret:   keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true

    }, (accessToken, refreshToken, profile, done) => {

        // console.log(accessToken);
        //   console.log(profile);
        const image = profile.photos[0].value.slice(0, profile.photos[0].value.indexOf('?'));
        const newUser = {

            googleID: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: image
        }

        // Check if user already exist in the database
        User.findOne(
            {
                googleID: newUser.googleID
            }).then((user) => {

                if (user) {
                    //  return user
                    return done(null, user);
                } else {
                    //  create user
                    new User(newUser)
                        .save()
                        .then((user) => {

                            return done(null, user);
                        });
                }

            });

    }));

    passport.serializeUser((user, done) => {

        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {

        User.findById(id).then((user) => {

            return done(null, user);
        });
    });

}