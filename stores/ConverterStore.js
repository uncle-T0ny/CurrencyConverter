import Dispatcher from "./../dispatcher/Dispatcher";
import {EventEmitter} from "events";
import assign from "object-assign";
import {CURRENCY, ACTIONS} from "../constants"
import {getCurrencies} from "./../api/CurrenciesApi";

const CHANGE_EVENT = 'change';

let data = {
	currencies: [],
	currency: CURRENCY.EUR,
	typedSum: 0,
	uahMultiplier: {},
	currenciesLoaded: false
};


class ConverterStore extends EventEmitter {

	constructor() {
		super();
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	getCurrencies() {
		return data.currencies;
	}

	getEnteredCurrency() {
		return data.currency;
	}

	getEnteredValue() {
		return data.typedSum;
	}

	getUAHMultiplier() {
		return data.uahMultiplier;
	}

	isCurrenciesLoaded() {
		return data.currenciesLoaded;
	}
}

let converterStoreInstance = new ConverterStore();

converterStoreInstance.dispatchToken = Dispatcher.register(action => {
	let value;

	switch(action.actionType) {
		case ACTIONS.UPDATE_ENTERED_VALUE:
			value = action.value;
			data.typedSum = parseFloat(value);
			converterStoreInstance.emitChange();
			break;

		case ACTIONS.UPDATE_ENTERED_CCY:
			value = action.value;
			data.currency = value;
			converterStoreInstance.emitChange();
			break;

		default:
		// no op
	}
});

getCurrencies((currencies) => {

	let uahMultiplier = {};
	uahMultiplier[CURRENCY.UAH] = 1;

	currencies = currencies.filter((pair, idx) => {
		if (pair.ccy == CURRENCY.BTC) {
			return;
		} else {
			uahMultiplier[pair.ccy] = pair.sale;
			return pair;
		}
	});

	currencies.push({
		ccy: CURRENCY.UAH,
		base_ccy: CURRENCY.UAH,
		buy: 1,
		sale: 1
	});

	data.currencies = currencies;
	data.uahMultiplier = uahMultiplier;
	data.currenciesLoaded = true;
	converterStoreInstance.emitChange();
});

export default converterStoreInstance;