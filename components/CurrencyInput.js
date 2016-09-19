
import React, { Component } from 'react';
import styles from './../styles.js';

import {
  View,
  TextInput
  } from 'react-native';

class CurrencyInput extends Component {
  render() {
    return (
      <View>
				<TextInput 	style={styles.typedSum}
										keyboardType='numeric'
										placeholder={'0.00'}
										editable={true}
										maxLength={12}
										onChangeText={this.props.onTypedSumChange}
				/>
      </View>
    );
  }
}

export default CurrencyInput;