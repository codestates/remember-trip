const { account } = require("../../models");
const { isAuthorized } = require("../tokenHandler");

module.exports = {
  get: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      //토큰이 없거나 검증된 토큰이 아닌경우
      return res.status(401).send("Invalid Token");
    }

    const { trip_id } = req.body;

    const accounts = await account.findAll({
      where: { trip_id },
    });

    return res.status(200).send({ accounts });
  },

  post: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      //토큰이 없거나 검증된 토큰이 아닌경우
      return res.status(401).send("Invalid Token");
    }

    const {
      category,
      item_name,
      price,
      paid_person,
      currency,
      write_date,
      trip_id,
    } = req.body;
    const accountInfo = await account.create({
      category,
      item_name,
      price,
      paid_person,
      currency,
      write_date,
      trip_id,
    });

    return res.status(200).send({
      account_id: accountInfo.id,
      message: "post succesfully created",
    });
  },

  delete: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      //토큰이 없거나 검증된 토큰이 아닌경우
      return res.status(401).send("Invalid Token");
    }

    try {
      await account.destroy({
        where: { id: req.body.account_id },
      });
      return res.status(200).send({ message: "Account Deleted" });
    } catch (err) {
      return res.status(401).send({ message: "Incorrect Info" });
    }
  },
};