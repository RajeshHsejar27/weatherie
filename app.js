const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const dotenv=require("dotenv");


dotenv.config();

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    
    const query=req.body.cityname;
 const url =process.env.APPID;

//insert ur app id from ur openweather account

  https.get(url, function (response) {
    

    response.on("data", function (data) {
      const wedata = JSON.parse(data);
      const wedata1 = JSON.stringify(wedata);
      const icon = wedata.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
const c=wedata.main.temp-273.15;

      res.write("<p><h1 align=center>the weather condition in "+query+" is : " +
          wedata.weather[0].description +
          "</h1>"
      );
      res.write(
        "<h1 align=center>the humidity condition in "+query+" is : " +
          wedata.main.humidity +
          "</h1>"
      );
 res.write(
        "<h1 align=center>the temperature condition in "+query+" is : " +
          c+
          " degrees Celsius</h1>"
      );
 res.write(
        "<h1 align=center>the pressure condition in "+query+" is : " +
          wedata.main.pressure +
          "</h1></p>"
      );
      res.write("<center><img width=500 height=500 src=" + imgUrl + "></center>");
      res.send();
    });
  });


})





app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
})
