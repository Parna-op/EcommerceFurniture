import user from "../Models/userModel.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import jwt, { decode } from 'jsonwebtoken'
export const signup = async (req, res) => {
  const {name,email, password } = req.body;
  if (!name ||  !email || !password) return res.status(403);
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  
  const person = await user.create({
    name: name,
    password: hashPassword,
    email: email,
    // token: accessToken,
  });
  const payload = {
    id :person.id||person._id,
    name: person.name,
    email: person.email,
    createAt : person. createAt
  };
  const accessToken = generateToken(payload, process.env.JWT_SECRET);
  const refreshToken = generateToken(payload, process.env.JWT_SECRET);
  person.token = refreshToken;
    await person.save();
  // const person = user.create({
  //   name: name,
  //   password: hashPassword,
  //   email: email,
  //   // token: refreshToken,
  // });

  // const save = person.save();

  // if (!save) return res.sendstatus(400);
  res
    .cookie("token", refreshToken, {
      maxAge: 7 * 60 * 60 * 60,
      httpOnly: true,
    })
    .json({
      status: 200,
      password: hashPassword,
      token: accessToken,
    });
};
export const login = async (req, res) => {
  // const refreshToken = res.cookie;
  // if (!refreshToken) return res.sendstatus(403)

  const { email, password } = req.body;
  console.log(`this is body ${ req.body } end`)
  console.log(req.body)
  if (!email)
    return res.status(401).json({
      message: "email is not there..",
    });

  if (!password)
    return res.status(401).json({
      message: "password is not there..",
    });
  const person = await user.findOne({ email });

  if (!person)
    return res.status(401).json({
      message: "person not found",
    });
  const valid = await bcrypt.compare(password, person.password);
  if (valid) {
    const payload = {
      id :person.id||person._id,
      name: person.name,
      email: person.email,
      createAt : person. createAt
    };
    const refreshToken = generateToken(payload);
    const accessToken = generateToken(payload);
    // const otherUser = await user.filter((u) => u.token === refreshToken);
    
    const tokens = person.token
    const otherTokens = tokens.filter((u) => u.token !== refreshToken);
    person.token.push(refreshToken)
    // person.token= refreshToken
    const isSave =   await person.save();
    console.log(person.token);
    // if (!isSave) return res.sendstatus(400);
    res.cookie("token", refreshToken, { httpOnly: true });
    res.status(200).json({
      message: "sucessful",
      token: accessToken,
    });
  } else { 
    res.status(401).json({
      message: "password is incorrect",
      password:password,
      valid
    });
  }
};
export const refresh = async (req, res) => {

    try {
  const refreshToken = req.cookies.refreshToken;

  console.log(req.cookies);
  if (!refreshToken) return res.status(401).json({message : "refresh token is not there"});
  // if (!currentUser) return res.status(401);
  jwt.verify(refreshToken, process.env.JWT_SECRET, async (error,decoded) => {
    if (error) return res.status(401);
    if (!decoded) return res.status(401).json({message: "no"})
      const person = await user.findOne({ name: decoded.name} );
    console.log(decoded)
      if (!person) return res.status(401).json({message: "no0"})
      // const currentUser = await user.filter((u) => u.token === refreshToken);
      const payload = {
        name: person.name,
        email: person.email,
      };
      if(person.token !== refreshToken){
        const accessToken = generateToken(payload);
        return  res.status(200).json({ message:"successfull!!", accessToken: accessToken });
      }
  }
); 
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message:"unsuccessful to create refresh token",
    })
    
  }

};
export const logout = async (req, res) => {
  // try {
const refreshToken = req.cookies?.token;
    if (!refreshToken) {
       res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });
     return res.status(403).json({message: "RefreshToken is not there",status :403});
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const person = await user.findById(decoded.id);
    if (!person) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });
      return res.status(204);
    }

  
    person.token = person.token.filter(
      (token) => token !== refreshToken
    );
    console.log(person.token);
    
    await person.save();

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({message : "successfully logout"});

// } catch (error) { 
//     res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax", secure: false });
//     return res.sendStatus(205); 
//   }
}
export const superuser = async(req,res) => {
    const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password)
    return res.sendstatus(401);
  // password hashing
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const payload = {
    firstname: firstname,
    email: email,
  };
  // create access token
  const accessToken = generateToken(payload, process.env.JWT_SECRET);
  // create refresh token

  const refreshToken = generateToken(payload, process.env.JWT_SECRET);

  //  save in db
  const person = user.create({
    firstname: "firstname",
    lastname: "lastname",
    password: hashPassword,
    email: email,
    token: refreshToken,
    role: "admin",
  });
  // const save = person.save();

  if (!save) return res.sendstatus(400);
  res
    .cookie("refreshToken", refreshToken, {
      maxAge: 7 * 60 * 60 * 60,
      httpOnly: true,
    })
    .json({
      status: 200,
      token: accessToken,
    });
}
export const checkuser = async (req, res) => {
  res.status(201).json({
    user: req.user
  });
};