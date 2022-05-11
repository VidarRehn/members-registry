
// settings for project

import express from "express"
import { MongoClient, ObjectId } from "mongodb";

const port = 3000
const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true}))
app.use(express.static('./static'))

const client = new MongoClient('mongodb://localhost:27017')
await client.connect();
const db = client.db('register');
const membersList = db.collection('members');

// render home page

app.get('/home', (req, res) => {
    res.render('home')
})

// render members-list page

app.get('/members', async (req, res) => {
    const members = await membersList.find({}).toArray()
    res.render('members', { members })
})

// render add-new-member page

app.get('/register', (req, res) => {
    // const today = new Date().toISOString()
    res.render('register')
})

// render page for one specific member

app.get('/member/:id', async (req, res) => {
    const member = await membersList.findOne({ 
        _id: ObjectId(req.params.id) 
    })
    res.render('member', {
        _id: ObjectId(req.params.id),
        name: member.name,
        email: member.email,
        phone: member.phone,
        memberSince: member.memberSince,
        favoriteMoment: member.favoriteMoment
    })
})

// post request for adding a member

app.post('/register', async (req, res) => {
    await membersList.insertOne({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        memberSince: new Date(),
        favoriteMoment: req.body.favoriteMoment
    })
    res.redirect('/members')
})

// remove member on button click

app.post('/delete/:id', async (req, res) => {
    await membersList.deleteOne({ 
        _id: ObjectId(req.params.id) 
    })
    res.redirect('/members')
})

// edit member information

app.post('/update/:id', async (req, res) => {
    await membersList.updateOne({
        _id: ObjectId(req.params.id)
    },{ $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        favoriteMoment: req.body.favoriteMoment
        }
    })
    res.redirect(`/member/${ObjectId(req.params.id)}`)
})

// sort members

app.get('/members/ascending', async (req, res) => {
    const members = await membersList.find({}).sort({name: 1}).toArray()
    res.render('members', { members })
})

app.get('/members/descending', async (req, res) => {
    const members = await membersList.find({}).sort({name: -1}).toArray()
    res.render('members', { members })
})


app.listen(port, () => console.log(`Listening to port ${port}`))