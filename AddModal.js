import React, {Component} from 'react';
import {Platform, Text, Dimensions, View, Alert, Button} from 'react-native';
import Modal from 'react-native-modalbox';
const screenWidth = Dimensions.get('window').width;

export default class AddModal extends Component {

  constructor(props){
      super(props);
  }

  showAddModal = () => {
      this.refs.myModal.open();
  }

  render() {
    return (
        <Modal
            ref={"myModal"}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Platform.OS === 'ios' ? 30 : 0,
                shadowRadius: 10,
                width: screenWidth - 80,
                height: 180,
            }}
            position='center'
            backdrop={true}
            onClosed={() => {
                // Alert.alert("Modal closed");
            }}
        >
            <Text>Modal Test</Text>

            
        </Modal>
    );
  }
}