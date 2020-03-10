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
    let result = "http://10.0.2.2:3333/api/v0.0.6/user/"+user

    console.log(result);

    return fetch(result,
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
      this.props.navigation.navigate('selectedUserProfile',{user_id:user_id}); // Late add the user ID from the List of the pressed Icon and add it after '('UserProfile', userid)
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
<View style={{ flex:1, flexDirection:'column', marginBottom:3} }>
      <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
          <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Followers -</Text>
      </View>

      
    <View style={{ flex:1, flexDirection:'row', marginBottom:3} }>
      <FlatList
        data={this.state.Followers_List}
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
  </View>
 );
 }
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flexDirection: 'column', backgroundColor: 'green'
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
    backgroundColor: 'gray',flexDirection: 'row', alignItems:'flex-end',justifyContent:'space-between'
  },
  profilePicture:{
    width:70, height: 70, marginTop:10, marginLeft:5
  },
  userInfo:{
    textAlign:'center', paddingBottom:5
  },
  userInfoID:{
    alignSelf:'flex-start', paddingTop:15, paddingRight:20
  }
});