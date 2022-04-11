const { trip } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  get: async (req, res) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      //토큰이 아예 안왔다면
      return res.status(401).send({ message: "No Token" });
    }
    const token = authorization.split(" ")[1];
    try {
      const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);
      const { id, name, email } = userInfo;
      const trips = await trip.findAll({
        where: { user_id: id },
      });
      return res.status(200).send({
        userInfo: { id, name, email },
        trips,
        message: "ok",
      });
    } catch (err) {
      //토큰 만료
      return null;
    }
  },

  patch: async (req, res) => {
    const { name, email, password, newPassword } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("Must Provide All Fields");
    }

    const userInfo = await user.findOne({ where: { name, email, password } });

    if (!userInfo) {
      return res.status(401).send("User Not Found");
    } else {
      await userInfo.update({ password, newPassword });
      await userInfo.save();
      return res.status(200).send("Password Successfully Changed");
    }
  },

  post: async (req, res) => {
    return res.status(200).send("Here");
  },
};
