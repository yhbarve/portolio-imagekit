const jwt = require('jsonwebtoken');
const { createUserSchema, loginUserSchema } = require("../schemas/schema");


function addUserMiddleware(req, res, next){
    const addUserPayload = req.body;
    const parsedPayload = createUserSchema.safeParse(addUserPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "Incorrect data sent"
        });
        return;
    }
    next();
}

function loginUserMiddleware(req, res, next){
    const loginUserPayload = req.body;
    const parsedPayload = loginUserSchema.safeParse(loginUserPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "Incorrect data sent"
        });
        return;
    }
    next();
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Missing Authorization header' });

  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid auth format' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = {
    addUserMiddleware,
    loginUserMiddleware,
    authMiddleware
};