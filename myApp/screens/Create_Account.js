import React, { Component } from 'react';
import { Text, View, Button,TextInput,Alert } from 'react-native';
class LoginScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        Given_Name:'',
        Family_Name:'',
        Email:'',
        Password: '',
        responseMade: '',
        result: ""
        }
    }
    createAccount()
    {
     let result = JSON.stringify({
       given_name: this.state.Given_Name,
       family_name: this.state.Family_Name,
       email: this.state.Email,
       password: this.state.Password
     });
 
     console.log(result);
 
     return fetch("http://10.0.2.2:3333/api/v0.0.5/user",
     {
       headers: {
         "Content-Type": "application/json"
       },
       method: 'POST',
       body: result
     })
     .then((response) => response.json())
     .then((responseJson) => {
         this.setState({
         isLoading: false,
         responseMade: responseJson,
         result: 'Account Made',
       });
       console.log("JSON Results:");
       console.log(this.state.responseMade);
       alert('Account Created, Please Login');
     })
     .then((response)=>{
      this.props.navigation.navigate('Login');
     })
     .catch((error) =>{
     console.log(error);
     });
     }
 render(){

 return(
  <View>
  <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
    <Text style={{color:'gray', fontSize:11, width:285}}>First Name</Text>
      <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8}}
          onChangeText={(value) => this.setState({Given_Name:value})}
          value={this.state.Given_Name}
      />
      <Text style={{color:'gray', fontSize:11}}>Family Name</Text>
      <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8}}
          onChangeText={(value) => this.setState({Family_Name:value})}
          value={this.state.Family_Name}
      />
      <Text style={{color:'gray', fontSize:11}}>Email</Text>
      <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8}}
          onChangeText={(value) => this.setState({Email:value})}
          value={this.state.Email}
      />
      <Text style={{color:'gray', fontSize:11}}>Password</Text>
      <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8, marginBottom:10}}
          onChangeText={(value) => this.setState({Password:value})}
          secureTextEntry={true} 
      />
      <Button  title="Confirm" onPress={() => this.createAccount(this)} ></Button>

  </View>
</View>
 );
 }
}
export default LoginScreen;