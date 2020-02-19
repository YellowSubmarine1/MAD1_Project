import React, { Component } from 'react';
import { Text, View, Button} from 'react-native';
class HomeScreen extends Component{
// removes the header from the page
static navigationOptions = {
    header: null
   }
   
 render(){
 return(
 <View>
    <Text>Following</Text>
    <Button
        title= "Back"
        onPress={() => this.props.navigation.goBack()} // Button opens the AboutScreen js page
    />
 </View>
 );
 }
}
export default HomeScreen;