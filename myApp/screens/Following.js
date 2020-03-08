import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator,FlatList ,TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from 'react-native-search-bar';
class Following extends Component{
    // removes the header from the page
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        Following_List:[],
        }
    }

      // function uses 'fetch' to call the api and return a JSON string from the server
  getData(){
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/7/following",
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": "c9a196bf7f9cd7c02f4d90a4504310de"
      },
      method: 'GET'
    })
   .then((response) => response.json())
   .then((responseJson) => {
       this.setState({
       isLoading: false,
       Following_List: responseJson,
     });
     console.log("JSON Results:");
     console.log(responseJson);
   })
   .catch((error) =>{
   console.log(error);
   });
   }
  
// Unfollow Works, need to change the icon into a Unfollow icon
UnFollow(user_id){
  console.log(user_id);
  let unfollow_user = "http://10.0.2.2:3333/api/v0.0.5/user/" +user_id +"/follow";
  console.log(unfollow_user);
  return fetch(unfollow_user,
  {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": "4c6334d91e50abd9871012dcc3ade9ca"
    },
    method: 'delete'
  })
  .then((response) => response.json())
  .then((responseJson) => {
      this.setState({
      isLoading: false,
    });
    console.log("JSON Results:");
    console.log(responseJson);
  })
  .catch((error) =>{
  console.log(error);
  });
  }
//----------
 componentDidMount(){
   this.getData();
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
<View style={{ flex:1, flexDirection:'column', marginBottom:3} }>
<SearchBar
        ref="searchBar"
        placeholder="Search"    
        onChangeText={this.searchFilterFunction}
        autoCorrect={false} 
        //onSearchButtonPress={this.refs.searchBar.unFocus}
/>
<View style={{ flex:1, flexDirection:'row', marginBottom:3} }>
  <FlatList
    data={this.state.Following_List}
    renderItem={({item}) => (

        <View style={{flexDirection: 'row',borderBottomWidth:1, borderBottomColor: 'gray', paddingBottom:5}}>
          <TouchableOpacity onPress={()=> this.LoadScreen(item.user_id)}>
            <Image
                style={{width:70, height: 70, marginTop:10, marginLeft:5}}
                source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
              />
          </TouchableOpacity>
          <View style={{justifyContent:'center', color:'green'}}>
            <Text style={{color:'green', fontSize:16}}> {item.given_name } {item.family_name }</Text> 
            <Text style={{color:'gray'}}> {item.email }</Text> 
          </View>

          <View>
            <TouchableOpacity onPress={()=> this.UnFollow(item.user_id)}>
              <Image
                  style={{width:40, height: 40, marginTop:10, marginLeft:5,alignItems:'flex-end'}}
                  source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                />
            </TouchableOpacity>
          </View>

      </View>
    )}
  />
</View>
</View>
 );
 }
}

/*
<View style={{flex:1, flexDirection: 'row', flexWrap:'wrap'}}>
<Text style={{width: 420, height: 60, backgroundColor: 'orange', fontWeight: 'bold'} }>Following</Text>
<FlatList
data={this.state.Following_List}
renderItem={({item}) => (
  <View>
    <Text>{item.user_id } {item.given_name } {item.family_name }</Text> 
  </View>
)}
/>    
</View>
*/
export default Following;