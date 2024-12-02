const http = require("http");
const fs =require("fs");
const requests =require("requests");
//html file is acssing in node file
const homeFile =fs.readFileSync("home1.html","utf-8");

const replaceval = (tempVal,orgVal)=>{
    let temperature =tempVal.replace("{% tempval%}",orgVal.main.temp);
     temperature =temperature.replace("{% tempmin%}",orgVal.main.temp_min);
     temperature =temperature.replace("{% tempmax%}",orgVal.main.temp_max);
     temperature =temperature.replace("{%location%}",orgVal.name);
     temperature =temperature.replace("{%country%}", orgVal.sys.country);
     temperature =temperature.replace("{% tempStatus%}",orgVal.weather[0].main);

     return temperature;



};

const server =http.createServer((req,res)=>{
    if(req.url == "/") {
        //api is calling
    requests(
        "https://api.openweathermap.org/data/2.5/weather?q=pune&appid=b2c25154c27358349e8b43449d6adb07"

    )
    .on("data", (chunk)=>{
        // json data is converting to object
        const object =JSON.parse(chunk)
        // console.log(object);
        //object data is converting to array 
        const arrData =[object];
        //acssing the temp in main of API
        // console.log(arrData[0].main.temp);
        //using fo map method
        const realTimeData= arrData.map((valu)=>replaceval(homeFile, valu)).join("");//join("") is to convering to string
        res.write(realTimeData)
        
    })
    .on("end",(err) =>{
        if(err) return console.log("connection closed due to errors",err);
 
       res.end;
    });

}
});
server.listen(9000,"127.0.0.1",() =>{
    console.log("listening the port 9000");

});