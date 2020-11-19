//############ Sequence request using async await
var Nightmare = require('nightmare'),
  nightmare = Nightmare({show: true});

async function getStar(urls) {
	var count = 1;
  	for (var i = 0; i < urls.length; i++) {
  		var delay = Math.floor((Math.random() * 1000) + 500);
  		
  		// open 2nd URL, wait to process captcha
  		if(count==2){
  			delay += 5000;
  		}
  		if(urls[i].length < 10) {
  			console.log('invalid URL')
  			continue;
  		}
  		try {
			r = await nightmare.goto(urls[i])
			  .wait(delay)
			  .evaluate(()=>{
					var sao = document.querySelector('.score-average') ? document.querySelector('.score-average').innerText : "-";
					var dg = document.querySelector('div.count') ? document.querySelector('div.count').innerText : "-";
					return sao + ";" + dg;
			  })
			console.log(r);
			count++;
		} catch (err) {
			console.error(err);
		}
	}
	console.log("DONE");
	//await nightmare.end();
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

