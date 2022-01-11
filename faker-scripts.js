const faker =require('faker');
const Users = require('./models/users');
const profile = require('./models/profile');
class user {
    constructor (userNames, emails, names, company, address){

    this.userNames = faker.internet.userName();
    this.emails = faker.internet.email();
    this.names = faker.name.findName();
    this.company = faker.company.companyName();
    this.address = faker.address.stateAbbr();
}}

let i = 0
do{
    const classUser =new user({})
    const users = new Users({
        username:classUser.userNames,
        email:classUser.emails,
    });
    const profiles = new profile({
        name:classUser.names,
        company:classUser.company,
        address:classUser.address,
    })

    users.profile.push(profiles)

    users.save();
    profiles.save();
    i+=1
} while(i<100)
