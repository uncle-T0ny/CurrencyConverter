
export function roundNumber(number) {
	let result = parseFloat(number).toFixed(2);
	if (!isNaN(result)) {
		return result;
	} else {
		return 0;
	}
};