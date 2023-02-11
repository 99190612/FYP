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

};

