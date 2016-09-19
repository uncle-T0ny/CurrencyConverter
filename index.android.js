
import React, { Component } from 'react';
import CurrencyInput from './components/CurrencyInput';
import CurrencyPicker from './components/CurrencyPicker';
import CurrenciesViewList from './components/CurrenciesViewList';
import styles from './styles.js';
import CURRENCY from "./constants"
import {getCurrencies} from "./api/CurrenciesApi";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

class AwesomeProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      currency: CURRENCY.EUR,
      typedSum: 0,
      uahMultiplier: {},
      currenciesLoaded: false
    };

    this.getUAHMultiplier = this.getUAHMultiplier.bind(this);
  }

  componentWillMount() {

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

			this.setState({
				currencies: currencies,
				uahMultiplier: uahMultiplier,
				currenciesLoaded: true
			});
		});
  }

  getUAHMultiplier(currency) {
    if (this.state.uahMultiplier) {
      return this.state.uahMultiplier[currency];
    } else {
      return 1;
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.outerView]}>

			 	<Text style={styles.welcome}>
			 			Currency Converter
				</Text>

        { this.state.currenciesLoaded? // have we loaded currencies?
        	<View style={[styles.container, styles.flexDirectionRow]}>
        		<View style={[styles.block, styles.blockSeparator]}>

							<CurrencyInput	currency={this.state.currency}
															onTypedSumChange={(typedSum) => this.setState({typedSum})}
														 	currencies={this.state.currencies} />

							<CurrencyPicker	onPickerValChange={(newCurrency) => this.setState({'currency': newCurrency})}
															currencies={this.state.currencies}/>

        		</View>

						<View  style={styles.block}>
							<CurrenciesViewList currencies={this.state.currencies}
																	currency={this.state.currency}
																	getUAHMultiplier={this.getUAHMultiplier}
																	typedSum={this.state.typedSum}/>
						</View>

           </View>

            : <Text style={[styles.container, {fontSize: 20}]} > LOADING ... </Text>
        }

          </View>

    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
