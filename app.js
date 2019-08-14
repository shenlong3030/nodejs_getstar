//############ Sequence request using async await
var Nightmare = require('nightmare'),
  nightmare = Nightmare({show: true});

async function getStar(urls) {
  	for (var i = 0; i < urls.length; i++) {
  		if(urls[i].length < 10) {
  			console.log('invalid URL')
  			continue;
  		}
		r = await nightmare.goto(urls[i])
		  .wait(Math.floor((Math.random() * 1000) + 500))
		  .evaluate(()=>{
				var sao = document.querySelector('.score-average') ? document.querySelector('.score-average').innerText : "-";
				var dg = document.querySelector('div.count') ? document.querySelector('div.count').innerText : "-";
				return sao + ";" + dg;
		  })
		console.log(r);
	}
	nightmare.end();
}

//############ Nodejs read input from stdin
var readline = require('readline');
var input = [];

// init
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// readline
rl.prompt('input URLs (separate by line) , press Ctrl+D to complete');
rl.on('line', function (cmd) {
    input.push(cmd);
});

// end input when press Ctrl+D
rl.on('close', function (cmd) {
	console.log('KET QUA');
    getStar(input);
});

