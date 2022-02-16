const google = require('googlethis');
let data = require('./data.json');
const fs = require('fs');
start = Date.now();
async function loadImage(name) {
  return new Promise(async (resolve, reject) => {
    resolve('/favicon.ico');
    return;
    try {
      const img = await google.image(name);
      console.log('loaded image: ' + name);
      resolve(img[0] ? img[0].url : '/favicon.ico');
    } catch {
      console.log(name + ' failed and falling back with favicon');
      resolve('/favicon.ico');
    }
  });
}
(async () => {
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    const img = await loadImage(`${item.make} ${item.model} ${item.year}`);
    data[i].image = img;
    console.log(i);
  }
  
  console.log(`Event took ${Date.now() - start} ms`);

  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
})();
/*
Promise.all(data.map(item => loadImage(`${item.make} ${item.model} ${item.year}`))).then(e=>{
  console.log(e);
  console.log(`Event took ${Date.now() - start} ms`)
});*//*
Promise.all(data.map(async (item, index) => {
	const img = await google.image(`${item.make} ${item.model} ${item.year}`);
	item.image = img[0].url;
	console.log(`${index}: ${item.make} ${item.model} ${item.year}`);
	return item;
})).then(stuff => {
  console.log('done')
  fs.writeFileSync('./data.json', JSON.stringify(stuff, null, 2));
});*/