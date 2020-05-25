const express=require("express");
const request=require('request');
const app=express();
const bodyParser=require("body-parser");
const https=require('https');
app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response)
{
	response.sendFile(__dirname + "/signup.html");
});


app.get("/",function(req,res)
{
	res.sendFile(__dirname+"/signup.html");
	
});

app.post("/",function(req,res)
{
	const firstName=req.body.firstName;
	const lastName=req.body.lastName;
	const email=req.body.email;
    const data=
	{
		members:
		[
		{
		email_address:email,
		status:"subscribed",
		merge_fields:
		{
			FNAME:firstName,
			LNAME:lastName,
		}
		}
		
		]
	}
	const jsondata=JSON.stringify(data);
	const url='https://us18.api.mailchimp.com/3.0/lists/52d7b266d6';
	const options=
	{
		method:"POST",
		auth:"muskan:04a1cfced1518dc5c86479f4178188f4-us18",
	}
	
	const request=https.request(url,options,function(response)
	{
		if(response.statusCode===200)
			res.sendFile(__dirname+"/success.html");
		else
			res.sendfile(__dirname + "/failure.html");
		
	});
	request.write(jsondata);
	request.end();
});
app.post("/fail",function(req,res)
{
	res.redirect("/");
})
	
app.listen(3000,function()
{
	console.log("connected");
})
