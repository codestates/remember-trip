const { trip, user } = require("../../models");
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
      const { id } = userInfo;
      const trips = await trip.findAll({
        where: { user_id: id },
      });
      return res.status(200).send({
        userInfo: { id },
        trips,
        message: "ok",
      });
    } catch (err) {
      const refreshToken = req.cookies.jwt;
      if (refreshToken) {
        let userInfo;
        let newAccessToken;
        try {
          userInfo = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
          newAccessToken = jwt.sign(userInfo, process.env.ACCESS_SECRET);
        } catch (err) {
          return res.status(401).send("Please Log In Again");
        }

        const { id } = userInfo;
        const trips = await trip.findAll({
          where: { user_id: id },
        });
        return res.status(200).send({
          accessToken: newAccessToken,
          userInfo: { id },
          trips,
          message: "ok, accessToken issued again",
        });
      }
      return null;
    }
  },

  patch: async (req, res) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      //토큰이 아예 안왔다면
      return res.status(401).send({ message: "No Token" });
    }

    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).send("Insufficient parameters supplied");
    }

    const token = authorization.split(" ")[1];
    try {
      const tokenInfo = jwt.verify(token, process.env.ACCESS_SECRET);
      const { user_id, password } = tokenInfo;
      const userInfo = await user.findOne({ where: { user_id, password } });

      if (!userInfo) {
        return res.status(401).send("User Not Found");
      } else {
        await userInfo.update({ password: newPassword });
        await userInfo.save();
        return res.status(200).send("Password Successfully Changed");
      }
    } catch (err) {
      return null;
    }
  },

  post: async (req, res) => {
    const authorization = req.headers[authorization];
    if (!authorization) {
      //토큰이 아예 안왔다면
      return res.status(401).send({ message: "No Token" });
    }

    const token = authorization.split(" ")[1];
    let id;
    try {
      const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);
      id = userInfo.id;
    } catch (err) {
      console.err(err);
      return res.status(401).send({ message: "Invalid Token" });
    }
    const { country, start_date, end_date } = req.body;
    await trip.create({
      user_id: id,
      country,
      start_date,
      end_date,
    });

    return res.status(200).send({
      tripInfo: {
        id: 0,
      },
      message: "Posted Successfully",
    });
  },
};
