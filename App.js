/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, Component} from 'react';
import {createStore, Provider} from 'redux';
import {StyleSheet, Text, View, Modal, Alert, Pressable} from 'react-native';

import ScanScreen from './android/app/components/ScanScreen';

import {connect} from 'react-redux';
import {scanner} from './android/app/redux/actions/scanner';
import {bindActionCreators} from 'redux';

import scannerReducer from './android/app/redux/reducers/scannerReducer';

const ModalApp = ({modalVisible, handelClose, data}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        handelClose;
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => handelClose()}></Pressable>
          {Object.values(data).map(item => (
            <Text>{item}</Text>
          ))}
        </View>
      </View>
    </Modal>
  );
};
const store = createStore(scannerReducer);

class App extends Component {
  state = {
    modalVisible: false,
  };
  handelResult = () => {
    this.setState({
      modalVisible: true,
    });
  };
  handelClose = () => {
    this.setState({
      modalVisible: false,
    });
  };
  onSuccess = e => {
    let {actions} = this.props;

    actions
      .scanner(e.data)
      .catch(err => console.error('An error occured', err));
  };
  render() {
    const {data} = this.props;
    return (
      <Provider store={store}>
        <ModalApp
          modalVisible={this.state.modalVisible}
          handelClose={this.handelClose}
          data={data}
        />
        <ScanScreen
          handelResult={this.handelResult}
          onSuccess={this.onSuccess}
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },
});

const mapStateToProps = state => {
  const {data} = state;
  return {data};
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      scanner,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
