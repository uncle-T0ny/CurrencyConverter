import React from 'react';
import {
  StyleSheet,
} from 'react-native';


var styles = StyleSheet.create({
	container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
  },
  flexDirectionRow: {
  	flexDirection: 'row'
  },
  outerView: {
  	backgroundColor: 'rgba(242, 237, 216, 0.8)'
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
  block: {
    width: 260,
    height: 200,
    paddingLeft: 10
  },
  currencyItem: {
  	color: '#44B3C2'
  },
  currencyName: {
   color: '#44B3C2'
  },
  blockSeparator: {
  	width: 140,
  	borderRightColor: '#5D4C46',
 		borderRightWidth: 1,
  	borderStyle: 'solid',
  }
});

export default styles;