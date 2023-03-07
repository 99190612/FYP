/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    // action - add application (assoication and create application)
    add: async function (req, res) {
        if (!(await User.findOne(req.session.userId)))
            return res.status(404).json("User not found.");

        var thatAd = await Ad.findOne(req.params.fk).populate("reg_user", req.session.userId);
        
            if (!thatAd) return res.status(404).json("Advertisement not found.");
        
            //conflict case not done
        
            await User.addToCollection(req.session.userId, "reg_ads").members(
                req.params.fk
            );
            var owner = await User.findOne(thatAd.owner);
            var user = await User.findOne(req.session.userId);

            var thatApplication = await Application.create({
                interviewTimeslot: req.body.interviewTimeslot,
                reg_user: req.session.userId,
                reg_user_name: user.fullName,
                reg_ads: req.params.fk,
                reg_target: thatAd.owner,
                reg_target_name: owner.fullName,
                applStatus: 'waiting for reply'
            }).fetch();

            console.log("application created!! ---->>>>> " + thatApplication.id);
        
        return res.status(204).send();
    },

    profile: async function (req, res) {
            var thatUser = await User.findOne(req.params.id);
            if (!thatUser) return res.notFound();
        return res.view("pages/account/profile", { user: thatUser});
    },

    viewProfile: async function (req, res) {
        return res.view("pages/account/viewProfile");
    }
};
