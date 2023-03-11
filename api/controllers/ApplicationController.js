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

        thosenoti.sort((a,b) => b.updatedAt - a.updatedAt);
        thosenoti.forEach((item)  =>  item.updatedAt = new Date(item.updatedAt).toLocaleDateString());
    return res.view("pages/account/notification", {noti: thosenoti});
    },

    details: async function(req, res){
    if (req.method == "GET") {
        var thatAppl = await Application.findOne(req.query.id);
        return res.view("pages/application/applDetails", {appl: thatAppl})
    }
    if (req.method == "PUT") {
        if(req.body.action == "rearranging"){
            console.log("rearranging func entered")
            var updatedAppl = await Application.updateOne(req.query.id).set({
                applStatus: req.body.action,
                interviewTimeslot: req.body.interviewTimeslot,
            });
            if (!updatedAppl) return res.notFound();
        return res.ok()
        }else{
            var updatedAppl = await Application.updateOne(req.query.id).set({
                applStatus: req.body.action,
                interviewTimeslot: req.body.interviewTimeslot,
            });
            if (!updatedAppl) return res.notFound();
        return res.ok()
        }
        
    }
    var updatedAppl = await Application.updateOne(req.query.id).set({
        reject_msg: req.body.reject_msg,
    })
    if (!updatedAppl) return res.notFound();
    return res.ok()

    },

};

