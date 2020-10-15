import express from 'express'
import { getTweets, createTweet, getTweet, updateTweet, deleteTweet } from './tweet.js';

const router = new express.Router();

router.post('/tweet', createTweet) //createTweet
router.get('/tweet', getTweets) // get Tweets
router.get('/tweet/:id', getTweet) //get single tweet
router.put('/tweet', updateTweet) // update existing tweet
router.delete('/tweet', deleteTweet);

export default router;