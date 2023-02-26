/**
 * ApplicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    notification: async function(req, res){
        var repliedNoti = await Application.find({reg_user: req.session.userId});
        var applyNoti = await Application.find({reg_target: req.session.userId});
        var thosenoti = repliedNoti.concat(applyNoti);


        // let checkArr = [];  #for checking
        // thosenoti.forEach((item) => checkArr.push(item.id));
        // console.log("Notification found: " + checkArr)
        thosenoti.forEach((item)  =>  item.createdAt = new Date(item.createdAt).toLocaleDateString());
    return res.view("pages/account/notification", {noti: thosenoti});
    },

    details: async function(req, res){
    if (req.method == "GET") {
        var thatAppl = await Application.findOne(req.query.id);
        return res.view("pages/application/applDetails", {appl: thatAppl})
    }
    if (req.method == "PUT") {
        var updatedAppl = await Application.updateOne(req.query.id).set({
            applStatus: req.body.action,
            interviewTimeslot: req.body.interviewTimeslot,
            notiStatus: "read",
        });
        if (!updatedAppl) return res.notFound();
    return res.ok()
    }



    },

};

