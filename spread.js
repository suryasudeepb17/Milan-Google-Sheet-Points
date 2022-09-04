const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./keys.json');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1HmV7hv4BPrg0EjBWJQ10jjOg_o0tZBt7leaK6eaA14M');

async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

  const sheet1 = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  const sheet2 = doc.sheetsByIndex[1];
  const sheet3 = doc.sheetsByIndex[2];
  const sheet4= doc.sheetsByIndex[3];
  console.log(sheet1.title);

  const rows = await sheet1.getRows(); // can pass in { limit, offset }

// read/write row values
console.log(rows.length);
await sheet1.loadCells('A1:E10');
let maj=[];
for(let i=0;i<3;i++)
{
    maj.push(sheet1.getCell(1, i).value)
}

console.log(maj);
}

accessSpreadsheet();


