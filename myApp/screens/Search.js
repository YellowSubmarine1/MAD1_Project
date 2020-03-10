import React, { Component } from 'react';
import { Text, View, Button, Image,ActivityIndicator,TextInput} from 'react-native';
export default class SearchScreen extends Component{
// removes the header from the page
static navigationOptions = {
    header: null
   }
   constructor(props){
    super(props);
    this.state ={
    isLoading: true,
    Search_List:[],
    search: '',
    }
}

searchUser()
{
 console.log(this.state.search);
 return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" +this.state.search,
 {
   headers: {
     "Content-Type": "application/json",
     "X-Authorization": "4c6334d91e50abd9871012dcc3ade9ca"
   },
   method: 'GET',
 })
 .then((response) => response.json())
 .then((responseJson) => {
     console.log(0,responseJson)
     this.setState({
     isLoading: false,
     Search_List: responseJson,
   });
   console.log(responseJson);
 })
 .catch((error) => {
   console.error(error);
 });
}

render(){
 return(
  <View>
      <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
          <Text style={{color:'gray', fontSize:11, width:285}}>Search User</Text>
          <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8, marginBottom:10}}
              onChangeText={(value) => this.setState({search:value})}
              //value={this.state.Given_Name}
          />
          <Button  title="Search" onPress={() => this.searchUser(this)} ></Button>
      </View>
   </View>
 );
 }
}