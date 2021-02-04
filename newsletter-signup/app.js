const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const mailchimp = require('@mailchimp/mailchimp_marketing')

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res) => {
    const fName = req.body.fname
    const lName = req.body.lname
    const email = req.body.email
    let userData = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: lName
      }
    }],};
   mailchimp.setConfig({
     apiKey: "a81032550ff15aeacb0830571978efd7-us7",
     server: "us7",
   });
   const run = async () => {
      const response = await mailchimp.lists.batchListMembers('b925101d15', userData );
    //   console.log(response);
    };
    run();
   
    res.sendFile(__dirname + '/success.html')
  console.log(fName,lName,email)
  
  })

app.listen(3000, function(){
    console.log('Server running on port 3000')
})

