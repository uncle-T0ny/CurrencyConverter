
const DATA_URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

export function getCurrencies(callback) {
	fetch(DATA_URL, {method: "GET"})
		.then(response => response.json())
		.then((json) => {
			return callback(json);
		})
		.catch((error) => {
			console.error(error);
		});
}