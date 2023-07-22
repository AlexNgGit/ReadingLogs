let express = require('express');
let router = express.Router();

router.get('/', async function(req, res, next) {
    let result = await res.app.locals.localStorage.getItem()
    return res.status(200).send(result)
});


module.exports = router;
