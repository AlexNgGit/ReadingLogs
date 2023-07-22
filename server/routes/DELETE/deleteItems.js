let express = require('express');
let router = express.Router();

router.delete('/:ISBN', async function(req, res, next) {
    let ISBN = req.params.ISBN;
    let localStorage = await req.app.locals.localStorage.deleteOneItem(ISBN)
    return res.status(200).json({success: true})
});

module.exports = router;