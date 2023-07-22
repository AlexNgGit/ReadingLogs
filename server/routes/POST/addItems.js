let express = require('express')
let router = express.Router();

router.post('/', async function(req, res, next) {
    try {
        await req.app.locals.localStorage.addItem(req.body);
        return res.status(200).json(req.body)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

module.exports = router;