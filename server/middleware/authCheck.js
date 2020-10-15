import jsonwebtoken from 'jsonwebtoken';
import store from '../store/store.js';
import config from '../../config.js';


const checkAuth = (req, res, next) => {
  const unauthorized = () => res.status(401).end();

  if (!req.headers.authorization) {
    return unauthorized();
  }

  const token = req.headers.authorization.split(' ')[1];

  jsonwebtoken.verify(token, config.jwtSecret, async (err, decoded) => {
    if (err) {
      return unauthorized();
    }

    const { sub: userId } = decoded;

    try {
        const user = await store.getUserById(userId);

      if (!user) {
        return unauthorized();
      } else {
        req.user = user;
        return next();
      }
    } catch (e) {
      unauthorized();
    }
  });
};

export default checkAuth;