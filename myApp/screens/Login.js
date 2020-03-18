import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator, AsyncStorage } from 'react-native';
class LoginScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
        header: false
    }
    constructor(props){
        super(props);
        this.state ={
        Email:'cm@mail.co.uk',
        Password:'Cheese',
        XAuthorization:'',
        user_id : '',
        server_response:''
        }
    }
storeToken = async(token,user_id,display_content)=>{
  console.log("-----Async Token ------");
  try{
    await AsyncStorage.setItem('Token',token);
    await AsyncStorage.setItem('key2', JSON.stringify(user_id))
    await AsyncStorage.setItem('display_content', JSON.stringify(display_content))
    console.log("store token:" +token);
    console.log("store id:" +user_id);
    console.log("store display_content:" +display_content);
  }catch(e){}
}

sendDisplayContentValue = async(display_content)=>{
  console.log("-----Async Token ------");
  try{
    await AsyncStorage.setItem('display_content', JSON.stringify(display_content))
    console.log("store display_content:" +display_content);
  }catch(e){}
}

sendDisplay_Content()
{
  this.sendDisplayContentValue(false)
  this.props.navigation.navigate('ViewChits');
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
      console.log("Res:" + JSON.stringify(response));
      console.log("Res status:" + JSON.stringify(response.status));
      console.log("Res ok?:" + JSON.stringify(response.ok));
      this.setState({
        server_response: response.status,
      });
      return response.json()
    })
      .then((responseJson) => {
        this.setState({
          XAuthorization: responseJson.token,
          user_id : responseJson.id
        });
          console.log("----------------------Results----------------------");
          console.log("Response Status: "+this.state.server_response)
          if(this.state.server_response == 200)
          {
            console.log("ID: "+this.state.user_id);
            console.log("Authorization: "+ this.state.XAuthorization);
            this.storeToken(this.state.XAuthorization, this.state.user_id,true); // set the Authorization token
            this.props.navigation.navigate('HomePage',{user_id:this.state.user_id,XAuthorization: this.state.XAuthorization});
          }
          else if (this.state.server_response === 400){
            alert("Incorrect Email or Password, try again");
          }
     })
     .catch((error) =>{
      console.log(error);
      })
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
      <Button style={{marginBottom:10}}  title="Register" onPress={() => this.props.navigation.navigate('Register')} ></Button>
  </View>
  <Text style={{color:'gray', fontSize:15, fontWeight:'bold', marginTop:15, alignSelf:'center'}} onPress={() => this.sendDisplay_Content()}>View Chits</Text>
</View>
 );
 }
}
export default LoginScreen;