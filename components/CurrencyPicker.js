
import React, { Component } from 'react';
import styles from './../styles.js';
import ConverterActions from "./../actions/ConverterActions";

import {
  View,
  Picker
} from 'react-native';

const Item = Picker.Item;

class CurrencyPicker extends Component {

	onPickerChangeValue(newCurrency) {
		ConverterActions.updateEnteredCCY(newCurrency);
	}

  render() {
    return (
      <View>
				<Picker style={styles.picker}
								selectedValue={this.props.currency}
								onValueChange={this.onPickerChangeValue}
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

export default CurrencyPicker;