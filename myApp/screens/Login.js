import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator } from 'react-native';
class LoginScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        ID:'',
        Email:'',
        Password:'',
        XAuthorization: '',

        }
    }
    attemptLogin()
    {
     let result = JSON.stringify({
       email: this.state.Email,
       password: this.state.Password
     });
 
     console.log(result);
 
     return fetch("http://10.0.2.2:3333/api/v0.0.4/login",
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
         XAuthorization: responseJson.token,
         ID : responseJson.id
       });
       console.log("JSON Results:");
       console.log("XAuthorization:");
       console.log(this.state.XAuthorization);
       console.log("ID:");
       console.log(this.state.ID);
     })
     .catch((error) =>{
     console.log(error);
     });
     }
 render(){

 return(
    <View style={{flex:1, flexDirection: 'column', flexWrap:'wrap'}}>
        <Text style={{width: 420, height: 60, backgroundColor: 'orange', fontWeight: 'bold'} }>Login</Text>
        <Text>Email:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(value) => this.setState({Email:value})}
        />
        <Text>Password:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(value) => this.setState({Password:value})}
        />
        <Button  title="Login" onPress={() => this.attemptLogin(this)} ></Button>
    </View>
 );
 }
}
export default LoginScreen;