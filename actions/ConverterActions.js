import React, { Component } from 'react';
import Dispatcher from "./../dispatcher/Dispatcher";
import {ACTIONS} from "../constants"

export default class ConverterActions extends Component {

	static updateEnteredValue(value) {
		Dispatcher.dispatch({
			actionType: ACTIONS.UPDATE_ENTERED_VALUE,
			value: value
		});
	}

	static updateEnteredCCY(value) {
		Dispatcher.dispatch({
			actionType: ACTIONS.UPDATE_ENTERED_CCY,
			value: value
		});
	}

}