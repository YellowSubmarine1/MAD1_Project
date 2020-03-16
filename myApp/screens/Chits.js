import React, { Component } from 'react';
import { Text, View,ActivityIndicator,FlatList,Image,TouchableOpacity,StyleSheet, AsyncStorage } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
class HomeScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
      header:()=> false
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        Given_Name:'',
        Family_Name:'',
        Email:'',
        Chits_List: [],
        Recent_Chits:[],

        user_id:'',
        XAuthorization:''
        }
    }

      // function uses 'fetch' to call the api and return a JSON string from the server
  getData()
  {
    let search = "http://10.0.2.2:3333/api/v0.0.5/chits";
    console.log("All Chits:");
    console.log(search);
   return fetch(search,
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
       Chits_List: responseJson,
       Recent_Chits: responseJson.recent_chits,
     });
     console.log("JSON Results:");
     console.log(this.state.Chits_List);
   })
   .catch((error) =>{
   console.log(error);
   });
   }
  
   // Logout
   logout_User()
   {

    return fetch("http://10.0.2.2:3333/api/v0.0.5/logout",
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": this.state.XAuthorization
      },
      method: 'POST',
      //body: result
    })
    .then((response) => {
     console.log("Res:" + JSON.stringify(response));
     console.log("Res status:" + JSON.stringify(response.status));
     console.log("Res ok?:" + JSON.stringify(response.ok));
     //this.setState({
     //  server_response: response.status,
    // });
    if(JSON.stringify(response.status) == 200)
    {
      this.props.navigation.navigate('Login');
    }
    else if(JSON.stringify(response.status) == 401)
    {
      console.log("Please Login")
    }
     //return response.json()
   })
 /*    .then((responseJson) => {
         console.log("----------------------Results----------------------");
         console.log("Response: "+responseJson)
         console.log("Response Status: "+this.state.server_response)
         if(this.state.server_response == 200)
         {
           this.props.navigation.navigate('Login');
         }
         elseif(this.state.server_response == 401)
         {
           console.log("Please Login")
         }
    })*/
    .catch((error) =>{
     console.log(error);
     })
   }
   _retrieveTokenData = async () => {
    console.log("--------------------Retreive Token--------------------------------");
    try {
      const value = await AsyncStorage.getItem('Token');
      if (value !== null) {
        console.log("Post_Chits Retreived Token: "+value);
        this.setState({XAuthorization:value});
        console.log("Recieved Token Value is: "+this.state.XAuthorization);
        //this.getData();
      }
    } catch (error) {
      // Error retrieving data
    }
  };
 componentDidMount(){
   this._retrieveTokenData();
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
      <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Chits -</Text>
  </View>
  
<View style={{ flex:1, flexDirection:'row', marginBottom:3} }>
  <FlatList
    data={this.state.Chits_List}
    renderItem={({item}) => (
      
      <View style={{backgroundColor:'#9CCAE8',borderBottomWidth:1, borderBottomColor: '#ddd'}}>
        <View style={{ flexDirection:'row', borderRadius:20}}>
          <View style={{flex:1, margin:2, marginLeft:5}}>
            <Image
                  style={{width:40, height: 40, borderRadius:15}}
                  source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                />
          </View>

          <View style={{flex:3}}>
            <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:2}}>
                <View>
                  <Text style={{fontSize:10, fontWeight:'bold'}}>{item.user.given_name} {item.user.family_name}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:9}}> {item.timestamp}</Text>
                </View>
            </View>

            <View style={{backgroundColor:'#9CCAE8', width:'95%', height:50, borderRadius:2, marginBottom:3}}>
                  <Text style={{fontSize:10, alignSelf:'auto', alignItems:'stretch'}}> {item.chit_content}</Text>
            </View>

        </View>
      </View>
    </View>
    )}
    keyExtractor={(item, index) => {
      return item.id;
    }}
  />
</View>

<ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#3498db' title="Logout" onPress={() => this.logout_User()}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Post Chits" onPress={() => this.props.navigation.navigate('Post_Chits')}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
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
export default HomeScreen;