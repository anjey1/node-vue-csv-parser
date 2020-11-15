


export async function getAllRests() {
	const response = await fetch('/api/getCsv');
	return await response.json();
}

export async function postCsv(dataFile){
	let result = [];
	await fetch(`/api/postCsv`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({rests: dataFile})
	}).then(function(response) {
		return response.text();
	}).then(function(data){
		let restUpdated = JSON.parse(data).res.map((x, index) => {
			return {
				id: index,
				name: x[0],
				type: x[1],
				phone:x[2],
				location:x[3]
			}
		});
		result = restUpdated
	});

	return result;
}

export async function editRest(data) {
	const response = await fetch(`/api/editRest/`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({user: data})
	});
	return await response.json();
}

export async function deleteRest(id) {
	const response = await fetch(`/api/deleteRest`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({user: id})
	});
	return await response.json();
}
