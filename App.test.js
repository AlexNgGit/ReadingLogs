const {MongoClient} = require("mongodb");

describe("get/add/delete data test", function () {
    ////
    let initArr = []
    const MONGO_URI = "mongodb+srv://Cluster20727:VGdcdHZMRkpo@cluster20727.trwcf2z.mongodb.net/bookDB?retryWrites=true&w=majority";
    const clientTest = new MongoClient(MONGO_URI);

    const addItem = {
        title: "N/A2",
        author: "N/A2",
        description: "N/A2",
        quantity: 10,
        imageLink: "http://books.google.com/books/content?id=tD5YDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        ISBN: "NA210Test"
    }

    const filterItem = [addItem]

    beforeAll(async function () {
        try {
            await clientTest.connect();
            initArr = await clientTest.db("bookDB").collection("books").
            find({},   {projection:{ _id: 0 }}).toArray()
        } catch (error) {
            console.error(error);
        }
    });

    test("get initial data", async function() {
        try {
            let response = await fetch("https://alexcpsc455.onrender.com/", {
                method: "GET"
            })
            let result = await response.json()
            expect(result).toEqual(initArr)
        } catch (error) {
            console.error(error)
            fail("should not reach here");
        }
    })

    test("add data", async function() {
        try {
            let testArr = await clientTest.db("bookDB").collection("books").
            find({},   {projection:{ _id: 0 }}).toArray()
            let initLength = testArr.length;

            let response =  await fetch("https://alexcpsc455.onrender.com/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addItem)
            })

            if (response.status === 200) {
                let result = await response.json();
                delete result._id;
                expect(result).toEqual(addItem);

                let dbRet = await clientTest.db("bookDB").collection("books").
                find({},   {projection:{ _id: 0 }}).toArray()
                testArr.push(addItem)

                expect(dbRet.length).toEqual(initLength + 1);
                expect(dbRet).toEqual(testArr)
            }
        } catch (error) {
            console.log(error.message)
            fail("should not reach here");
        }
    })

    /*test("filter data", async function() {
        initArr.pop()
        try {
            if (response.status === 200) {
                let result = await clientTest.db("bookDB").collection("books").
                find({ISBN: "NA210Test"},   {projection:{ _id: 0 }}).toArray();
                expect(result).toEqual(initArr)
            }
        } catch (error) {
            console.log(error.message)
            fail("should not reach here");

        }
    })*/

    test("delete data", async function() {
        initArr.pop()
        try {
            let ISBN = "NA210Test"
            let response = await fetch("https://alexcpsc455.onrender.com/delete/"+ISBN, {
                method: "DELETE",
            })
            if (response.status === 200) {
               let result = await clientTest.db("bookDB").collection("books").
               find({},   {projection:{ _id: 0 }}).toArray();
               expect(result).toEqual(initArr)
            }
        } catch (error) {
            console.log(error.message)
        }
    })

    afterAll(async function() {
        try {
            await clientTest.close();
        } catch (error) {
            console.error(error);
            fail("should not reach here");
        }
    })
})