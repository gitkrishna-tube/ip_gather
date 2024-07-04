const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const requestIp = require('request-ip');
const {RequestData} = require('./model.js');
const app = express();
const connectDb = require('./db');
// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// Use request-ip middleware to get the client's IP address
app.use(requestIp.mw());

// Serve the static HTML file
app.get('/', (req, res) => {
    console.log('serer started')
    // res.json({msg:"hello"})
    res.sendFile(path.join(__dirname, 'public', 'xyz.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const ip = req.clientIp;
 
    const jsonString = JSON.stringify(req, circularReferenceReplacer());
   
    console.log(`Visitor's IP Address: ${ip}`);
    // console.log(`Visitor's Name: ${name}`);
    let obj={}
    obj.email=email;
    obj.ip=ip;
    obj.reqObj=jsonString;
    // console.log(obj)

    const requestDataInstance = new RequestData({
        email:obj.email,
        ip: obj.ip,
        reqObj: obj.reqObj
    });
    
    requestDataInstance.save()
        .then(savedRequest => {
            console.log('data saved');
            res.status(200).send(`Thank you,`);
        })
        .catch(error => {
            res.status(500).send(`Thank you,`);
        });



});


// app.get('/data/query', async (req, res) => {
//     const query=req.query
//     console.log(query)
//     const email=query.email
//     const ip=query.ip
//     console.log('/data')
//     let resp;
//     if(email && ip){
//         console.log()
//         const resp= await RequestData.find({ip:ip,email:email},["ip","email"])
//     }
//     else if(ip){
//         const resp= await RequestData.find({ip:ip},["ip","email"])
//     }
//     else if(email){
//         const resp= await RequestData.find({email:email},["ip","email"])
//     }
//     else{
//         resp={msg:"please provide email or ip"}
//     }



//   console.log(resp)
//   res.json(resp)
// });
app.get('/data', async (req, res) => {
    console.log('/data')
  const resp= await RequestData.find({},["ip","email"])
  console.log(resp)
  res.json(resp)
});
app.get('/data/all/ip', async (req, res) => {
    console.log('/data')
  const resp= await RequestData.find({},["ip"])
  console.log(resp)
  res.json(resp)
});
app.get('/data/all/email', async (req, res) => {
    console.log('/data')
  const resp= await RequestData.find({},["email"])
  console.log(resp)
  res.json(resp)
});

app.get('/data/all', async (req, res) => {
    console.log('/data')
  const resp= await RequestData.find({})
  console.log(resp)
  res.json(resp)
});


app.post('/submit2', (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const ip = req.clientIp;
 
    const jsonString = JSON.stringify(req, circularReferenceReplacer());
   
    console.log(`Visitor's IP Address: ${ip}`);
    // console.log(`Visitor's Name: ${name}`);
    let obj={}
    obj.email=email;
    obj.ip=ip;
    obj.reqObj=jsonString;
    // console.log(obj)

   
    
    res.status(200).send(`Thank you,`);



});
const port = 6111;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


function circularReferenceReplacer(){
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '[Circular]';
            }
            seen.add(value);
        }
        return value;
    };
};
connectDb();
