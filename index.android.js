
import React, { Component } from 'react';
import ConverterStore from './stores/ConverterStore';
import CurrencyInput from './components/CurrencyInput';
import CurrencyPicker from './components/CurrencyPicker';
import CurrenciesViewList from './components/CurrenciesViewList';
import styles from './styles.js';

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

		this.state = this.getConverterState();

		this._onChange = this._onChange.bind(this);
		this.getUAHMultiplier = this.getUAHMultiplier.bind(this);
  }

	componentDidMount() {
		ConverterStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		ConverterStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState(this.getConverterState());
	}

	getConverterState() {
		return {
			currencies: ConverterStore.getCurrencies(),
			currency: ConverterStore.getEnteredCurrency(),
			typedSum: ConverterStore.getEnteredValue(),
			uahMultiplier: ConverterStore.getUAHMultiplier(),
			currenciesLoaded: ConverterStore.isCurrenciesLoaded()
		};
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
														 	currencies={this.state.currencies} />

							<CurrencyPicker	currencies={this.state.currencies}
															 currency={this.state.currency}/>

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
