
const express = require('express');
const app = express();
var cron = require('node-cron');

const cors = require('cors');
app.use(cors())

const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./keys.json');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1HmV7hv4BPrg0EjBWJQ10jjOg_o0tZBt7leaK6eaA14M');

var sports_boys={};
var sports_girls={};
var culty={};
var techy={};
var leaderboard={};
async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); 
  console.log(doc.title);

  const sheet1 = doc.sheetsByIndex[0]; 
  const sheet2 = doc.sheetsByIndex[1];
  const sheet3 = doc.sheetsByIndex[2];
  const sheet4= doc.sheetsByIndex[3];
  const sheet5= doc.sheetsByIndex[4];
  

await sheet1.loadCells('A1:I19');
for(let i=1;i<16;i++)
{
  var a=[];
  for(let j=1;j<9;j++)
  {
    a.push(sheet1.getCell(i, j).value);
  }
  sports_boys[i]=a;
}
console.log(sheet1.title);
console.log(sports_boys);

await sheet2.loadCells('A1:I19');
for(let i=1;i<16;i++)
{
  var a=[];
  for(let j=1;j<5;j++)
  {
    a.push(sheet2.getCell(i, j).value);
  }
  sports_girls[i]=a;
}
console.log(sheet2.title);
console.log(sports_girls);

await sheet3.loadCells('A1:M22');
for(let i=1;i<19;i++)
{
  var a=[];
  for(let j=1;j<13;j++)
  {
    a.push(sheet3.getCell(i, j).value);
  }
  culty[i]=a;
}
console.log(sheet3.title);
console.log(culty);

await sheet4.loadCells('A1:M15');
for(let i=1;i<12;i++)
{
  var a=[];
  for(let j=1;j<13;j++)
  {
    a.push(sheet4.getCell(i, j).value);
  }
  techy[i]=a;
}
console.log(sheet4.title);
console.log(techy);

await sheet5.loadCells('A1:M5');
for(let i=1;i<4;i++)
{
  var a=[];
  for(let j=1;j<13;j++)
  {
    a.push(sheet5.getCell(i, j).value);
  }
  leaderboard[i]=a;
}
console.log(sheet5.title);
console.log(leaderboard);


}

accessSpreadsheet();


app.get('/sports_boys' , (req,res)=>{
  // 200 status code means OK
  res.send(sports_boys); 
})
app.get('/sports_girls' , (req,res)=>{
  // 200 status code means OK
  res.send(sports_girls); 
})
app.get('/culty' , (req,res)=>{
  // 200 status code means OK
  res.send(culty); 
})
app.get('/techy' , (req,res)=>{
  // 200 status code means OK
  res.send(techy); 
})
app.get('/leaderboard' , (req,res)=>{
  // 200 status code means OK
  res.send(leaderboard); 
})

// Server setup
app.listen(4000 , ()=>{
   console.log("server running");
});

