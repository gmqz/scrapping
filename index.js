var express = require('express'),
    app     = express(),
    http    = require('http').Server(app),
    io      = require('socket.io')(http),
    path    = require('path'),
    fs      = require('fs'),
    request = require('request'),
    cheerio = require('cheerio');

var port = 65080;
app.use(express.static('public'));

require('./app/controller/scrapping.js')(io,app,request,cheerio);

app.get('/', function(req, res) {
	//res.send('hello world');
	res.sendFile(path.join(__dirname,'public','index.html'));
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

http.listen(port, function(){
    console.log('Magic happens on port*:' + port);
});

// app.get('/scrape', function(req, res){
//    //All the web scraping magic will happen here
// 	sites = [
//                 {
//                     url: 'https://www.icefrance.fr/en',
//                     getData : function($){
//                 		let res=[];
//                 		$('#simply-scroll-products_ice-block_home ul').children().map(function(ele){
//                                 res.push($(this).text());
//                         })
//                 		return res;
//                 	}
//
//                 },{
//                     url: 'http://www.bancopiano.com.ar/Cotizaciones/Default',
//                 	getData: function($){
//                         let res=[];
//                 		$tr = $('.tabla-cotizaciones').find('img[title="USD"]').parent().parent();
//                         res.push($tr.children().eq(1).text());
//                         $tr = $('.tabla-cotizaciones').find('img[title="EUR"]').parent().parent();
//                         res.push($tr.children().eq(1).text());
//                 		return res;
//                     }
//                 },{
//                     url: 'http://www.fvaccaro.comm/',
//                 	getData: function($){return [];}
//                 }
//             ],
//     round = [];
//
//     sites.forEach(function(site){
//         let ini = new Date();
//         var json = {
//             site: "",
//             status: "",
//             date: "",
//             info: [],
//             queryTime: ""
//         };
//         json.date = new Date();
//         json.site = site.url;
//         request(site.url, (error, response, html)=>{
//             if(!error) {
//                 var $ = cheerio.load(html);
//                 json.status = 'success';
//                 json.info = site.getData($);
//             }else{
//                 json.status = 'error';
//                 console.log('Request Error')
//             }
//             let fin = new Date();
//             json.queryTime = fin - ini;
//             round.push(json);
//             console.log(round);
//         });
//     })
//     //console.log(round);
//     res.send('Check your console!');
// })

// app.listen('8081')
// console.log('Magic happens on port 8081');
// exports = module.exports = app;
