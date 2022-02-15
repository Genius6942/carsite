const google = require('googlethis');
let data = require('./data.json');
const fs = require('fs');
console.log(data)
data = data.map(async (item, index) => {
	console.log(`${index}: ${item.make} ${item.model} ${item.year}`);
	const img = await google.image(`${item.make} ${item.model} ${item.year}`);
	item.image = img[0].url;
	return item;
});

fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));