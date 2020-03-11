import React, { Component } from 'react';
import { Text, View, Button, TextInput} from 'react-native';
class HomeScreen extends Component{
// removes the header from the page
static navigationOptions = {
    header: null
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
          onChangeText={(value) => this.setState({search:value})}
      />
      <Button  title="Post" onPress={() => this.searchUser(this)} ></Button>
    </View>
  </View>
 );
 }
}
export default HomeScreen;