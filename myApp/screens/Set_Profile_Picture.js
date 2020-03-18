import React, { Component } from 'react';
import { Text, View, Button, TextInput, ActivityIndicator,Image,Alert} from 'react-native';
import {RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
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


post_Image_Chit()
{
  return fetch("http://10.0.2.2:3333/api/v0.0.5/user/7/photo",
  {
    headers: {
      "Content-Type": "image/png",
      "X-Authorization":"a476d65acfc6ce1b89c66b9709f84a1"

    },
    method: 'POST',
    body: this.state.Image_URL
  })
  .then((response) => {
    console.log("Response: "+response)
    console.log("Returned URL: "+response.url)
    this.setState({
      isLoading: false,
      server_response: response.status,
    });
  })
  .catch((error) =>{
    console.log(error);
    })
}

handleChoosePhoto= () =>{
  console.log("Button Pressed")
  const options ={
    title: 'My Pictures',
    takePhotoButtonTitle:'Select from Camera',
    chooseFromLibraryButtonTitle:'Select from Library'
  };
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
  
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };
  
      this.setState({
        Image_URL: response.uri
      });
      console.log("Image URL:"+ this.state.Image_URL)

      console.log("Image URL: "+ this.state.Image_URL)
      return fetch("http://10.0.2.2:3333/api/v0.0.5/chits/7/photo",
      {
        headers: {
          "Content-Type": "image/jpeg",
          "X-Authorization":"6ed620bcf7d6e98bb861d4ff7c644ccf"
    
        },
        method: 'POST',
        body: response
      })
      .then((response) => {
        console.log("Res:" + JSON.stringify(response.status));
        console.log("Response: "+response)
        console.log("Returned URL: "+response.url)
      })
      .then((response)=>{
        Alert.alert("Photo Added!");
        this.props.navigation.navigate('Post_Chits',{image_url:data.url})
      })
      .catch((error) =>{
        console.log(error);
        })
      
    }
  });
}
Get_Image()
{
  return fetch("http://10.0.2.2:3333/api/v0.0.5/chits/7/photo",
  {
    headers: {
      "Content-Type": "image/jpeg",
      'Accept': 'application/json'
    },
    method: 'GET',
  })
  .then((response) => {
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
                  style={{width:200, height: 200, borderRadius:15, marginBottom:10}}
                  source={{uri: this.state.Image_URL}}
                />
      <Button  title="Choose Photo" onPress={() => this.handleChoosePhoto()} ></Button>
      <Button  title="Post Chit" onPress={() => this.post_Image_Chit()} ></Button>
    </View>
  </View>
 );
 }
}
export default HomeScreen;
/*
I like to eat banana's because they are good for you, sometimes I eat apples to but I prefer the softness of bananas */