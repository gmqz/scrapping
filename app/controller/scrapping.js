var	_io;

// client.stream('statuses/filter', {track: 'macri', location: 'Argentina',
// attitude: true}, function(stream) {
// 	_stream = stream;
// 	stream.on('data', function(tweet) {
// 		var createdAt = new Date(tweet.created_at);
// 		var source = '';
// 		if (tweet.source) {
//             source = tweet.source.split('>');
// 			source = source[1].split('<');
// 			//console.log(colors.bold(source[0]));
// 			source = " - " +colors.cyan.bold(source[0]);
//         }
// 		Tweet.create({
// 				_id			: tweet.id,
// 				created_at	: tweet.created_at,
// 				text		: tweet.text,
// 				source		: source,
// 				//_words		: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
// 				geo			: tweet.geo,
// 				coordinates	: tweet.coordinates,
// 				place		: tweet.place,
// 				hashtags	: tweet.hashtags
// 			}, function (err, _tweet) {
// 				if (err) {console.log(err);return;}
// 				User.findOne({ _id: tweet.user.id }, (err,us)=>{
// 					if (!us){
// 						User.create({
// 								_id			: tweet.user.id,
// 								name		: tweet.user.name,
// 								screen_name	: tweet.user.screen_name,
// 								location	: tweet.user.location,
// 								json		: tweet.user
// 							}, function (err, _user) {
// 								if (err) {
// 									console.log(err);
// 									return;
// 								}
// 								// saved!
// 								console.log("New user : " + _user._id);
// 								_tweet.user = _user;
// 								_tweet.save();
// 						});
// 					}else{
// 						console.log("Exists user : " + us._id);
// 						_tweet.user = us;
// 						_tweet.save();
// 					}
//
// 				});
// 			}
// 		);
// 		if (tweet.place) {
// 			console.log(colors.bgMagenta.bold(tweet.user.screen_name + " - " + tweet.place.name) + " - " + colors.green(createdAt.toLocaleString()) + source);
// 		}else{
// 			console.log(colors.bgMagenta.bold(tweet.user.screen_name) + " - " + colors.green(createdAt.toLocaleString()) + source);
// 		}
// 		_io.emit('broadcasting', tweet);
// 	});
//
// 	stream.on('error', function(error) {
// 		console.log(error);
// 	});
// 	stream.on('end', function() {
// 		console.log(colors.bold("\n\nFinish stream with %s tweets"),canTweet);
// 	});
// });

var sites = require('../tools/sites.js').Sites;
module.exports = function(io,app,request,cheerio) {
	_io = io;
    /*
     * @Method: GET
     * @Description: List sites.
    */
    app.get('/sites', function(req, res) {
        console.log("GET List site");
		setTimeout(function() {
    		res.json(sites);
		}, 1500);
    });

	/*
     * @Method: GET
     * @Description: request site.
    */
    app.get('/request/site/:id', function(req, res) {
        console.log("Request Site: " + req.params.id);
		var site = sites[req.params.id -1 ],
		    ini = new Date(),
		    json = {
	            site: "",
	            status: "",
	            date: "",
	            info: [],
	            queryTime: ""
	        };
		json.date = new Date();
        json.site = site.url;
        request(site.url, (error, response, html)=>{
            if(!error) {
                var $ = cheerio.load(html);
                json.status = 'success';
                json.info = site.getData($);
            }else{
                json.status = 'error';
                console.log('Request Error')
            }
            var fin = new Date();
            json.queryTime = fin - ini;
			res.json(json);
        });
    });
}
