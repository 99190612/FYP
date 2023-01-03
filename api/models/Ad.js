/**
 * Ad.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    //for Availability Caretakers

    availableTimeslot: {
      type: 'json', 
      columnType: 'array',
    },

    requestedTimeslot: {
      type: 'json', 
      columnType: 'array',
    },

    scheduleOptions: {
      type: "string",
      isIn: ["one-off","regular"],
    },

    //for Jobs Ads
    adType: {
      type: "string",
    },

    title: {
      type: "string",
    },

    location: {
      type: "string",
    },

    jobType: {
      type: "string",
    },

    contact: {
      type: "number",
    },

    description: {
      type: "string",
    }, 

    salary: {
      type: "string",
    },

    contact: {
      type: "string",
    },

    remarks: {
      type: "string",
    },
    

    adStatus: {
      type: "string",
      isIn: ["wait for approval", "approved", "rejected"],
      defaultsTo: "wait for approval",
    },

    application_pic: {
      type: "number",
    },

    owner:{
      model: 'user',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    reg_user:{
      collection:'user',
      via: 'reg_ads'
    },

    
  },

};

