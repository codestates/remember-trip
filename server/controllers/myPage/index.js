const { user } = require("../../models");
const { isAuthorized } = require("../tokenHandler");

module.exports = {
  patch: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      //토큰이 없거나 검증된 토큰이 아닌경우
      return res.status(401).send("Invalid Token");
    }

    const currUser = await user.findOne({
      where: { user_id: userInfo.user_id, password: userInfo.password },
    });

    await currUser.update({ password: req.body.newpassword });
    return res.status(200).send("Password Successfuly Changed");
  },
};
