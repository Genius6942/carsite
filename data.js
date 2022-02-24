const data = require('./data.json');
const fs = require('fs');

const newData = data.map(item => ({ name: `${ item.make } ${ item.model } ${ item.year }`, ...item }));
fs.writeFileSync('./data.json', JSON.stringify(newData, null, 2));