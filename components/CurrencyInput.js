
import React, { Component } from 'react';
import styles from './../styles.js';

import {
  View,
  TextInput,
  Picker
} from 'react-native';

const Item = Picker.Item;

class CurrencyInput extends Component {

  render() {
    return (
      <View style={[styles.currenciesBlock, styles.blockRightBorder]} >

								<TextInput 	style={styles.typedSum}
														keyboardType='numeric'
														placeholder={'0.00'}
														editable={true}
														maxLength={12}
														onChangeText={this.props.onTypedSumChange}
								/>

								<Picker style={styles.picker}
												selectedValue={this.props.currency}
												onValueChange={this.props.onCurrencyPickerValChange.bind(this, 'currency')}
												mode="dropdown">

										{
											this.props.currencies.map((pair) => {
												return <Item label={pair.ccy} value={pair.ccy} key={pair.ccy} style={styles.currencyItem} /> ;
											})
										}
								</Picker>
      </View>
    );
  }
}

export default CurrencyInput;