/**
 * AdController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { json } = require("express");
const { file } = require("grunt");

module.exports = {
    postAds: async function (req, res) {

    if (req.method == "GET") return res.view('pages/ads/postAds');

    var ad = await Ad.create(req.allParams()).fetch();
        // console.log("req.session.userId: ", req.session.userId);
    res.setTimeout(0);
    req.file('img')
    .upload({

      // You can apply a file upload limit (in bytes)
            maxBytes: 1000000,
            dirname: '../../assets/images/uploads/',

    }, async function whenDone(err, uploadedFiles) {
    if (err) return res.serverError(err);  
    var oldUrl = uploadedFiles[0].fd; 
    var fileUploaded = await Files.create({
        fd: uploadedFiles[0].fd, 
        type: uploadedFiles[0].type, 
        filename: uploadedFiles[0].filename, 
        uploaded_by: req.session.userId,
        url: oldUrl.split("/Users/wingsze/Project2/assets").join(""),
    }).fetch();
    var updatedAd = await Ad.update(ad.id, {
        owner: req.session.userId,
        application_pic: fileUploaded.id,
    })
    });
    return res.redirect("/ads/adDetails/" + ad.id);
    },

    postAvailability: async function(req, res){
        if (req.method == "GET") return res.view('pages/ads/postAvailability');
        var ad = await Ad.create(req.allParams()).fetch();
        res.setTimeout(0);
        req.file('img')
        .upload({

      // You can apply a file upload limit (in bytes)
            maxBytes: 1000000,
            dirname: '../../assets/images/uploads/',

    }, async function whenDone(err, uploadedFiles) {
    if (err) return res.serverError(err);  
    var oldUrl = uploadedFiles[0].fd; 
    var fileUploaded = await Files.create({
        fd: uploadedFiles[0].fd, 
        type: uploadedFiles[0].type, 
        filename: uploadedFiles[0].filename, 
        uploaded_by: req.session.userId,
        url: oldUrl.split("/Users/wingsze/Project2/assets").join(""),
    }).fetch();
    var updatedAd = await Ad.update(ad.id, {
        owner: req.session.userId,
        application_pic: fileUploaded.id,
    })
    });
        return res.redirect("/ads/adDetails/" + ad.id);
    },
    
    details: async function (req, res) {
        function delay(milliseconds){
            return new Promise(resolve => {
                setTimeout(resolve, milliseconds);
            });
        }
        if (req.method == "GET") {
            await delay(300);
            var thatAd = await Ad.findOne(req.params.id);
            var thatFile = await Files.findOne({
                id : thatAd.application_pic,
            });
            if(!thatFile) { throw 'FileNotFound'; }

            if (!thatAd) return res.notFound();
            thatAd.updatedAt = new Date(thatAd.updatedAt); 
            return res.view("pages/ads/adDetails", { ad: thatAd, img: thatFile });
        }
    },
    
    show: async function(req,res){
        var thoseads = await Ad.find({
            where: {
                owner: req.session.userId,
            },
        });
        thoseads.forEach((item)  =>  item.updatedAt = new Date(item.updatedAt).toLocaleString());
        return res.view("pages/dashboard/allApplication", { ads: thoseads });
    },

    displayJob: async function(req,res){
        var thoseads = await Ad.find({
            where: {
                adType: 'Job',
            },
        });
        let picArr = [];
        thoseads.forEach((item) => picArr.push(item.application_pic));
        var thoseFile = await Files.find({
            where: picArr,
            sort: 'id',
        });
        return res.view("pages/dashboard/viewJob", { ads: thoseads, imgs: thoseFile});
    },

    displayCanadidate: async function(req,res){
        var thoseads = await Ad.find({
            where: {
                adType: 'Availability',
            },
        });
        let picArr = [];
        thoseads.forEach((item) => picArr.push(item.application_pic));
        var thoseFile = await Files.find({
            where: picArr,
            sort: 'id',
        });
        return res.view("pages/dashboard/viewCanadidate", { ads: thoseads, imgs: thoseFile});
    },

};

