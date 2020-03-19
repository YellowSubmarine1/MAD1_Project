import React, { Component } from 'react';
import { Text, View, StyleSheet, Button,TextInput,ActivityIndicator,FlatList ,TouchableOpacity, Image,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from 'react-native-search-bar';
import ActionButton from 'react-native-action-button';
class Following extends Component{
    // removes the header from the page
    static navigationOptions = {
      header: false
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        Following_List:[],
        user_id:'',
        XAuthorization:''
        }
    }

      // function uses 'fetch' to call the api and return a JSON string from the server
  getData(){
    let Results = "http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id+"/following";
    console.log(this.state.user_id);
    return fetch(Results,
    {
      headers: {
        "Content-Type": "application/json",
        //"X-Authorization": "c9a196bf7f9cd7c02f4d90a4504310de"
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
      "X-Authorization":this.state.XAuthorization
    },
    method: 'delete'
  })
  .then((response) => { 
      response.json();
    }) 
  //.then((response) => response.json())
  .then((responseJson) => {
      this.setState({
      isLoading: false,
    });
    console.log("JSON Results: "+ responseJson);
    this.getData(); 
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

// Async Function retrieves the user_id, token of the user current logged in from the Async Storage
_retrieveTokenData = async () => {
  console.log("--------------------Retreive Token--------------------------------");
  try {
    const value = await AsyncStorage.getItem('Token');
    const key2 =JSON.parse(await AsyncStorage.getItem('key2')) ;

    console.log("Token Value is: "+value);
    console.log("User UD Value is: "+key2);

    if (value !== null && key2 !== null) {
      this.setState({XAuthorization:value});
      this.setState({user_id:key2});
      console.log("Recieved Token Value is: "+this.state.XAuthorization);
      console.log("Recieved User UD Value is: "+this.state.user_id);
    }
  } catch (error) {
    // Error retrieving data
  }
  this.getData();
};
 componentDidMount(){
   this._retrieveTokenData()
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
      <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
          <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Following -</Text>
      </View>

      
    <View style={{ flex:1, flexDirection:'row', marginBottom:3} }>
      <FlatList
        data={this.state.Following_List}
        renderItem={({item}) => (
          
            <View>
              <View style={{flexDirection: 'row',borderBottomWidth:1, borderBottomColor: 'gray', paddingBottom:5, backgroundColor:'gray', marginBottom:4}}>
                <View style={{flex:1}}>
                  <TouchableOpacity onPress={()=> this.LoadScreen(item.user_id)}>
                    <Image
                        style={{width:50, height: 50, marginTop:10, marginLeft:5, borderRadius:15}}
                        source={{uri: "http://10.0.2.2:3333/api/v0.0.5/user/"+item.user_id +"/photo"}}
                      />
                  </TouchableOpacity>
                </View>

                <View style={{flex:3}}>  
                  <View style={{justifyContent:'center'}}>
                    <Text style={{color:'green', fontSize:16}}> {item.given_name } {item.family_name }</Text> 
                    <Text style={{color:'white',fontSize:12}}> {item.email }</Text> 
                  </View>
                </View>


                  <TouchableOpacity style={{backgroundColor:'#E91E63', width:60,height:30,borderRadius:20, justifyContent:'center', marginTop:10, marginRight:10 }} onPress={()=> this.UnFollow(item.user_id)}>
                    <Text style={{color:'#fff', fontSize:10,alignSelf:'center'}}>Unfollow</Text>
                  </TouchableOpacity>
              </View>
            </View>
        )}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
    </View>

    <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#3498db' title="Follow Users" onPress={()=> this.props.navigation.navigate('Search_Users')}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
  </View>
 ); 
 }
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
/*
      <View style={{flexDirection:'row-reverse'}}>
        <TouchableOpacity style={{backgroundColor:'#E91E63', width:60,height:60,borderRadius:50, justifyContent:'center' }} onPress={()=> this.props.navigation.navigate('Search_Users')}>
              <Text style={{color:'#fff', fontSize:20,alignSelf:'center'}}>+</Text>
        </TouchableOpacity>   
      </View>


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