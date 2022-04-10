const { user } = require("../../models");
const jwt = require('jsonwebtoken')
require("dotenv").config();

module.exports = {
  signin: {
    // 로그인
    post: async (req, res) => {
      try{
        const { email, password } = req.body; //이메일과 패스워드를 바디에 실려서 클라이언트로 부터 받아옴
        if (!email || !password) {
        // 이메일과 패스워드중 하나라도 없다면 400 상태로 되돌려보냄
          return res.status(400).send("Must Provide All Fields");
        }

        const result = await user.findOne({ where: { email, password } }); //가입된 유저가 맞는지 확인 과정

        if (result) { //있다면 200 없다면 401
          //있다면 토큰을 같이 보내준다
          const accessToken = jwt.sign(result.toJSON(), process.env.ACCESS_SECRET, { expiresIn: "1h" });
          const refreshToken = jwt.sign(result.toJSON(), process.env.REFRESH_SECRET, {expiresIn: "1d"});
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
          })
          return res.status(200).send({data: {accessToken}, message: "Welcome"});
        } else {
          return res.status(401).send({"message" : "wrong email or password"});
        }
      } catch(err){ // 서버에러
        console.error(err);
        return res.status(500).send({"message" : "sorry can't process your request"})
      }
    },
  },
  signout: {
    // 로그아웃
    post: async (req, res) => {
      try{
        res.clearCookie("refreshToken"); // 쿠키 삭제
        return res.status(200).send({"message" : "Successfully logged out"})
      }catch(err){ //서버에러
        console.error(err);
        return res.status(500).send({"message" : "sorry can't process your request"})
      }
    },
  },
  signup: {
    // 회원가입
    post: async (req, res) => {
      try{
        const { name, email, password } = req.body; //

        if (!name || !email || !password) {
          return res.status(400).send("Must Provide All Fields"); //api 추가
        }
        const userInfo = await user.findOne({ where: { email } }); //해당 이메일로 회원정보 중복 조회

        if (userInfo) { //해당 이메일로 벌써 가입한적이 있다면
          return res.status(400).send({"data" : null, "message" : "email already exists"});
        }

        await user.create({
          name,
          email,
          password,
        });

        return res.status(201).send({"userInfo" : {name, email}, 
          "message" : "signup ok"
        });
      }catch(err){
        console.error(err);
        return res.status(500).send({"message" : "sorry can't process your request"})
      }
    },
  },


  withdrawal: {
    // 회원탈퇴
    delete: async (req, res) => {
      try{
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
          return res.status(400).send("Must Provide All Fields");
        }

        const userInfo = await user.findOne({ where: { name, email, password } });

        if (userInfo) {
          await userInfo.destroy({ where: { name, email, password } });
          return res.status(200).send({"message" : "Account Deleted"});
        } else {
          return res.status(401).send({"message" : "Incorrect Info"});
        }
      }catch(err){
        console.error(err);
        return res.status(500).send({"message" : "sorry can't process your request"})
      }
    },
  },
};
