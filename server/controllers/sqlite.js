const sqlite3 = require('sqlite3').verbose()
const axios = require('axios');
const db = new sqlite3.Database('restaurants.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the restaurants database.');
});

exports.getRests = async (req, res) => {
	db.all('SELECT rowid AS id, name, type, phone, location FROM restaurants', function (err, rows) {
		if(err) return cb(err);
		return response(rows);
	});
	function response(list){
		return res.json({results: list});
	}
};

exports.updateLocation = async (req, res, next) => {
	let rests = req.body;
	rests.rests.shift();
	rests.rests.pop();
	for (const rest of rests.rests) {
		if(!rest[3]){
			return;
		}
		let coords = rest[3].split('/');
		let lat = coords[0];
		let lng = coords[1];

		rest[3] = await axios.get('http://www.mapquestapi.com/geocoding/v1/reverse?key=' + process.env.MAP_KEY + '&location=' + lat + ',' + lng)
			.then(response => {
				let locations = response.data.results.shift().locations.shift();
				return locations.street + ', ' + locations.adminArea5;
			})
			.catch(error => {
				console.log(error);
			});
	}
	req.body.updatedRestArray = rests.rests;
	next();
};

exports.updateDB = async (req, res) => {
	let body = req.body;
	let updatedArray = body.updatedRestArray;

	db.run('DELETE FROM restaurants');
	let stmt = db.prepare('INSERT INTO restaurants VALUES (?,?,?,?)');

	for (let i = 0; i < updatedArray.length; i++) {
		let rest = updatedArray[i];
		if(rest.length){
			stmt.run(rest[0],rest[1],rest[2],rest[3])
		}
	}

	stmt.finalize();
	return res.json({res: updatedArray});
};

exports.updateRest = async (req, res) => {
	let rest = req.body.user.rest;

	let stmt = db.prepare('UPDATE restaurants SET name = ?, type = ?, phone = ?, location = ?  WHERE rowid = ?');
	stmt.run(rest.name,rest.type,rest.phone,rest.location, rest.id);
	stmt.finalize();

	return res.json({results: rest});
};

exports.deleteRest = async (req, res) => {
	let stmt = db.prepare('DELETE FROM restaurants WHERE rowid = ?');
	stmt.run(req.body.user.id);
	stmt.finalize();

	return res.json({results: req.body.user.id});
};

