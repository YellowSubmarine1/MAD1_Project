import React, { Component } from 'react';
import { Text, View, Button, TextInput, ActivityIndicator,Image} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {RNCamera } from 'react-native-camera';
class HomeScreen extends Component{
// removes the header from the page
static navigationOptions = {
    header: false
   }
  
   constructor(props){
    super(props);
    this.state ={
    isLoading: true,
    server_response:'',
    Image_URL:''
    }
}

Get_Image()
{
  return fetch("http://10.0.2.2:3333/api/v0.0.5/user/7/photo",
  {
    headers: {
      "Content-Type": "image/png",
      'Accept': 'application/json'
    },
    method: 'GET',
  })
  .then((response) => {
   // response.json()
    console.log(response)
    console.log(response.url)
    this.setState({
      isLoading: false,
      server_response: response.status,
      Image_URL:response.url    
    });
  })
  .catch((error) =>{
    console.log(error);
    })
}

componentDidMount(){
  this.Get_Image();
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
    <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
      <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Post Chits -</Text>
    </View>

    <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
      <Text style={{color:'gray', fontSize:11, width:285}}>Enter Chits:</Text>
      <Image
                  style={{width:200, height: 200, borderRadius:15}}
                  source={{uri: this.state.Image_URL}}
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