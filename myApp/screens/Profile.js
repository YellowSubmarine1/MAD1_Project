import React, { Component } from 'react';
import { Text, View, Image, Button, FlatList} from 'react-native';
class HomeScreen extends Component{
// removes the header from the page
static navigationOptions = {
    header: null
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
    recent_Chits: []
    }
}

getData(){
    //console.log(this.props.navigation.state.params.user_id);
    //let result = "http://10.0.2.2:3333/api/v0.0.5/user/"+ this.props.navigation.state.params.user_id;
    let result = "http://10.0.2.2:3333/api/v0.0.5/user/7";
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
      //this.setState{{num_chits: this.state.recent_Chits.length}};
    })
    .catch((error) =>{
    console.log(error);
    });
}

/// Loads page to edit user profile
edituserProfile(user_id)
{
  console.log(user_id)
   this.props.navigation.navigate('EditProfile',{user_id:user_id}); // Late add the user ID from the List of the pressed Icon and add it after '('UserProfile', userid)
}

componentDidMount()
{
  this.getData();
} 

 render(){
 return(
 <View>
   <View style={{flexDirection:'row'}}>
    {/* Styling for the Image*/}
    <View style={{flex:1, marginTop:1, marginLeft:5}}>
      <Image
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        style= {{width:75, height:70, borderRadius:15, marginLeft:5}}
      />
    </View>

    {/* Styling for the Labels*/}
    <View style={{flex:3}}>
        <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:12}}>
            <View style={{alignItems:'center'}}>
              <Text> 20</Text>
              <Text style={{fontSize:10}}> Following</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text> 20</Text>
              <Text style={{fontSize:10}}> Followers</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text> {this.state.num_chits}</Text>
              <Text style={{fontSize:10}}> Chits</Text>
            </View>
        </View>

        {/* Styling for the Button*/}
        <View style={{flexDirection:'row',flex:1,marginLeft:20}}>
            <Button onPress={()=> this.edituserProfile(this.state.user_id)}
             title= 'Edit Profile'>
            </Button>
        </View>
    </View>
  </View>

    <View style={{paddingBottom:10, paddingHorizontal:10, borderBottomWidth:2, borderBottomColor: '#eae5e5'}}>
      <Text style={{fontSize:13}}> {this.state.given_name} {this.state.family_name}</Text>
    </View>

    <FlatList
        data={this.state.recent_Chits}
        renderItem={({item}) => (
          <View>
            <View style={{borderBottomWidth:1, borderBottomColor: 'gray', flexDirection:'row'}}>
              <View style={{flex:1, margin:2, marginLeft:5}}>
                <Image
                      style={{    width:50, height: 50, borderRadius:15}}
                      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                    />
              </View>

              <View style={{flex:3}}>
                <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:2}}>
                    <View style={{alignItems:'center'}}>
                      <Text> {this.state.given_name} {this.state.family_name}</Text>
                      <Text style={{fontSize:10}}> {this.state.email}</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                      <Text style={{fontSize:10}}> {item.timestamp}</Text>
                    </View>

                </View>
                <View style={{backgroundColor:'gray', width:'95%', height: 50, borderRadius:2, marginBottom:3}}>
                      <Text style={{fontSize:10, alignSelf:'center', alignItems:'stretch'}}> {item.chit_content}</Text>
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