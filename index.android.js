
import React, { Component } from 'react';
import CurrencyInput from './components/CurrencyInput';
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


const DATA_URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

class AwesomeProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      currency: CURRENCY.EUR,
      typedSum: 0,
      uahMultiplier: {
        UAH: 1,
        USD: 1,
        EUR: 1,
        RUR: 1
      },
      currenciesLoaded: false
    };

    this.getUAHMultiplier = this.getUAHMultiplier.bind(this);
  }

  componentWillMount() {

		console.log("getCurrencies");

		getCurrencies((currencies) => {
		  console.log("currencies");
		  console.log(currencies);
			let newCurrencies = [];
			let newUahMultiplier = {};
			currencies.forEach((pair) => {
				if (pair.ccy != CURRENCY.BTC) {
					newCurrencies.push(pair);
					newUahMultiplier[pair.ccy] = pair.sale;
				}
			});

			newUahMultiplier[CURRENCY.UAH] = 1;

			newCurrencies.push({
				ccy: CURRENCY.UAH,
				base_ccy: CURRENCY.UAH,
				buy: 1,
				sale: 1
			});

			this.setState({
				currencies: newCurrencies,
				uahMultiplier: newUahMultiplier,
				currenciesLoaded: true
			});

			this.onCurrencyPickerValChange(CURRENCY.EUR, CURRENCY.EUR);
		});
  }

  getUAHMultiplier(currency) {
    if (this.state.uahMultiplier) {
      return this.state.uahMultiplier[currency];
    } else {
      return 1;
    }
  }

  onCurrencyPickerValChange = (key: string, value: string) => {
		const newState = {};
		newState[key] = value;
		this.setState(newState);
  };

  render() {
    return (
      <View style={[styles.container, styles.outerView]}>

			 	<Text style={styles.welcome}>
			 			Currency Converter
				</Text>

        { this.state.currenciesLoaded? // have we loaded currencies?
        	<View style={[styles.container, {flexDirection: 'row'}]}>
						<CurrencyInput currency={this.state.currency}
													 onCurrencyPickerValChange={this.onCurrencyPickerValChange}
													 onTypedSumChange={(typedSum) => this.setState({typedSum})}
													 currencies={this.state.currencies} />

						<CurrenciesViewList currencies={this.state.currencies}
																currency={this.state.currency}
																getUAHMultiplier={this.getUAHMultiplier}
																typedSum={this.state.typedSum}/>
           </View>

            : <Text style={[styles.container, {fontSize: 20}]} > LOADING ... </Text>
        }

          </View>

    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
