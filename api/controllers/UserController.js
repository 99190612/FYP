/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - add associations
    add: async function (req, res) {
        if (!(await User.findOne(req.session.userId)))
            return res.status(404).json("User not found.");
        
        console.log("return data[1]:" + req.params.fk);
        console.log("return data[2]:" + req.body.interviewTimeslot);

        var thatAd = await Ad.findOne(req.params.fk).populate("reg_user", req.session.userId);
        
            if (!thatAd) return res.status(404).json("Advertisement not found.");
        
            var ad = await Ad.findOne(req.params.fk).populate("reg_user");
            
            //conflict case not done
        
            await User.addToCollection(req.session.userId, "reg_ads").members(
                req.params.fk
            );
        
        return res.status(204).send();
    },
};