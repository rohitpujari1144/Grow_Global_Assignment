const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const dbUrl = 'mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(dbUrl)
const port = 5500

// getting All Users information
app.get('/', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Grow_Global_Task')
        let users = await db.collection('All_Users').find().toArray()
        if (users.length) {
            res.status(200).send(users)
        }
        else {
            res.status(404).send({ message: "No User Data Found" })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// user signup
app.post('/signup', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Grow_Global_Task')
        let user = await db.collection('All_Users').aggregate([{ $match: { email: req.body.email } }]).toArray()
        if (user.length) {
            res.send({ message: 'email id already exist' })
        }
        else {
            await db.collection('All_Users').insertOne(req.body)
            res.status(201).send({ message: 'signup successful', data: req.body })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// user login
app.get('/login/:email/:password', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Grow_Global_Task')
        let user = await db.collection('All_Users').aggregate([{ $match: { email: req.params.email, password: req.params.password } }]).toArray()
        if (user.length) {
            res.status(200).send({ message: 'login successful', data: user })
        }
        else {
            res.send({ message: "invalid credentials" })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// updating user password
app.put('/updateUser/:email/:securityCode', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Grow_Global_Task')
        let user = await db.collection('All_Users').findOne({ email: req.params.email, securityCode: req.params.securityCode })
        if (user) {
            let user = await db.collection('All_Users').updateOne({ email: req.params.email, securityCode: req.params.securityCode }, { $set: req.body })
            res.status(200).send({ message: 'password updated' })
        }
        else {
            res.send({ message: `invalid credentials` })
        }
    }
    catch (error) {
        res.status(400).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting All posts
app.get('/getAllPosts', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Grow_Global_Task')
        let posts = await db.collection('All_Posts').find().toArray()
        if (posts.length) {
            res.status(200).send(posts)
        }
        else {
            res.status(404).send({ message: "No posts created yet" })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting posts of a user
app.get('/getPost/:email', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Grow_Global_Task')
        let posts = await db.collection('All_Posts').aggregate([{ $match: { createdBy: req.params.email } }]).toArray()
        if (posts.length) {
            res.status(200).send({ message: "posts", data: posts })
        }
        else {
            res.send({ message: "No posts created yet" })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// creating new post
app.post('/newPost', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Grow_Global_Task')
        await db.collection('All_Posts').insertOne(req.body)
        res.status(201).send({ message: 'post created successfully', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// updating existing post
app.put('/updatePost/:id', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Grow_Global_Task')
        let user = await db.collection('All_Posts').updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body })
        res.status(200).send({ message: 'post updated' })
    }
    catch (error) {
        res.status(400).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// delete existing post
app.delete('/deletePost/:id', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Grow_Global_Task')
        await db.collection('All_Posts').deleteOne({ _id: mongodb.ObjectId(req.params.id) })
        res.status(200).send({ message: 'post deleted' })
    }
    catch (error) {
        res.status(400).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

app.listen(port, () => { console.log(`App listening on ${port}`) })