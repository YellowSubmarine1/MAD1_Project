import React, { Component } from 'react';
import { Text, View, Button, Image,FlatList,TextInput} from 'react-native';
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
    family_name:'',
    given_name:'',
    email:'',
    user_id:''
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
     family_name: responseJson.family_name,
     given_name:responseJson.given_name,
     email: responseJson.email,
     user_id: responseJson.user_id
   });
   console.log("----------------------Results----------------------");
   console.log(responseJson);
   console.log("Search_List Array: "+ this.state.Search_List);
   console.log("Name: "+ this.state.family_name);
 })
 .catch((error) => {
   console.error(error);
 });
}


followUser(user)
{   console.log("----------------------Follow User----------------------");
 console.log(this.state.user_id);
 return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" +this.state.user_id+"/follow",
 {
   headers: {
     "Content-Type": "application/json",
     "X-Authorization": "d54b32ef894aeeaaf16766c347a78a97"
   },
   method: 'POST',
 })
 .then((response) => response.json())
 .then((responseJson) => {
   if(responseJson == 'OK')
   {
     alert("Now Following: "+ this.state.given_name +" "+ this.state.family_name);
   }
     console.log(0,responseJson)
   console.log("----------------------Results----------------------");
   console.log(responseJson);
 })
 .catch((error) => {
   console.error(error);
 });
}

render(){
 return(
  <View>
    <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
      <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Follow User -</Text>
    </View>

    <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
      <Text style={{color:'gray', fontSize:11, width:285}}>Search User using ID:</Text>
      <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8, marginBottom:10}}
          onChangeText={(value) => this.setState({search:value})}
      />
      <Button  title="Search" onPress={() => this.searchUser(this)} ></Button>
    </View>

      <View style={{backgroundColor:'gray', fontSize:11, width:285, alignSelf:'center', marginTop:30, borderRadius:20, padding:10, height:100}}>
        <View>
          <Text>Search Results:</Text>
          <Text style={{color:'red', fontSize:16}} onPress={() => this.followUser()}> {this.state.given_name } {this.state.family_name }</Text> 
        </View>

    </View>
  </View>
 );
 }
}

/*
    <View style={{ flex:1, flexDirection:'row', marginBottom:3} }>
      <FlatList
        data={this.state.Search_List}
        renderItem={({item}) => (
          

            <View style={{flexDirection: 'row',borderBottomWidth:1, borderBottomColor: 'gray', paddingBottom:5, backgroundColor:'gray', marginBottom:4}}>
              <TouchableOpacity onPress={()=> this.LoadScreen(item.user_id)}>
                <Image
                    style={{width:50, height: 50, marginTop:10, marginLeft:5}}
                    source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                  />
              </TouchableOpacity>
              <View style={{justifyContent:'center'}}>
                <Text style={{color:'green', fontSize:16}}> {item.given_name } {item.family_name }</Text> 
                <Text style={{color:'white',fontSize:12}}> {item.email }</Text> 
              </View>
            </View>
        )}
      />
    </View>
*/