import express from 'express'
import { signup, signin } from './auth.js'

const router = new express.Router();

router.post('/signup', signup); // user sign up
router.post('/signin', signin); // user sign in

export default router;