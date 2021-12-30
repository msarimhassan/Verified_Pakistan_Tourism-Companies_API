const PORT=process.env.PORT || 8000;
const axios=require("axios");
const cheerio=require("cheerio");
const cors=require("cors");
const { contains } = require("cheerio/lib/static");
const express = require("express");
const app=express();

app.use(cors()); 

app.get("/",(req,res)=>{
    res.send("please use /verifiedcompanies to use the api");
})


app.get("/verifiedcompanies",async(req,res)=>{
  const companiesname=[];
const DTSnumber=[];
const email=[];
const verifiedcomp=[]
  await  axios.get("https://visa.nadra.gov.pk/list-of-tour-operators/").then((res)=>{ 
     const html=res.data;
   const $=cheerio.load(html);

   //get all companies name
$('td[data-x="1"]',html).each(function(){companiesname.push($(this).text());})
;

//get all dts numbers
$('td[data-x="2"]',html).each(function(){ DTSnumber.push($(this).text());})

//get all companies email
// $('td[data-x="9"]',html).each(function(){ email.push($(this).text());})
   

}).catch(error=>{console.log(error)})

 for(let i=0;i<DTSnumber.length;i++)
 {
      verifiedcomp.push({
          No:i+1,
          CompanyName:companiesname[i],
          DtsNumber:DTSnumber[i]
      })
 }
   res.send(verifiedcomp)
})

app.listen(PORT,()=>{console.log(`SERVER IS STARTED ON ${PORT}`)});
