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
 
     return fetch("http://10.0.2.2:3333/api/v0.0.4/user",
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
         result: 'Account Made'
       });
       console.log("JSON Results:");
       console.log(this.state.responseMade);
     })
     .catch((error) =>{
     console.log(error);
     });
     }
 render(){

 return(
    <View style={{flex:1, flexDirection: 'column', flexWrap:'wrap'}}>
        <Text style={{width: 420, height: 60, backgroundColor: 'orange', fontWeight: 'bold'} }>Create Account</Text>
        <Text>Given Name:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(value) => this.setState({Given_Name:value})}
        />
        <Text>Family Name:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(value) => this.setState({Family_Name:value})}
        />
        <Text>Email:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(value) => this.setState({Email:value})}
        />
        <Text>Password:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(value) => this.setState({Password:value})}
        />
        <Button  title="Create" onPress={() => this.createAccount(this)} ></Button>
        <Text>{this.state.result}</Text>
    </View>
 );
 }
}
export default LoginScreen;