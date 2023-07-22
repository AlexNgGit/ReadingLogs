const { MongoClient } = require('mongodb');

class BookDB {

    constructor(URI) {
        const uri = URI
        this.client = new MongoClient(uri);
    }

    async connect() {
        try {
            await this.client.connect();
        } catch (error) {
            console.error(error)
        }
    }

    async disconnect() {
        try {
            await this.client.close();
        } catch (error) {
            console.error(error)
        }
    }

    async getItems() {
        try {
            let result = await this.client.db("bookDB").collection("books").
            find({},   {projection:{ _id: 0 }}).toArray()
            return result;
        } catch (error) {
            console.error(error)
        }
    }

    async addOneItem(item) {
        try {
            let result = await this.client.db("bookDB").collection("books").insertOne(item)
            if (!result.acknowledged) {
                throw new Error("Adding new object unsuccessfully")
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteItem(ISBN) {
        try {
            let result = await this.client.db("bookDB").collection("books").deleteOne({ISBN: ISBN})
            if (!result.acknowledged) {
                throw new Error("Delete object unsuccessfully")
            }
        } catch (error) {
            console.error(error)

        }
    }

    async filterItem(query) {
        try {
            let result = await this.client.db("bookDB").collection("books").
            find(query,   {projection:{ _id: 0 }}).toArray()
            return result;
        } catch(error) {
            console.error(error)
        }
    }
}

module.exports = BookDB
