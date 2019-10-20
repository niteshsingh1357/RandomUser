/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StatusBar,
  RefreshControl} from 'react-native';

import AddModal from './AddModal';
const screenWidth = Dimensions.get('window').width;

export default class App extends Component {

  state = {
    user: [],
    isLoading: false,
    refreshing: false,
  }

  Capitalize(str){
    return str.charAt(0).toUpperCase()+str.slice(1);
  }

  getRandomUser = () => {
    let url = `https://randomuser.me/api/?results=20`;
    return fetch(url).then((res) => res.json());
  }

  handleClick = () => {
    this.setState({isLoading: true})
    this.getRandomUser()
    .then(
      (res) => {
        this.setState({
          user: res,
          isLoading: false
        });
      //Alert.alert(JSON.stringify(this.state.user));
      });
  }

  FlatListItemSeparator = () => {
    return(
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "#3F51B5",
        }}
      />
    );
  }

  handleFlatListItemClick = (item) => {
    this.refs.addModal.showAddModal();
    // Alert.alert(`User Info:`,
    //   `Name: ${this.Capitalize(item.name.title)} ${this.Capitalize(item.name.first)} ${this.Capitalize(item.name.last)} \nAge: ${item.dob.age}\nPhone: ${item.phone}\nEmail: ${item.email}`
    //   );
  }

  renderItem = ({item, index, separators}) => (
    <TouchableHighlight
      onPress={() => this.handleFlatListItemClick(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
        <View style={styles.flatListItem}>
          <Image 
              style={styles.image}
              source={{uri: item.picture.medium}}
            />
          <Text style={styles.flatListItemText}> 
             {this.Capitalize(item.name.title)} {this.Capitalize(item.name.first)} {this.Capitalize(item.name.last)}
          </Text>
        </View>
    </TouchableHighlight>
  );

  renderRandomUserUsingFlatList = () => {
    return(
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleClick}
          />
        }
        data={this.state.user.results}
        keyExtractor={ (item, index) => index.toString() }
        ItemSeparatorComponent={ this.FlatListItemSeparator }
        renderItem={ this.renderItem }
      />
    );
  }

  componentWillMount(){
    {this.handleClick()}
  }

  render() {
    return (
      
      <View style={styles.container}>
        <StatusBar
           backgroundColor="#1A237E"
           barStyle="light-content"
        />
  
        <Text style={styles.title}>Random User</Text>
        
        
        { this.renderRandomUserUsingFlatList() }

        <AddModal ref={'addModal'} parentFlatList={this}>
					 </AddModal>

        <Text style={{height: 20, backgroundColor: '#3F51B5'}}></Text>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#3F51B5',
  },
  
  button: {
    height: 45,
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#4A148C',
    backgroundColor: '#4A148C',
    width: screenWidth - 20,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
  },

  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
  },

  activityIndicator: {
    paddingRight: 8,
  },

  flatListItem: {
    flex: 1,
    color: 'white',
    backgroundColor: 'white', 
    flexDirection: 'row',
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    borderColor: '#3F51B5',
    fontSize: 18,
    height: 70,
  },

  image: {
    width: 45, 
    height: 45, 
    borderRadius: 100, 
    padding: 10,
    alignSelf: 'center'
  },

  flatListItemText: {
    alignSelf: 'center',
    padding: 10,
    fontSize: 18,
  },

  title: {
    width: screenWidth,
    backgroundColor: '#283593',
    alignSelf: 'center',
    fontSize: 20,
    justifyContent: 'center',
    height: 50,
    padding: 10,
    color: '#FFFFFF',
    marginBottom: 10,
  },

});
