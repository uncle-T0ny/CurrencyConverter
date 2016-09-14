
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Picker
} from 'react-native';


const Item = Picker.Item;

const UAH = 'UAH';
const USD = 'USD';
const EUR = 'EUR';
const RUR = 'RUR';
const BTC = 'BTC';

class AwesomeProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      currency: EUR,
      typedSum: 0,
      uahMultiplier: {
        UAH: 1,
        USD: 1,
        EUR: 1,
        RUR: 1,
      },
      currenciesLoaded: false
    };
  }

  componentWillMount() {

    fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', {method: "GET"})
              .then((response) => {

                this.setState({currencies: JSON.parse(response._bodyInit)});

                let newCurrencies = [];
                let newUahMultiplier = {};
                this.state.currencies.forEach((pair) => {
                	if (pair.ccy != BTC) {
                  	newCurrencies.push(pair);
                    newUahMultiplier[pair.ccy] = pair.sale;
                  }
                });

                newUahMultiplier[UAH] = 1;

                newCurrencies.push({
                	ccy: UAH,
                	base_ccy: UAH,
                  buy: 1,
                  sale: 1
                });

                this.setState({currencies: newCurrencies});
                this.setState({uahMultiplier: newUahMultiplier});
                this.setState({currenciesLoaded: true});

                this.onPickerValueChange(EUR, EUR);

              })
              .catch((error) => {
                console.error(error);
              });
  }

  roundNumber(number) {
    let result = parseFloat(number).toFixed(2);
    if (!isNaN(result)) {
      return result
    } else {
      return 0;
    }
  }

  getUAHMultiplier(currency) {
    if (this.state.uahMultiplier) {
      return this.state.uahMultiplier[currency];
    } else {
      return 1;
    }
  }

  onPickerValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };

  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'rgba(242, 237, 216, 0.8)'}]}>

			 	<Text style={styles.welcome}>
			 			Currency Converter
				</Text>

        { this.state.currenciesLoaded? // have we loaded currencies?
        	<View style={[styles.container, {flexDirection: 'row'}]}>
						<View style={[styles.currenciesBlock, styles.blockRightBorder]} >

							<TextInput 	style={styles.typedSum}
													keyboardType='numeric'
													placeholder={'0.00'}
													editable={true}
													maxLength={12}
													onChangeText={(typedSum) => this.setState({typedSum})}
				 			/>

							<Picker style={styles.picker}
											selectedValue={this.state.currency}
											onValueChange={this.onPickerValueChange.bind(this, 'currency')}
											mode="dropdown">

									{
										this.state.currencies.map((pair) => {
											return <Item label={pair.ccy} value={pair.ccy} key={pair.ccy} color='#44B3C2'/> ;
										})
									}

							</Picker>

            </View>

						<View style={styles.currenciesBlock} >
							{
									this.state.currencies.map((pair) => {

											if (this.state.currency == pair.ccy) { //chosen current currency
												return null;
											} else if (pair.ccy == UAH) {
												return 	<Text key={pair.ccy}
																			style={styles.currencyOut}>
																		{this.roundNumber(this.getUAHMultiplier(this.state.currency) * this.state.typedSum)}
																		<Text style={styles.currencyName}>  {pair.ccy}</Text>
																</Text>;
											} else {
												if (this.state.currency == UAH) {
													return	<Text key={pair.ccy}
																				style={styles.currencyOut}>
																		{this.roundNumber(this.state.typedSum / this.getUAHMultiplier(pair.ccy))}
																		<Text style={styles.currencyName}>  {pair.ccy}</Text>
																	</Text>
												} else {
													return  <Text key={pair.ccy}
																				style={styles.currencyOut}>
																		{this.roundNumber(this.getUAHMultiplier(this.state.currency) * this.state.typedSum / this.getUAHMultiplier(pair.ccy))}
																		<Text style={styles.currencyName}>  {pair.ccy}</Text>
																	</Text>;
												}
											}

									})
							}
						</View>
           </View>

            : <Text style={[styles.container, {fontSize: 20}]} > LOADING ... </Text> }

          </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#5D4C46'
  },
  picker: {
    height: 40,
  },
  typedSum: {
    fontSize: 20,
    height: 50,
    fontFamily: 'Roboto',
    color: '#7B8D8E'
  },
  currencyOut: {
    fontSize: 20,
    fontFamily: 'Roboto'
  },
  currenciesBlock: {
    width: 260,
    height: 200,
    paddingLeft: 10
  },
  currencyName: {
   color: '#44B3C2'
  },
  blockRightBorder: {
  	width: 140,
  	borderRightColor: '#5D4C46',
 		borderRightWidth: 1,
  	borderStyle: 'solid',
  }

});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
