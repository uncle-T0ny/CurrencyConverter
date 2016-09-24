
import React, { Component } from 'react';
import styles from './../styles.js';
import {CURRENCY} from "./../constants";
import {roundNumber} from "./../util";

import {
  View,
  Text,
} from 'react-native';

class CurrenciesViewList extends Component {

  calculate(currencyName) {
  	let chosenCurrency = this.props.currency;
  	if (currencyName == CURRENCY.UAH) {
  		return roundNumber(this.props.getUAHMultiplier(chosenCurrency) * this.props.typedSum);
  	} else {
  		if (chosenCurrency == CURRENCY.UAH) {
  			return roundNumber(this.props.typedSum / this.props.getUAHMultiplier(currencyName));
  		} else {
				return roundNumber(this.props.getUAHMultiplier(chosenCurrency) * this.props.typedSum / this.props.getUAHMultiplier(currencyName));
  		}
  	}
  }

  getListItem(currencyName) {
  	return	<Text key={currencyName}
											style={styles.currencyOut}>

							{this.calculate(currencyName)}
							<Text style={styles.currencyName}>  {currencyName}</Text>

						</Text>;
  }

  render() {
    return (
      <View>
				{
						this.props.currencies.map((pair) => {

								if (this.props.currency == pair.ccy) {
									return null;
								} else if (pair.ccy == CURRENCY.UAH) {
									return this.getListItem(pair.ccy);
								} else {
									if (this.props.currency == CURRENCY.UAH) {
										return this.getListItem(pair.ccy);
									} else {
										return this.getListItem(pair.ccy);
									}
								}

						})
				}
      </View>
    );
  }
}

export default CurrenciesViewList;