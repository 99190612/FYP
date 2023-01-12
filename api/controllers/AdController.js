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
            var thatUser = await User.findOne(thatAd.owner);

            var ad = await Ad.findOne({
                id: thatAd.id,
            }).populate("reg_user");
        
            let idArr = [];
            ad.reg_user.forEach((item) => idArr.push(item.id));
            console.log("regUser Array return: -----> " + idArr)

            return res.view("pages/ads/adDetails", { ad: thatAd, img: thatFile, user: thatUser, regUser: idArr});
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
        thoseads.forEach((item)  =>  item.createdAt = new Date(item.createdAt).toLocaleDateString());
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
        thoseads.forEach((item)  =>  item.createdAt = new Date(item.createdAt).toLocaleDateString());
        return res.view("pages/dashboard/viewCanadidate", { ads: thoseads, imgs: thoseFile});
    },

    search: async function(req, res){
        if (req.wantsJSON) {

            var whereClause = {};

            if (req.query.title) whereClause.title = { contains: req.query.title };
            if (req.query.adType) whereClause.adType = req.query.adType;
            if (req.query.scheduleOptions) whereClause.scheduleOptions = req.query.scheduleOptions;
            if (req.query.jobType) whereClause.jobType = req.query.jobType;
            
            var perPage = Math.max(req.query.perPage, 3) || 3;

            var someAds = await Ad.find({
                where: whereClause,
                limit: perPage,
                skip: perPage * (Math.max(req.query.current - 1, 0) || 0),
            })
            let picArr = [];
            someAds.forEach((item) => picArr.push(item.application_pic));
            var thoseFile = await Files.find({
                where: picArr,
                sort: 'id',
            });

            var count = await Ad.count({
                where: whereClause
            });

            someAds.forEach((item)  =>  item.createdAt = new Date(item.createdAt).toLocaleDateString());
            return res.json({ ads: someAds, imgs: thoseFile, total: count });
        }
        return res.view('pages/dashboard/search');
    },

    searchResult: async function(req, res){
            var perPage = Math.max(req.query.perPage, 6) || 6;

            formData = [req.body.keywords, req.body.adType, req.body.scheduleOptions, req.body.jobType];
            console.log("passing search results --->>> " + formData);
            var whereClause = {};

            if (req.body.title) whereClause.title = { contains: req.body.title };
            if (req.body.adType) whereClause.adType = req.body.adType;
            if (req.body.scheduleOptions) whereClause.scheduleOptions = req.body.scheduleOptions;
            if (req.body.jobType) whereClause.jobType = req.body.jobType;

            var someAds = await Ad.find({
                where: whereClause,
            });

            let picArr = [];
            someAds.forEach((item) => picArr.push(item.application_pic));
            var thoseFile = await Files.find({
                where: picArr,
                sort: 'id',
            });

            var count = someAds.length;
            console.log("ad find --> " + count);
            someAds.forEach((item)  =>  item.createdAt = new Date(item.createdAt).toLocaleDateString());
            return res.view("pages/dashboard/searchResult", { ads: someAds, imgs: thoseFile, total: count });
        },
        

    question: async function(req, res){
        if (req.method == "GET") return res.view("pages/dashboard/question");
        return res.json(req.allParams());
    },

};

