import JWT from "jsonwebtoken";

export const verifyJWT = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // const token = req.header("Authorization").split(" ")[1];
    let verifiedtoken = JWT.verify(token, process.env.HASH_SECRET_KEY);

    if (!verifiedtoken) {
      err = new Error("Not Authorized");
      err.status = 401;
      err.ok = false;
      throw err;
    }
    if (!req.currentuser) {
      req.currentuser = verifiedtoken;
    }

    console.log(req.currentuser);
    next();
  } catch (error) {
    next(error);
  }
};

export const createJWT = function (uid) {
  return JWT.sign({ uid }, process.env.HASH_SECRET_KEY, { expiresIn: "1h" });
};
