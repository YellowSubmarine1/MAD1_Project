import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button , AsyncStorage} from 'react-native';
import { RNCamera } from 'react-native-camera';
class Lab07 extends Component {
 constructor(props){
 super(props);
 }
 storeToken = async(image_url)=>{
  console.log("-----Async Token ------");
  try{
    await AsyncStorage.setItem('image_url',image_url);
    console.log("store Image File:" +image_url);
  }catch(e){}
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
      this.storeToken(data.uri)
      this.props.navigation.navigate('Post_Chits',{image_url:data.url})
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