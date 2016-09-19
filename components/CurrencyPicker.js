
import React, { Component } from 'react';
import styles from './../styles.js';

import {
  View,
  Picker
} from 'react-native';

const Item = Picker.Item;

class CurrencyPicker extends Component {

  render() {
    return (
      <View>
				<Picker style={styles.picker}
								selectedValue={this.props.currency}
								onValueChange={this.props.onPickerValChange}
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