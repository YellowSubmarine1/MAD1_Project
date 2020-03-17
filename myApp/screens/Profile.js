import React, { Component } from 'react';
import { Text, View, Image, Button, FlatList,ActivityIndicator} from 'react-native';
import { AsyncStorage } from 'react-native';
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
    Following:'',Followers:'',
    XAuthorization: '',
    Image_URL:''
    }
}

getData(id,authuorization){
    console.log("__________________________________");
    console.log("user_id: "+ this.state.user_id)
    let result = "http://10.0.2.2:3333/api/v0.0.5/user/"+ this.state.user_id;
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
        user_id: responseJson.user_id,
        XAuthorization: authuorization
      });
      this.getFollowers();
      this.getFollowing();
      this.Get_Image();
      console.log("User's Name:");
      console.log(this.state.given_name);

      console.log("JSON Results:");
      console.log(responseJson);

      console.log("recent_Chits:");
      console.log(this.state.recent_Chits);

      console.log("Number of Chits:");
      console.log(this.state.num_chits);

      console.log("User ID:");
      console.log(this.state.user_id);

    })
    .catch((error) =>{
    console.log(error);
    });
}

/// Loads page to edit user profile
edituserProfile()
{
   this.props.navigation.navigate('Edit_User_Profile',{user_id:this.state.user_id, XAuthorization:this.state.XAuthorization}); // Late add the user ID from the List of the pressed Icon and add it after '('UserProfile', userid)
}


Get_Image()
{
  return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id+"/photo",
  {
    headers: {
      "Content-Type": "mage/png",
      'Accept': 'application/json'
    },
    method: 'GET',
  })
  .then((response) => {
   // response.json()
    console.log(response)
    console.log(response.url)
    this.setState({
      isLoading: false,
      server_response: response.status,
      Image_URL:response.url    
    });
  })
  .catch((error) =>{
    console.log(error);
    })
}

getFollowers(){
  let input = "http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id + "/followers";
  console.log('Request: '+input);

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
      Followers: responseJson.length
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
        Following: responseJson.length
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

  _retrieveTokenData = async () => {
    console.log("--------------------Retreive Token--------------------------------");
    try {
      const value = await AsyncStorage.getItem('Token');
      const key2 =JSON.parse(await AsyncStorage.getItem('key2')) ;
      if (value !== null && key2 !== null) {
        console.log("Post_Chits Retreived Token: "+value);
        this.setState({XAuthorization:value});
        this.setState({user_id:key2});
  
        console.log("Recieved Token Value is: "+this.state.XAuthorization);
        console.log("Recieved User UD Value is: "+this.state.user_id);
        this.getData(this.state.user_id, this.state.XAuthorization)
      }
    } catch (error) {
      // Error retrieving data
    }
  };


componentDidMount()
{
  //console.log("-------------------------------------------------------------------------");
  this._retrieveTokenData();
  console.log('User_ID:'+ this.state.user_id);
  this.getData(this.props.navigation.state.params.user_id,this.props.navigation.state.params.XAuthorization);
} 

 render(){
  if(this.state.isLoading){
    return(
    <View>
      <ActivityIndicator/>
    </View>
    )} 
 return(
  <View>
    <View style={{flexDirection:'row',paddingTop:3, backgroundColor:'#ced6df'}}>
      {/* Styling for the Image*/}
      <View style={{flex:1, marginTop:10, marginLeft:5}}>
        <Image
          source={{uri: this.state.Image_URL}}
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
  
                {/* Styling for the Button*/}
        <View style={{flexDirection:'row',flex:1,marginLeft:20}}>
              <Button onPress={()=> this.edituserProfile()}
               title= 'Edit Profile'>
              </Button>
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
                    style={{width:50, height: 50, borderRadius:15}}
                    source={{uri: this.state.Image_URL}}
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
      keyExtractor={(item, index) => {
        return item.id;
      }}
    />
   </View>
 );
 }
}
export default HomeScreen;

/*
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
                  <Text style={{fontSize:9}}>{item.user.given_name} {item.user.family_name}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:9}}> {item.timestamp}</Text>
                </View>
            </View>

            <View style={{backgroundColor:'#9CCAE8', width:'95%', height:'auto', borderRadius:2, marginBottom:3}}>
                  <Text style={{fontSize:10, alignSelf:'auto', alignItems:'stretch'}}> {item.chit_content}</Text>
            </View>

        </View>
      </View>
    </View>
    )}
    keyExtractor={i => i.id}
  />
*/
