const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config;
const express = require('express');
const router = express.Router();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));
// req.isAuthenticated is provided from the auth router
router.get('/checkLoginStatus', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

router.use('/', requiresAuth(), require('./swagger'));
router.use('/events', requiresAuth(), require('./events'));
router.use('/calendars', requiresAuth(), require('./calendars'));

module.exports = router;