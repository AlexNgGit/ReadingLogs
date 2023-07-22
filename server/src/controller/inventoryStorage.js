const XLSX = require("xlsx");
const fse = require("fs-extra");
const path = require("path")
const BookDB = require("./Database/index");
XLSX.set_fs(fse);

class localItem {

        constructor(URI) {
            this.dbInstance = new BookDB(URI);
            this.excelDir = path.resolve(__dirname, "../archiveExcel/Result.xlsx");
        }

        async addItem(item) {
            await this.dbInstance.addOneItem(item);
        }

        async deleteOneItem(ISBN) {
            await this.dbInstance.deleteItem(ISBN)
        }

        async getItem() {
            try {
                await this.dbInstance.connect();
                return await this.dbInstance.getItems()
            } catch (error) {
                console.error(error)
            }

        }

        async filterItem(query) {
            try {
                let result = await this.dbInstance.filterItem(query)
                return result;
            } catch (error) {
                console.error(error)
            }
        }


        async convertToExcel() {
        const newWS = XLSX.utils.json_to_sheet()
        const newWB = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWB, newWS, "Sheet1");
        const buffer = XLSX.write(newWB, {bookType: "xlsx", type: 'buffer'});
        try {
            await fse.outputFile(this.excelDir, buffer)
            console.log("write successfully");
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = localItem;