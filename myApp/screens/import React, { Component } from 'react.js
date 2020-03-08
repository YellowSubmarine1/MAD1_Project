import React, { Component } from 'react';
import { Text, View,ActivityIndicator,FlatList, StyleSheet, Image,TouchableOpacity, Button } from 'react-native';
import SearchBar from 'react-native-search-bar';
export default class FollowersScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        Followers_List:[],
        User_Selected: [],
        search: '',
        }
    }

    updateSearch = search => {
      this.setState({ search });
    };
  // function uses 'fetch' to call the api and return a JSON string from the server
  getData(){
   return fetch("http://10.0.2.2:3333/api/v0.0.5/user/7/followers",
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
       Followers_List: responseJson,
       User_Selected: responseJson
     });
     console.log("JSON Results:");
     console.log(responseJson);
   })
   .catch((error) =>{
   console.log(error);
   });
   }

   componentDidMount(){
    this.getData();
   } 
 // Loads the profile of the user selected 
 userProfile(user)
   {
    let result = "http://10.0.2.2:3333/api/v0.0.5/user/"+user

    console.log(result);

    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+user,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": "c9a196bf7f9cd7c02f4d90a4504310de"
      },
      method: 'GET',
    })
    .then((response) => response.json())
   .then((responseJson) => {
       this.setState({
       isLoading: false,
       User_Selected: responseJson,
     });
     console.log("JSON Results:");
     console.log(responseJson);
   })
   .catch((error) =>{
   console.log(error);
   });
   }

   LoadScreen(user_id)
   {
     console.log(user_id)
      this.props.navigation.navigate('UserProfile',{user_id:user_id}); // Late add the user ID from the List of the pressed Icon and add it after '('UserProfile', userid)
   }

   searchFilterFunction = text => { 
    console.log(text)   
   const newData = this.state.Followers_List.filter(item => {      
     const itemData = `${item.given_name}   
     ${item.given_name.toUpperCase()}`;
      const textData = text;
      return itemData.indexOf(textData) > -1;    
   });
   this.setState({ Followers_List: newData });  
   console.log(this.state.Followers_List)  
 };

 render(){
   if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator/>
        </View>
      )
    }
 return(
    <View style={{ flex:1, flexDirection:'row', marginBottom:3} }>
      <SearchBar
        placeholder="Type Here..."
        //onChangeText={this.updateSearch}
        //value={search}
      />
        <FlatList
          data={this.state.Followers_List}
          renderItem={({item}) => (
              <View style={{flexDirection: 'row',borderBottomWidth:1, borderBottomColor: 'gray'}}>
                <TouchableOpacity onPress={()=> this.LoadScreen(item.user_id)}>
                  <Image
                      style={styles.profilePicture}
                      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                    />
                </TouchableOpacity>
                <View style={{justifyContent:'center', color:'green'}}>
                  <Text style={{color:'green', fontSize:16}}> {item.given_name } {item.family_name }</Text> 
                  <Text style={{color:'gray'}}> {item.email }</Text> 
                </View>
            </View>
          )}
      />
    </View>
 );
 }
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  title: {
    fontSize: 19,
    width: '100%', height: '10%', backgroundColor: 'orange', fontWeight: 'bold', textAlign:'center',padding:12
  },
  activeTitle: {
    color: 'red',
    display: 'flex'
  },
  flatListContainer:{
    backgroundColor: 'gray',flexDirection: 'row', alignItems:'flex-end',justifyContent:'space-between',borderBottomWidth:1, borderBottomColor: 'gray'
    
  },
  profilePicture:{
    width:60, height: 60, margin:5, borderRadius:25
  },
  userInfo:{
    textAlign:'center', paddingBottom:5
  },
  userInfoID:{
    alignSelf:'flex-start', paddingTop:15, paddingRight:20
  }
});


<FlatList
data={this.state.recent_Chits}
renderItem={({item}) => (
  <View style={{borderBottomWidth:1, borderBottomColor: 'gray'}}>
     <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:12}}>
        <View>
          <Text> {this.state.given_name} {this.state.family_name}</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Text> 20</Text>
          <Text style={{fontSize:10}}> {item.timestamp}</Text>
        </View>
  </View>
    <Text style={{marginLeft:5}}>{this.state.given_name} {this.state.family_name}</Text>
    <Text style={{marginLeft:5}}>{item.user_id } {item.chit_content}</Text> 
  </View>
)}
keyExtractor={i => i.id}
/>