import React, { Component } from 'react';
import { Text, View,ActivityIndicator,FlatList,Image,TouchableOpacity,StyleSheet, AsyncStorage } from 'react-native';
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
        XAuthorization:'',
        isVisible: false,
        refreshing: false,
        seed:1,
        page:1,
 
        }
    }
// Async Function is used to retrieve the Authorization Token for the current user and the value to Whether or not to display the Action-Bar
_retrieveTokenData = async () => {
  console.log("--------------------Retreive Token--------------------------------");
  try {

    // Retrieves the Token and Display_Content variable from async storage and then stores them in state variables.
    const value = await AsyncStorage.getItem('Token');
    // Retrieves the value to Whether or not to display the Action-Bar
    const value2 = await AsyncStorage.getItem('display_content');
    if (value !== null && value2 !== null) { 
      this.setState({XAuthorization:value,isVisible:value2});
      console.log("Recieved Token Value is: "+this.state.XAuthorization);
      console.log("Recieved Display Value 2 is: "+this.state.isVisible);
      this.getData();
    }
  } catch (error) {
    // Error retrieving data
  }
};

// Function used to get all the Chits that have been published from the Server
  getData()
  {
    console.log("Current Display_Content Value 1 is: "+this.state.isVisible);
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
       refreshing: false
     });
     console.log("JSON Results:");
     console.log(this.state.Chits_List);
   })
   .catch((error) =>{
   console.log(error); 
  this.setState({isLoading:false,refreshing:false})
   });
  }

// Whenever a User Profile Image is selected, their Profile page is loaded with the user_id of the selected user being sent to the 'selectedUserProfile' page.
LoadScreen(user_id)
{
   console.log(user_id);
   this.props.navigation.navigate('selectedUserProfile',{user_id:user_id});
}
// Logout Function is used to logout the current user
logout_User()
{
    return fetch("http://10.0.2.2:3333/api/v0.0.5/logout",
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": this.state.XAuthorization
      },
      method: 'POST',
    })
    .then((response) => {
     console.log("Res:" + JSON.stringify(response));
     console.log("Res status:" + JSON.stringify(response.status));
     console.log("Res ok?:" + JSON.stringify(response.ok));

     // If the server response if 200, then the user will be redirected to the Login Page
    if(JSON.stringify(response.status) == 200)
    {
      this.props.navigation.navigate('Login');
    }
    else if(JSON.stringify(response.status) === 401)
    {
      console.log("Failed to Logout");
    }
   })
  .catch((error) =>{
      console.log(error);
    });
}

// Function is used to refresh the page whenever the user pulls down the gethData function is run again returning the most recent chits.
handleRefresh=()=>{
  this.setState({
    page:1,
    refreshing:true,
    seed:this.state.seed+1
  }, ()=>{
    this.getData();
  });
}
 componentDidMount(){
   console.log("--------------- Chits ----------------")
   this._retrieveTokenData();
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
            <TouchableOpacity onPress={()=> this.LoadScreen(item.user.user_id)}>
              <Image
                    style={{width:50, height: 50, borderRadius:15}}
                    source={{uri: "http://10.0.2.2:3333/api/v0.0.5/user/"+item.user.user_id +"/photo" +'?' + new Date()}}
              />
            </TouchableOpacity>
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
    refreshing={this.state.refreshing}
    onRefresh={this.handleRefresh}
  />
</View>

  {
        // Display the content in screen when state object "content" is true.
        // Hide the content in screen when state object "content" is false. 
        this.state.isVisible ? <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#3498db' title="Logout" onPress={() => this.logout_User()}>
          <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Post Chits" onPress={() => this.props.navigation.navigate('Post_Chits')}>
          <Icon name="md-done-all" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Saved Chit Drafts" onPress={() => this.props.navigation.navigate('Saved_Chits_Drafts')}>
          <Icon name="md-done-all" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="View Chit Photo" onPress={() => this.props.navigation.navigate('Display_Chit_Pictures')}>
          <Icon name="md-done-all" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton> : null
      }
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