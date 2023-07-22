let express = require('express')
let router = express.Router();

router.post('/', async function(req, res, next) {
    let result = await res.app.locals.localStorage.filterItem(req.body)
    return res.status(200).send(result)
})

module.exports = router;