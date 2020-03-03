import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator,FlatList, StyleSheet, Image,TouchableOpacity,createBottomTabNavigator } from 'react-native';

export default class HomeScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        Followers_List:[],
        User_Selected: []
        }
    }

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
     });
     console.log("JSON Results:");
     console.log(responseJson);
   })
   .catch((error) =>{
   console.log(error);
   });
   }
  

 //  <View>
//   <Text>{item.user_id } {item.given_name } {item.family_name }</Text> 
 //</View>

 //  <View style={{
 // flex: 1,
//  flexDirection: 'column'
//}}>
 //     <Text style={{width: '100%', height: '12%', backgroundColor: 'orange', fontWeight: 'bold'} }>Followers</Text>
 //     <FlatList
 //     data={this.state.Followers_List}
 //     renderItem={({item}) => (
 //       <View style={{width: '45%' , height: '25%', backgroundColor: 'powderblue'}} />
 //     )}
 //   />    
 // </View>

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

   //                 <Text style={{textAlign:'center', paddingTop:'15%',marginLeft:40, fontSize:17}} > {item.given_name } {item.family_name }</Text>
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
    <View style={styles.container }>
      <Text style={styles.title }>Followers</Text>
        <FlatList
          data={this.state.Followers_List}
          renderItem={({item}) => ( 
              <View style={styles.flatListContainer} >
                <TouchableOpacity onPress={()=> this.LoadScreen(item.user_id)}>
                  
                  <Image
                      style={styles.profilePicture}
                      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                    />
                </TouchableOpacity>

                <Text style={styles.userInfo} > {item.given_name } {item.family_name }</Text> 
                <Text style={styles.userInfoID} > {item.user_id }</Text> 
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