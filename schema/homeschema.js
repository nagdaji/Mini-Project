const mongoose = require('mongoose');
const { Schema } = mongoose;

const homeschema = new Schema({
    eventname : String,
    conferenceimages : [String],
    conferencedescription : String,
    date : [],
    description : [String],
    aim : String,
    topic : String,
    guidelines : String,
    papersubmission : String,
    contact : String,
    workshopaim : String,
    workshopproposal : String,
    venue : String,
    venueimages : [String],
    venuedescription : String,
    speakername : [String],
    speakerimages : [String],
    speakeroccupation : [String],
    committeename : [String],
    numberofmembers : [Number],
    membername : [String],
    memberimages : [String],
    facebooklink : [String],
    twitterlink : [String],
    instagramlink : [String],

    tracksname : [String],
    nooftracks : [Number],
    tracksmembername :[String],
    tracksmemberimages : [String],
    tracksfacebooklink : [String],
    trackstwitterlink : [String],
    trackslinkedinlink : [String],

    trackname : [String],
    nooftrack : [Number],
    trackmembername :[String],

    advcommname : [String],
    noofadvmembers : [Number],
    advmembername :[String],
    advmemberimages : [String],
    advfacebooklink : [String],
    advtwitterlink : [String],
    advlinkedinlink : [String],

    techcommname : [String],
    nooftechmembers : [Number],
    techmembername :[String],
    techmemberimages : [String],
    techfacebooklink : [String],
    techtwitterlink : [String],
    techlinkedinlink : [String],

    sponsorname : [String],
    sponsorimage : [String],
    headquartername : [String],
    headquarterlink : [String],
    mobilenumber : [String],
    email : [String],
    facebookconnect : String,
    instagramconnect : String,
    linkedinconnect : String,
    twitterconnect : String,
});

module.exports = mongoose.model('homedata', homeschema);