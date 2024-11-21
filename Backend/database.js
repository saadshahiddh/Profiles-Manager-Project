const mongoose = require("mongoose");
const { getEnvVariable } = require('./services/utilities');



/***********************************************************
* Models
*/
const Faq = require("./models/faq");
const CoverLetter = require("./models/cover-letter");
const Profile = require("./models/profile");



/***********************************************************
* Check database connection
*/
async function checkDatabaseConnection() {
    try {
        const databaseUri = getEnvVariable('DATABASE_URI');
        await mongoose.connect(databaseUri);
        console.log('Connection to database established successfully!');
    } catch (err) {
        console.log('Unable to connect to the database!');
        console.log(err);
    }
}

checkDatabaseConnection();



/***********************************************************
* Model exports
*/
module.exports = {
    Faq,
    CoverLetter,
    Profile,
}


