import React, { Component } from 'react';
import { Text, View, Button, Image,FlatList,TextInput,AsyncStorage,TouchableOpacity} from 'react-native';
export default class SearchScreen extends Component{
// removes the header from the page
static navigationOptions = {
    header: false
   }
   constructor(props){
    super(props);
    this.state ={
    isLoading: true,
    Search_List:[],
    search: '',
    family_name:'',
    given_name:'',
    email:'',
    user_id:'',
    Authorization:'',
    server_response:'',
    content: false
    }
}

searchUser()
{
  let user_search= "http://10.0.2.2:3333/api/v0.0.5/search_user/?q=" +this.state.search;
 console.log("Search Query: "+user_search);
 return fetch(user_search,
 {
   headers: {
     "Content-Type": "application/json",
   },
   method: 'GET',
 })
 //.then((response) => response.json())
 .then((response) => {
  this.setState({
    server_response: response.status
  });
  console.log("res: "+response)
  console.log("Res:" + JSON.stringify(response));
  console.log("Res status:" + JSON.stringify(response.status));
  console.log("Res ok?:" + JSON.stringify(response.ok));
  return response.json()})
 .then((responseJson) => {
     this.setState({
     isLoading: false,
     Search_List: responseJson,
     //family_name: responseJson.family_name,
     //given_name:responseJson.given_name,
    // email: responseJson.email,
    // user_id: responseJson.user_id
   });
   console.log("----------------------Results----------------------");
   console.log("Response Status: "+this.state.server_response)
   console.log("Response Results: "+responseJson)

   console.log("Name: "+ this.state.given_name +" " +this.state.family_name);
   if(this.state.server_response == 200)
   {
    alert("User Found: "+ this.state.given_name +" "+ this.state.family_name);
  }   else if (this.state.server_response === 404){
    alert("It didn't Work");
    console.log("Follow attempt failed");
  }
})
.catch((error) =>{
 console.log(error);
 })
}

getData(){
  let user_search= "http://10.0.2.2:3333/api/v0.0.5/search_user/?q=" +this.state.search;
 console.log("Search Query: "+user_search);
  return fetch(user_search,
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
     Search_List: responseJson,
   });
   console.log("JSON Results:");
   console.log(responseJson);
 })
 .catch((error) =>{
 console.log(error);
 });
 }

followUser(current_user_id)
{   console.log("----------------------Follow User----------------------");
 console.log(current_user_id);
 return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" +current_user_id+"/follow",
 {
   headers: {
     "Content-Type": "application/json",
     "X-Authorization": this.state.Authorization
   },
   method: 'POST',
 })
 .then((response) => {
  response.json()
  this.setState({
    server_response: response.status
  });
  console.log("Server Full Response:"+response);
  console.log("Server Response:"+ this.state.server_response);
  console.log("Res:" + JSON.stringify(response));
  console.log("Res status:" + JSON.stringify(response.status));
  console.log("Res ok?:" + JSON.stringify(response.ok));
  //return response.json()
})
  .then((responseJson) => {

      console.log("----------------------Results----------------------");
      console.log("Response Status: "+this.state.server_response)
      console.log("Response Status: "+responseJson)
      //alert("Now Following User ");
      if(this.state.server_response == 200)
      {
        alert("Now Following: "+ this.state.given_name +" "+ this.state.family_name);
        this.props.navigation.navigate('Following');
      }
      else if (this.state.server_response === 400){
        alert("Already following "+this.state.given_name +" "+ this.state.family_name);
        console.log("Follow attempt failed");
      }
 })
 .catch((error) =>{
  console.log(error);
  })
}

LoadScreen(user_id)
{
   console.log(user_id)
   this.props.navigation.navigate('selectedUserProfile',{user_id:user_id}); // Late add the user ID from the List of the pressed Icon and add it after '('UserProfile', userid)
}
_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('Token');
    if (value !== null) {
      // We have data!!
      console.log("Post_Chits Retreived Token: "+value);
      this.setState({Authorization:value});

      console.log("Token Value is: "+this.state.Authorization);
    }
  } catch (error) {
    // Error retrieving data
  }
};
componentDidMount(){
  console.log("---------  Search Profile --------------")
  this._retrieveData();
 }

render(){
 return(
  <View>
    <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
      <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Follow User -</Text>
    </View>

    <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
      <Text style={{color:'gray', fontSize:11, width:285}}>Search User:</Text>
      <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8, marginBottom:10}}
          onChangeText={(value) => this.setState({search:value})}
      />
      <Button  title="Search" onPress={() => this.getData(this)} ></Button>
    </View>

      <View style={{backgroundColor:'gray', fontSize:11, width:'98%', height:'58%', alignSelf:'center', marginTop:30, borderRadius:20, padding:10}}>
        <FlatList
          data={this.state.Search_List}
          keyExtractor ={ item => item.user_id}
          renderItem={({item}) => (
            
            <View>
              <View style={{flexDirection: 'row',borderBottomWidth:1, borderBottomColor: 'white', paddingBottom:5, backgroundColor:'gray', marginBottom:4}}>
              <View style={{flex:1}}>
                  <TouchableOpacity onPress={()=> this.LoadScreen(item.user_id)}>
                    <Image
                        style={{width:50, height: 50, marginTop:10, marginLeft:5, borderRadius:15}}
                        source={{uri: "http://10.0.2.2:3333/api/v0.0.5/user/"+item.user_id +"/photo"}}
                      />
                  </TouchableOpacity>
                </View>

                <View style={{flex:3, alignSelf:'center'}}>  
                  <View style={{justifyContent:'center'}}>
                    <Text style={{color:'green', fontSize:12}}> {item.given_name } {item.family_name }</Text> 
                    <Text style={{color:'white',fontSize:12}}> {item.email }</Text> 
                  </View>
                </View>

                {
        // Display the content in screen when state object "content" is true.
        // Hide the content in screen when state object "content" is false. 
        this.state.content ?  <TouchableOpacity style={{backgroundColor:'#E91E63', width:60,height:30,borderRadius:20, justifyContent:'center', alignSelf:'center' }} onPress={()=> this.followUser(item.user_id)}>
        <Text style={{color:'#fff', fontSize:10,alignSelf:'center'}}>Follow</Text>
      </TouchableOpacity> : null
      }
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

/*

      <View style={{backgroundColor:'gray', fontSize:11, width:285, alignSelf:'center', marginTop:30, borderRadius:20, padding:10, height:100}}>
        <View>
          <Text>Search Results:</Text>
          <Text style={{color:'red', fontSize:16}} onPress={() => this.followUser()}> {this.state.given_name } {this.state.family_name }</Text> 
        </View>
        
    <View style={{ flex:1, flexDirection:'row', marginBottom:3} }>
      <FlatList
        data={this.state.Search_List}
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


     .then((response) => {
      return response.json()
   .then((responseJson) => {
    this.setState({
      XAuthorization: responseJson.token,
      user_id : responseJson.id
    });
     console.log("----------------------Results----------------------");
     console.log("Response Status: "+response.status)
     //console.log("Returned :"+responseJson);
     if(response.status == 200)
     {
      console.log("ID: "+responseJson.id);
      console.log("Authorization: "+ responseJson.token);
      this.storeToken(responseJson.token, responseJson.id); // set the Authorization token
      this.props.navigation.navigate('HomePage',{user_id:this.state.user_id,XAuthorization: this.state.XAuthorization});
     }
     else if (responseJson === 400){
       alert("Incorrect Email or Password, try again");
       console.log("Incorrect Email or Password");
     }
   })
  })}
*/