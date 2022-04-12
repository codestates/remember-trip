const { diary } = require("../../models");
const { isAuthorized } = require("../tokenHandler");

module.exports = {
  get: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      //토큰이 없거나 검증된 토큰이 아닌경우
      return res.status(401).send("Invalid Token");
    }

    const { trip_id } = req.body;

    const diaries = await diary.findAll({
      where: { trip_id },
    });

    return res.status(200).send({ diaries });
  },

  post: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      //토큰이 없거나 검증된 토큰이 아닌경우
      return res.status(401).send("Invalid Token");
    }

    const { location, content, write_date, trip_id } = req.body;
    const diaryInfo = await diary.create({
      location,
      content,
      write_date,
      trip_id,
    });

    return res.status(200).send({
      diary_id: diaryInfo.id,
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
      await diary.destroy({
        where: { id: req.body.diary_id },
      });
      return res.status(200).send({ message: "diary Deleted" });
    } catch (err) {
      return res.status(401).send({ message: "Incorrect Info" });
    }
  },
};
