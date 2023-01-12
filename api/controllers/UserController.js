/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { application } = require("express");

module.exports = {
    // action - add application (assoication and create application)
    add: async function (req, res) {
        if (!(await User.findOne(req.session.userId)))
            return res.status(404).json("User not found.");
        
        console.log("return data[1]:" + req.params.fk);
        console.log("return data[2]:" + req.body.interviewTimeslot);

        var thatAd = await Ad.findOne(req.params.fk).populate("reg_user", req.session.userId);
        
            if (!thatAd) return res.status(404).json("Advertisement not found.");
        
            //conflict case not done
        
            await User.addToCollection(req.session.userId, "reg_ads").members(
                req.params.fk
            );

            var thatApplication = await Application.create({
                interviewTimeslot: req.body.interviewTimeslot,
                reg_user: req.session.userId,
                reg_ads: req.params.fk,
                reg_target: thatAd.owner,
                applStatus: 'waiting for reply'
            }).fetch();

            console.log("application created!! ---->>>>> " + thatApplication.id);
        
        return res.status(204).send();
    },
};