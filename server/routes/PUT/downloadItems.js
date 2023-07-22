let express = require('express')
const path = require("path");
let router = express.Router();

router.put('/', async function (req, res, next) {
    try {
        await req.app.locals.localStorage.downloadExcelFile();
        console.log(__dirname)
        res.status(200).sendFile(path.resolve((__dirname + "/../../src/archiveExcel/Result.xlsx")));
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error: error.message})
    }
});

module.exports = router;
