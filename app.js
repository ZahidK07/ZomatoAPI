let express = require ('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongoUrl = "mongodb://localhost:27017";
const mongoUrl = "mongodb+srv://test:test123@cluster0.cq0s5.mongodb.net/Zomato?retryWrites=true&w=majority";
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
const cors = require('cors')
let port = process.env.PORT || 5246;
var db;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())


//get request
app.get('/', (req,res)=>{
    res.send('Welcome to express')
})

/*API to get restaurant data by locactionList*/
app.get('/locationList',(req,res)=>{
    db.collection('locationList').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
/*API to get restaurant data by locactionList*/

/*API to get restaurant data by state_id*/
// line >>> 30 : data frm Url always comes in str so convert it into Number
app.get('/restaurant/:id', (req,res)=>{
    let restId = Number(req.params.id)
    console.log('>>>>restId',restId)
    db.collection('restoList').find({state_id:restId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
/*API to get restaurant data by state_id*/

/*API to get restaurant data by mealtype*/
app.get('/mealTypes',(req,res)=>{
    db.collection('mealType').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
/*API to get restaurant data by mealtype*/


/*API to get restaurant data by state_id & mealtype_id*/
app.get('/restoList', (req,res)=>{
    let stateId = Number(req.query.state_id);
    let mealId =  Number(req.query.meal_id);
    let query = {};
    if(stateId && mealId){
        query = {'mealTypes.mealtype_id':mealId,state_id:stateId}
    } 
    else if(stateId){
        query = {state_id:stateId}
    }
    else if(mealId){
        query = {"mealTypes.mealtype_id":mealId}
    }
    console.log('>>>>restId',stateId)
    db.collection('restoList').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
/*API to get restaurant data by state_id & mealtype_id*/


/*API to get restaurant data by Details*/
app.get('/details/:id',(req,res) =>{
    let restId = Number(req.params.id)
    db.collection('restoList').find({restaurant_id:restId}).toArray((err,result)=>{
    //let restId = mongo.ObjectId(req.params.id)
    //db.collection('restoList').find({_id:restId}).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})
/*API to get restaurant data by Details*/

/*API to get restaurant Menu data by restaurant_id*/
app.get('/menu/:id', (req,res)=>{
    let restId = Number(req.params.id)
    db.collection('Menu').find({restaurant_id:restId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
/*API to get restaurant Menu data by restaurant_id*/


/*API to Filter restaurant meals and cuisines
app.get('/filter/:mealId',(req,res)=>{
    let mealId = Number(req.params.mealId)
    let cuisineId = Number(req.query.cuisine)
    let query = {}
    if(cuisineId){
        query = {'cuisines.cuisine_id':cuisineId,'mealTypes.mealtype_id':mealId}
    }
    db.collection('restoList').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })   
})
/*API to Filter restaurant meals and cuisines*/

/*API to Filter restaurant By Low Cost & High Cost and Cuisine*/
// app.get('/filter/:mealId',(req,res)=>{
//     let mealId = Number(req.params.mealId)
//     let cuisineId = Number(req.query.cuisine)
//     let lcost = Number(req.query.lcost);
//     let hcost = Number(req.query.hcost);
//     let query = {}
//     if(cuisineId){
//         query = {'cuisines.cuisine_id':cuisineId,'mealTypes.mealtype_id':mealId}
//     }
//     else if (cuisineId){
//         query = {"cuisines.cuisine_id":cuisineId, "mealTypes.mealtype_id":mealId}
//     }
//     else if(lcost&hcost){
//         query = {$and:[{cost:{$gt:lcost,$lt:hcost}}], "mealTypes.mealtype_id":mealId}
//     }
//     db.collection('restoList').find(query).toArray((err,result)=>{
//         if(err) throw err;
//         res.send(result)
//     })   
// })
/*API to Filter restaurant By Low Cost & High Cost and Cuisine*/

/*API to Sort restaurant By Skip and Limit from Number to Number*/
app.get('/filter/:mealId',(req,res) => {
    let sort = {cost:1}
    let mealId = Number(req.params.mealId)
    let skip = 0;
    let limit = 100000000000000;
    let cuisineId =  Number(req.query.cuisine)
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let query = {}
    if(req.query.sort){
        sort = {cost:req.query.sort}
    }
    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip);
        limit = Number(req.query.limit);
    }
    if(cuisineId&lcost&hcost){
        query = {
            "cuisines.cuisine_id":cuisineId,
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    else if(cuisineId){
        query = {"cuisines.cuisine_id":cuisineId,"mealTypes.mealtype_id":mealId}
    }
    else if(lcost&hcost){
        query = {$and:[{cost:{$gt:lcost,$lt:hcost}}],"mealTypes.mealtype_id":mealId}
    }

    db.collection('restoList').find(query).sort(sort).skip(skip).limit(limit).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})
/*API to Sort restaurant By Skip and Limit from Number to Number*/

//Post Man API's below
//API to get Orders
app.get('/orders', (req,res)=>{
    let email = req.query.email
    let query = {};
    if(email){
        query  = {'email':email}
    }
    db.collection('orders').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//API to Place Orders
// app.post('/placeOrder', (req,res)=>{
//     console.log(req.body)
//     res.send('ok')
// })
//API to Place Orders

//API to Add Orders insertMany for 1 or more and insertOne for 1
// app.post('/placeOrder', (req,res)=>{
//     console.log(req.body)
//     // db.collection('orders').insertOne(req.body,(err,result)=>{
//     //     if(err) throw err;
//     //     res.send('Order Added')
//     // })
// })
//API to Add Orders insertMany for 1 or more and insertOne for 1
// API to Select and get Menu Data
app.post('/menuItem', (req,res)=>{
    console.log(req.body)
    db.collection('Menu').find({menu_id:{$in:req.body}}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
// API to Select and get Menu Data

//API to Delete Order, use deleteOne for 1 order
app.delete('/deleteOrder', (req,res)=>{
    db.collection('orders').deleteOne({},(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//API to Delete Order, use deleteOne for 1 order

//API to Delete Orders use deleteMany for more then 1 
app.delete('/deleteAllOrders', (req,res)=>{
    db.collection('orders').deleteMany({},(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//API to Delete Orders use deleteMany for more then 1

// API for Orders can be get updated with status Pending, Bank etc
app.put('/updateOrder/:id', (req,res)=>{
    let old = mongo.ObjectId(req.params.id)
    let status = req.query.status?req.query.status:'Pending'
    db.collection('orders').updateOne(
        {_id:old},
        {$set:{
            "status":status, 
            "bank_name": req.body.bank_name,
            "bank_status": req.body.bank_status
        }}, (err,result)=>{
            if(err) throw err;
            res.send(`Status Updated to ${status}`)
        }
    )
})
// API for Orders can be get updated with status Pending, Bank etc

//Post Man API's Above

// use connection.db to call for Mongo Local Data
//use client.db to call Mongo Cloud Data
MongoClient.connect(mongoUrl, (err, client)=>{
    if(err) console.log("Error While connecting");
    db = client.db('Zomato');
    app.listen(port,()=>{
        console.log(`Listenig to port no ${port}`)
    })
})
