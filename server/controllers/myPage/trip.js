const { trip } = require("../../models");
const { isAuthorized } = require("../tokenHandler");

module.exports = {
  get: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      //토큰이 없거나 검증된 토큰이 아닌경우
      return res.status(401).send("Invalid Token");
    }
    const trips = await trip.findAll({
      where: { user_id: userInfo.id },
    });

    return res.status(200).send({
      trips,
    });
  },

  post: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (!userInfo) {
      //토큰이 없거나 검증된 토큰이 아닌경우
      return res.status(401).send("Invalid Token");
    }

    const { country, start_date, end_date } = req.body;
    const createdTrip = await trip.create({
      user_id: userInfo.id,
      country,
      start_date,
      end_date,
    });

    return res.status(200).send({
      tripInfo: {
        id: createdTrip.id,
      },
      message: "Posted Successfully",
    });
  },

  delete: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (!userInfo) {
      return res.status(401).send("Invalid Token");
    }

    const { trip_id } = req.body;
    const tripInfo = await trip.findOne({
      where: { id: trip_id },
    });

    if (tripInfo) {
      await tripInfo.destroy({
        where: { id: trip_id },
      });
      return res.status(200).send({ message: "Trip Deleted" });
    } else {
      return res.status(401).send({ message: "Incorrect Info" });
    }
  },
};
