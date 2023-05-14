const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html");
});

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const apiKey = '360dc5183c2bc23ea6dd6d067f7492e9-us21';
    const listId = 'b5fa6cfb88';
    const dataCenter = apiKey.split('-')[1];
    const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members`;

    const options = {
        method: 'POST',
        url,
        headers: {
            'Authorization': `apikey ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        })
    };

    request(options, function (error, response, body) {
        if (error) {
            throw new Error(error);
        }
    });

    res.sendFile(__dirname + "/success.html");
});


app.post("/failure", function(req,res){
    res.redirect("/");

});

app.listen(process.env.PORT || 3000, function(req,res){
    console.log("Server is up and Running!!");
}) 



// api key
// 360dc5183c2bc23ea6dd6d067f7492e9-us21

// audience id
// b5fa6cfb88