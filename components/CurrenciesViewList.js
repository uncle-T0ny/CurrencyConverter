
import React, { Component } from 'react';
import styles from './../styles.js';
import CURRENCY from "./../constants";
import {roundNumber} from "./../util";

import {
  View,
  Text,
} from 'react-native';

class CurrenciesViewList extends Component {

  render() {
    return (
      <View style={styles.currenciesBlock} >
				{
						this.props.currencies.map((pair) => {

								if (this.props.currency == pair.ccy) {
									return null;
								} else if (pair.ccy == CURRENCY.UAH) {
									return 	<Text key={pair.ccy}
																style={styles.currencyOut}>
															{roundNumber(this.props.getUAHMultiplier(this.props.currency) * this.props.typedSum)}
															<Text style={styles.currencyName}>  {pair.ccy}</Text>
													</Text>;
								} else {
									if (this.props.currency == CURRENCY.UAH) {
										return	<Text key={pair.ccy}
																	style={styles.currencyOut}>
															{roundNumber(this.props.typedSum / this.props.getUAHMultiplier(pair.ccy))}
															<Text style={styles.currencyName}>  {pair.ccy}</Text>
														</Text>
									} else {
										return  <Text key={pair.ccy}
																	style={styles.currencyOut}>
															{roundNumber(this.props.getUAHMultiplier(this.props.currency) * this.props.typedSum / this.props.getUAHMultiplier(pair.ccy))}
															<Text style={styles.currencyName}>  {pair.ccy}</Text>
														</Text>;
									}
								}

						})
				}
      </View>
    );
  }
}

export default CurrenciesViewList;