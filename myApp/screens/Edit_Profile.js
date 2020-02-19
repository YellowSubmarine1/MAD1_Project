import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator } from 'react-native';
class HomeScreen extends Component{
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
        Password:''
        }
    }

     // function uses 'fetch' to call the api and return a JSON string from the server
    getData(){
        var dataObj={}
    return fetch('http://10.0.2.2:3333/api/v0.0.4/user/7', {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json'
        }})
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(0,responseJson)
        this.setState({
        isLoading: false,
        Given_Name: responseJson.given_name,
        Family_Name: responseJson.family_name,
        Email: responseJson.email,
      });
      console.log(this.state.Email);
    })
    .catch((error) =>{
    console.log(error);
    });
    }
  componentDidMount(){
    this.getData();
   }

   updateProfile()
   {
    let result = JSON.stringify({
      given_name: this.state.Given_Name,
      family_name: this.state.Family_Name,
      email: this.state.Email,
      password: this.state.Password
    });

    console.log(result);

    return fetch("http://10.0.2.2:3333/api/v0.0.4/user/7",
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": "6df62199733141033ea36239ac0ff433"
      },
      method: 'PATCH',
      body: result
    })
    .then((response) => {
      Alert.alert("Item Updated!");
    })
    .catch((error) => {
      console.error(error);
    });
  }
 render(){
    if(this.state.isLoading){
        return(
          <View>
            <ActivityIndicator/>
          </View>
        )
    }
 return(
    <View style={{flex:1, flexDirection: 'column', flexWrap:'wrap'}}>
        <Text style={{width: 420, height: 60, backgroundColor: 'orange', fontWeight: 'bold'} }>Edit Profile</Text>
        <Text>First Name:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(value) => this.setState({Given_Name:value})}
            value={this.state.Given_Name}
        />
        <Text>Family Name:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(value) => this.setState({Family_Name:value})}
            value={this.state.Family_Name}
        />
        <Text>Email:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(value) => this.setState({Email:value})}
            value={this.state.Email}
        />
        <Text>Password:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(value) => this.setState({Password:value})}
            secureTextEntry={true} /* This hids the password input when typed in */
        />
        <Button  title="Update" onPress={() => this.updateProfile(this)} ></Button>
    </View>
 );
 }
}
export default HomeScreen;