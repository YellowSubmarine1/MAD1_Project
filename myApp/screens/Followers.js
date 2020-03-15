import React, { Component } from 'react';
import { Text, View,ActivityIndicator,FlatList, StyleSheet, Image,TouchableOpacity, AsyncStorage } from 'react-native';
import SearchBar from 'react-native-search-bar';
export default class FollowersScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
      header: false
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        Followers_List:[],
        User_Selected: [],
        search: '',
        user_id:''
        }
    }

    updateSearch = search => {
      this.setState({ search });
    };
  // function uses 'fetch' to call the api and return a JSON string from the server
  getData(){
   return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id +"/followers",
   {
     headers: {
       "Content-Type": "application/json"
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
     console.log(this.state.Followers_List);
   })
   .catch((error) =>{
   console.log(error);
   });
   }

   LoadScreen(user_id)
   {
      console.log(user_id);
      this.props.navigation.navigate('selectedUserProfile',{user_id:user_id}); // Late add the user ID from the List of the pressed Icon and add it after '('UserProfile', userid)
   }

   _retrieveTokenData = async () => {
    console.log("--------------------Retreive Token--------------------------------");
    try {
      const key2 =JSON.parse(await AsyncStorage.getItem('key2')) ;

      if (key2 !== null) {
        this.setState({user_id:key2});
  
        console.log("Recieved User UD Value is: "+this.state.user_id);
      }
    } catch (error) {
      // Error retrieving data
    }
    this.getData();
  };

   componentDidMount(){
     console.log("------- Followers Page -------");
    this._retrieveTokenData();
    //this.getData();
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
      <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
          <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Followers -</Text>
      </View>

      
    <View style={{ flex:1, flexDirection:'row', marginBottom:3} }>
      <FlatList
        data={this.state.Followers_List}
        keyExtractor ={ item => item.user_id}
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
        keyExtractor={(item, index) => {
          return item.id;
        }}
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