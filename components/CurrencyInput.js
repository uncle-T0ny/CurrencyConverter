
import React, { Component } from 'react';
import styles from './../styles.js';
import ConverterActions from "./../actions/ConverterActions";

import {
  View,
  TextInput
  } from 'react-native';

class CurrencyInput extends Component {

	onChange(newValue) {
		ConverterActions.updateEnteredValue(newValue);
	}

  render() {
    return (
      <View>
				<TextInput 	style={styles.typedSum}
										keyboardType='numeric'
										placeholder={'0.00'}
										editable={true}
										maxLength={12}
										onChangeText={this.onChange}
				/>
      </View>
    );
  }
}

export default CurrencyInput;