import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button , AsyncStorage, Alert} from 'react-native';
import { RNCamera } from 'react-native-camera';
class Lab07 extends Component {
 constructor(props){
  super(props);
  this.state ={
  isLoading: true,
  server_response:'',
  Image_URL:'',
  XAuthorization:'',
  user_id:''
  }
 }
_retrieveTokenData = async () => {
  console.log("--------------------Retreive Token--------------------------------");
  try {
    const value = await AsyncStorage.getItem('Token');
    const key2 =JSON.parse(await AsyncStorage.getItem('key2')) ;
    if (value !== null && key2 !== null) {
      console.log("Post_Chits Retreived Token: "+value);
      this.setState({XAuthorization:value});
      this.setState({user_id:key2});

      console.log("Recieved Token Value is: "+this.state.XAuthorization);
      console.log("Recieved User UD Value is: "+this.state.user_id);
      this.getData(this.state.user_id, this.state.XAuthorization)
    }
  } catch (error) {
    // Error retrieving data
  }
};


componentDidMount()
{
//console.log("-------------------------------------------------------------------------");
this._retrieveTokenData();
console.log('User_ID:'+ this.state.user_id);
} 

 render() {
  return (
    <View style={styles.container}>
      <RNCamera
       ref={ref => {this.camera = ref; }}
       style={styles.preview}
      />
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', paddingTop:13 , paddingBottom:3}}>
      <Button  title="Take Picture"  onPress={this.takePicture.bind(this)}  /> 
      </View>
    </View>
  );
 }
  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState({Image_URL: data.uri})

      console.log("Image URL: "+ this.state.Image_URL)
      console.log("UserID: "+ this.state.user_id)
      console.log("X-Authorization Token: "+ this.state.XAuthorization)
      return fetch("http://10.0.2.2:3333/api/v0.0.5/chits/"+this.state.user_id+"/photo",
      {
        headers: {
          "Content-Type": "image/jpeg",
          "X-Authorization":this.state.XAuthorization
    
        },
        method: 'POST',
        body: data
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
  };
}
const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column' },
  preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  capture: { flex: 0, borderRadius: 5, padding: 15, paddingHorizontal: 20,
  alignSelf: 'center', margin: 20, }
});
export default Lab07