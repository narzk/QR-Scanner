// 'use strict';

import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

class ScanScreen extends Component {
  render() {
    return (
      <QRCodeScanner
        onRead={this.props.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Welcome to the scanner app!{'\n'}
            {'\n'} scan your QR code to see the result
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Button
              title="See the result"
              onPress={() => this.props.handelResult()}
            />
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 20,
    padding: 32,
    color: '#777',
    alignContent: 'center',
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('default', () => ScanScreen);
export default ScanScreen;
