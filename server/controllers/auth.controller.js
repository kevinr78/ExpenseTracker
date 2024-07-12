import conn from "../utils/DB.js";
import bcrypt from "bcryptjs";
import { createJWT } from "../utils/JWT.js";

const loginUser = async function (req, res, next) {
  let query;
  let { email, password: reqPass } = req.body;

  try {
    if (!email || !reqPass) {
      throw new Error("Invalid Data");
    }
    query = "select * from users where email=?";
    let [result, fields] = await conn.query(query, [email]);
    if (result.length == 0) {
      throw new Error("User with given email does not exist");
    }
    let { uid, user_name, email: userEmail, password: hashedPass } = result[0];
    const isPassword = await bcrypt.compare(reqPass, hashedPass);

    if (!isPassword) {
      throw new Error("Incorrect Password");
    }

    const token = createJWT(uid);

    res.status(200).json({
      token: token,
      ok: true,
      message: "User created successfully",
      user: result[0],
    });
  } catch (err) {
    next(err);
  }
};

const signInUser = async function (req, res, next) {
  const { name, email, password } = req.body;
  let query;

  try {
    if (!name || !email || !password) {
      throw new Error("Invalid Data");
    }

    query =
      "select uid,user_name ,count(1) as emailExist from users where exists (select email from users where email=?) group by user_name,uid";

    let [results, feilds] = await conn.query(query, [email]);

    if (results.length > 0 && results[0].emailExist > 0) {
      throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    debugger;
    query = "INSERT INTO USERS(user_name,email,password) VALUES (?,?,?)";
    [results, feilds] = await conn.query(query, [name, email, hashedPass]);

    console.log(results);
    const token = createJWT(uid);

    res.status(200).json({
      token: token,
      ok: true,
      message: "User created successfully",
      user: results[0],
    });
  } catch (err) {
    next(err);
  }
};

export { loginUser, signInUser };
