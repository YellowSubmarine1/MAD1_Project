import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator, Image } from 'react-native';
class HomeScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        user_id:'',
        Given_Name:'',
        Family_Name:'',
        Email:'',
        Password:''
        }
    }

     // function uses 'fetch' to call the api and return a JSON string from the server
    getData(){
      console.log('Edit Profile');
      console.log(this.props.navigation.state.params.user_id);
      let result = "http://10.0.2.2:3333/api/v0.0.5/user/"+ this.props.navigation.state.params.user_id;
    return fetch(result, {
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
        user_id: responseJson.user_id
      });
      console.log(this.state.user_id);
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

    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+ this.state.user_id,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": "4c6334d91e50abd9871012dcc3ade9ca"
      },
      method: 'PATCH',
      body: result
    })
    .then((response) => {
      //Alert.alert("Item Updated!");
      console.log('Updates made');
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
  <View>

      <View style={{flex:3}}>
        <View style={{flexDirection: 'row',marginTop:40, paddingLeft:20}}>
            <View style={{alignItems:'flex-start'}}>
              <Text style={{fontSize:20, color:'gray'}}> Hello</Text>
              <Text style={{fontSize:14, color:'green'}}> {this.state.Given_Name} {this.state.Family_Name} </Text>
            </View>
        </View>
      </View>

      <View style={{flexDirection:'column'}}>
          {/* Styling for the Image*/}
          <View style={{marginTop:25,alignItems:'flex-end', paddingRight:20}}>
            <Image
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
              style= {{width:60, height:60, borderRadius:25}}
            />
          </View>
      </View>


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
          <Button  title="Update" onPress={() => this.updateProfile(this)} ></Button>

      </View>
   </View>
 );
 }
}

/*
<View style={{flex:1, flexDirection: 'column', flexWrap:'wrap'}}>

<View style={{flex:1, marginTop:1, marginLeft:5}}>
  <View style={{flexDirection:'column'}}>
    <Text style={{fontSize:20,fontWeight: 'bold'} }>Edit Profile</Text>
    <Image
      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
      style= {{width:75, height:70, borderRadius:15}}
    />
  </View>
</View>
</View>

</View>

    <View style={{flex:1, flexDirection: 'column', flexWrap:'wrap'}}>
        <Text style={{width: 420, height: 60, backgroundColor: 'orange', fontWeight: 'bold'} }>Edit Profile</Text>
        <Text>First Name:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray'}}
            onChangeText={(value) => this.setState({Given_Name:value})}
            value={this.state.Given_Name}
        />
        <Text>Family Name:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray'}}
            onChangeText={(value) => this.setState({Family_Name:value})}
            value={this.state.Family_Name}
        />
        <Text>Email:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray'}}
            onChangeText={(value) => this.setState({Email:value})}
            value={this.state.Email}
        />
        <Text>Password:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray'}}
            onChangeText={(value) => this.setState({Password:value})}
            secureTextEntry={true} 
            />
            <Button  title="Update" onPress={() => this.updateProfile(this)} ></Button>
        </View>
*/
export default HomeScreen;