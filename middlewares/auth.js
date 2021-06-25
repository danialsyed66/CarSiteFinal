const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/user");
async function auth(req, res, next) {
  // let token = req.header("x-auth-token");
  var token = req.cookies.auth;
  if (!token) return res.status(405).send("Token Not Provided");
  try {
    let user = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = await User.findById(user._id);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
}

// function auth(req, res, next) {
//   var token = req.cookies.auth;
//   if (token) {
//     jwt.varify(token),
//       config.get("jwtPrivateKey"),
//       function (err, token_data) {
//         if (err) {
//           return res.status(403);
//         } else {
//           req.user_data = token_data;
//           next();
//         }
//       };
//   } else {
//     return res.status(403).send("no Token");
//   }
// }

module.exports = auth;
