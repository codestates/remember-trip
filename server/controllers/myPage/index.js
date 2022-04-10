const { user } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const result = await user.findAll();
      return res.status(200).send(result);
    } catch {
      return res.status(200).send("No User Found");
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
};
