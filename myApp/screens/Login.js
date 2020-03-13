import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator, AsyncStorage } from 'react-native';
class LoginScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state ={
        Email:'cm@mail.co.uk',
        Password:'Cheese',
        XAuthorization:'',
        user_id : ''
        }
    }
storeToken = async(token,user_id)=>{
  console.log("-----Async Token ------");
 // console.log("Token: " +token);
  //console.log("User_ID: " +user_id);
  try{
    await AsyncStorage.setItem('Token',token);
    //await AsyncStorage.setItem('key2', ""+user_id)
    await AsyncStorage.setItem('key2', JSON.stringify(user_id))
    console.log("store token:" +token);
    console.log("store id:" +user_id);
  }catch(e){}
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
     .then((response) => {
      return response.json()
   .then((responseJson) => {
    this.setState({
      XAuthorization: responseJson.token,
      user_id : responseJson.id
    });
     console.log("----------------------Results----------------------");
     console.log("Response Status: "+response.status)
     //console.log("Returned :"+responseJson);
     if(response.status == 200)
     {
      console.log("ID: "+responseJson.id);
      console.log("Authorization: "+ responseJson.token);
      this.storeToken(responseJson.token, responseJson.id); // set the Authorization token
      this.props.navigation.navigate('HomePage',{user_id:this.state.user_id,XAuthorization: this.state.XAuthorization});
     }
     else if (responseJson === 400){
       alert("Incorrect Email or Password, try again");
       console.log("Incorrect Email or Password");
     }
   })
  })}

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