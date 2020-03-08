import React, { Component } from 'react';
import { Text, View, Button} from 'react-native';
class HomeScreen extends Component{
// removes the header from the page
static navigationOptions = {
    header: null
   }
   
   constructor(props){
    super(props);
    this.state ={
    isLoading: true,
    User_Profile: []
    }
}
getData(){
    let result = "http://10.0.2.2:3333/api/v0.0.5/user/"+ this.props.navigation.state.params.user_id;
    console.log('Get Request');
    console.log(result);
    return fetch(result,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
        isLoading: false,
        User_Profile: responseJson,
      });
      console.log("JSON Results:");
      console.log(responseJson);
    })
    .catch((error) =>{
    console.log(error);
    });
    }
    componentDidMount(){
        this.getData();
       } 
 render(){
 return(
 <View>
    <Text>Profile</Text>
    <Button
        title= "Back"
        onPress={() => this.props.navigation.goBack()} // Button opens the AboutScreen js page
    />
 </View>
 );
 }
}
export default HomeScreen;