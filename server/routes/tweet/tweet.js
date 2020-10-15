import store from "../../store/store.js"

export async function createTweet(req, res, next) {
    const { user, body: tweet } = req;
    try {
        await store.createTweet(user.userid, tweet);
        res.status(200).json({success: true});
    } catch(err) {
        res.status(500).json({success: false});
    }
}

export async function getTweets(req, res, next) {
    try {
        const result = await store.getTweets();
        res.status(200).json({ success:true, payload: result });
    } catch(err) {
        res.status(500).json({success: false});
    }
}

export async function getTweet(req, res, next) {
    const { id } = req.params
    try {
        const result = await store.getTweetByID(id);
        res.status(200).json({success: true})
    } catch(err) {
        res.status(500).json({success: false})
    }
}

export async function deleteTweet(req, res, next) {
    const { tweetid } = req.body;
    try {
        await store.deleteTweet(tweetid);
        res.status(200).json({success: true});
    } catch(err) {
        res.status(500).json({success: false});
    }
}

export async function updateTweet(req, res, next) {
    const { tweetid, tweetText } = req.body
    try {
        await store.updateTweet(tweetid, tweetText);
        res.status(200).json({success: true});
    } catch(err) {
        res.status(500).json({success: false})
    }
}