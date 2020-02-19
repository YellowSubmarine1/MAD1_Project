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
    <Text>Chits</Text>
 </View>
 );
 }
}
export default HomeScreen;