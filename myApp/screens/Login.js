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
        user_id:'',
        Email:'',
        Password:'',
        XAuthorization: '',
        Access: false,

        }
    }
    attemptLogin()
    {
     let result = JSON.stringify({
       email: this.state.Email,
       password: this.state.Password
     });
 
     console.log('Post Request:'+result);
 
     return fetch("http://10.0.2.2:3333/api/v0.0.5/login",
     {
       headers: {
         "Content-Type": "application/json"
       },
       method: 'POST',
       body: result
     })
     .then((response) => response.json())
     .then((responseJson) => {

      console.log('Login Results: '+responseJson);
      if(responseJson == 'Invalid email/password supplied')
      {
        alert('Invalid User, Please Try Again');
      }
      else
      {
        this.setState({
          isLoading: false,
          XAuthorization: responseJson.token,
          user_id : responseJson.id,
          Access: true
        });
      }
     //  console.log("JSON Results:");
    //   console.log("XAuthorization:");
       console.log(this.state.XAuthorization);
       console.log("ID:");
       console.log(this.state.user_id);

       this.props.navigation.navigate('UserProfile',{user_id:this.state.user_id,XAuthorization: this.state.XAuthorization});
     })
     .catch((error) =>{
     console.log(error);
     });
     }
 render(){

 return(
  <View style={{ alignContent:'center', alignSelf:'center'}}>

  <View style={{flexDirection:'column', alignSelf:'center', paddingTop:80}}>
    <Text style={{color:'gray', fontSize:11, width:285, paddingTop:20}}>First Name</Text>
      <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8}}
          onChangeText={(value) => this.setState({Email:value})}
          value={this.state.Email}
      />
      <Text style={{color:'gray', fontSize:11}}>Family Name</Text>
      <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8, marginBottom:10}}
          onChangeText={(value) => this.setState({Password:value})}
          value={this.state.Password}
      />
      <Button  title="Login" onPress={() => this.attemptLogin(this)} ></Button>

      <Text style={{color:'gray', fontSize:15, fontWeight:'bold', marginTop:15}}>Or Register</Text>
      <Button  title="Register" onPress={() => this.props.navigation.navigate('Register')} ></Button>
  </View>
</View>
 );
 }
}
export default LoginScreen;