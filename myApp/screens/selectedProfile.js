import React, { Component } from 'react';
import { Text, View, FlatList,Image} from 'react-native';
class HomeScreen extends Component{
// removes the header from the page
static navigationOptions = {
  header: false
   }
   
   constructor(props){
    super(props);
    this.state ={
    isLoading: true,
    User_Profile: [],
    user_id:'',
    family_name:'',
    given_name:'',
    email:'',
    num_chits:'',
    recent_Chits: [],
    Following:'',Followers:''
    }
}

// Returns all the details of the selected user from the Flatlist in the Following, Chits, Followers and Search page.
getData(){
    let result = "http://10.0.2.2:3333/api/v0.0.5/user/"+ this.props.navigation.state.params.user_id; // retreives the user_id
    console.log('Get Request');
    console.log(result);
    return fetch(result,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // The returned user details of the current user_id and saves them on state variables.
        this.setState({
        isLoading: false,
        User_Profile: responseJson,
        family_name:responseJson.family_name,
        given_name:responseJson.given_name,
        recent_Chits: responseJson.recent_chits,
        email: responseJson.email,
        num_chits: responseJson.recent_chits.length,
        user_id: responseJson.user_id
      });
      console.log("JSON Results:");
      console.log(responseJson);

      console.log("recent_Chits:");
      console.log(this.state.recent_Chits);

      console.log("Number of Chits:");
      console.log(this.state.num_chits);

      console.log("User ID:");
      console.log(this.state.user_id);
      // Calls the getFollowers & getFollowing function which returns all the followers and following list for this user_id
      this.getFollowers();
      this.getFollowing();
    })
    .catch((error) =>{
    console.log(error);
    });
    }

// This function uses the User_ID of the selected user and then returns all the followers of that user in an array,
// stores the number of followers for this user which are then displayed on the page.
    getFollowers(){
      let input = "http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id + "/followers";
      console.log('Request: ');
      console.log(input);

      return fetch(input,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
          isLoading: false,
          Followers: responseJson.length // the number of user's in the array are stored
        });
        console.log("JSON Results:");
        console.log(responseJson);

        console.log("Followers:");
        console.log(this.state.Followers);
        console.log("__________________________________");
      })
      .catch((error) =>{
      console.log(error);
      });
      }

// This function uses the User_ID of the selected user and then returns all the users the selected user_id follows in an array,
// it stores the number of people this user is following and displays them on the page.

      getFollowing(){
        let input = "http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id + "/following";
              console.log('Request: ');
      console.log(input);
        return fetch(input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            isLoading: false,
            Following: responseJson.length  // the number of user's in the array are stored
          });
          console.log("JSON Results:");
          console.log(responseJson);

          console.log("Following:");
          console.log(this.state.Following);
          console.log("__________________________________");
        })
        .catch((error) =>{
        console.log(error);
        });
        }

    componentDidMount(){
        console.log("Selected Profile Page Reached:");
        console.log("UserID:" +this.props.navigation.state.params.user_id);
        this.getData();
       } 

 render(){
 return(
<View>
  <View style={{flexDirection:'row',paddingTop:3, backgroundColor:'#ced6df'}}>
    {/* Styling for the Image*/}
    <View style={{flex:1, marginTop:10, marginLeft:5}}>
      <Image
        source={{uri: "http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id +"/photo" +'?' + new Date()}}
        style= {{width:75, height:70, borderRadius:15, marginLeft:5}}
      />
    </View>

    {/* Styling for the Labels*/}
    <View style={{flex:3,marginTop:50, flexDirection:'row-reverse'}}>
        <View style={{flexDirection: 'row', justifyContent:'space-evenly'}}>
            <View style={{alignItems:'center'}}>
              <Text>{this.state.Following}</Text>
              <Text style={{fontSize:10}}> Following</Text>
            </View>
            <View style={{alignItems:'center',marginLeft:15}}>
              <Text>{this.state.Followers}</Text>
              <Text style={{fontSize:10}}> Followers</Text>
            </View>
        </View>
    </View>
  </View>

    <View style={{paddingBottom:10, paddingHorizontal:10, borderBottomWidth:2, borderBottomColor: '#fff1d0', backgroundColor:'#d4dfce'}}>
      <Text style={{fontSize:13, fontWeight:'bold'}}> {this.state.given_name} {this.state.family_name}</Text>
      <Text style={{fontSize:10}}> {this.state.email}</Text>
    </View>


  <FlatList
    data={this.state.recent_Chits}
    renderItem={({item}) => (
      
      <View style={{backgroundColor:'#9CCAE8',borderBottomWidth:1, borderBottomColor: '#ddd'}}>
        <View style={{ flexDirection:'row', borderRadius:20}}>
          <View style={{flex:1, margin:2, marginLeft:5}}>
            <Image
                  style={{width:40, height: 40, borderRadius:15}}
                  source={{uri: "http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id +"/photo" +'?' + new Date()}}
                />
          </View>

          <View style={{flex:3}}>
            <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:2}}>
                <View>
                <Text> {this.state.given_name} {this.state.family_name}</Text>
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
    keyExtractor={i => i.id}
  />
 </View>
 );
 }
}
export default HomeScreen;