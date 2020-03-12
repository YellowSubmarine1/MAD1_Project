import React, { Component } from 'react';
import { Text, View, Button, TextInput} from 'react-native';
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
    Password:'',
    XAuthorization: '',
    chit_content:''
    }
}

postChit()
{
 let result = JSON.stringify({
   chit_id:0,
   timestamp:0,
   chit_content: this.state.chit_content,
   location:{longitude:0,latitude:0},
   user:{
    user_id: parseInt('7'),
    given_name: "Charles Nelson",
    family_name: "Modi",
    email: "cm@mail.co.uk"
   }
 });

 console.log(result);
 //console.log(this.state.XAuthorization);

 return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
 {
   headers: {
     "Content-Type": "application/json",
     //"X-Authorization": this.state.XAuthorization
     "X-Authorization": '721e1337bc006862489dba9f26bc5dfa'
   },
   method: 'POST',
   body: result
 })
 .then((response) => response.json())
 .then((responseJson) => {
   console.log("-------- Chit Posted -------------");
   console.log('Server Response: '+ responseJson);
   alert("Chit Posted!");
 })
 .catch((error) => {
   console.error(error);
 });
}

 render(){
 return(
    <View>
    <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
      <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Post Chits -</Text>
    </View>

    <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
      <Text style={{color:'gray', fontSize:11, width:285}}>Enter Chits:</Text>
      <TextInput style={{ height: 140, backgroundColor:'lightgray', borderRadius:8, marginBottom:10}}
          onChangeText={(value) => this.setState({chit_content:value})}
          multiline={true}
          underlineColorAndroid='transparent'
          maxLength={141}

      />
      <Button  title="Post" onPress={() => this.postChit()} ></Button>
    </View>
  </View>
 );
 }
}
export default HomeScreen;
/*
I like to eat banana's because they are good for you, sometimes I eat apples to but I prefer the softness of bananas */