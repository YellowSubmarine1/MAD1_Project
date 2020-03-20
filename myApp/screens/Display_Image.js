import React, { Component } from 'react';
import { Text, View, Button, AsyncStorage, ActivityIndicator,Image} from 'react-native';
class Display_Chit_Images extends Component{
// removes the header from the page
static navigationOptions = {
    header: false
   }
  
   constructor(props){
    super(props);
    this.state ={
    isLoading: true,
    server_response:'',
    Image_URL:'',
    user_id:''
    }
}

  // Async Function retrieves the user_id, token and the array used to store the chit Drafts for the current user from Async Storage
  _retrieveTokenData = async () => {
    console.log("--------------------Retreive Chits Drafts--------------------------------");
    try {
      const U_ID =JSON.parse(await AsyncStorage.getItem('key2')) ;  // gets the user_id of the current user
      console.log("User_ID:"+U_ID)
      // Checks to see that the 'retreived_chit_drafts' array isnt null and contains chit drafts, that the token and user_id are not null before assigning them to a state variable 
      if (U_ID !== null) {
        this.setState({
          user_id:U_ID
        });
        console.log("Key for Chit Drafts:"+this.state.user_id )
      }
      return fetch("http://10.0.2.2:3333/api/v0.0.5/user/7/photo",
      {
        headers: {
          "Content-Type": "image/png",
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
          Image_URL:response.url    
        });
      })
      .catch((error) =>{
        console.log(error);
        })
    } catch (error) {
      // Error retrieving data
    }
  };
Get_Image()
{
  return fetch("http://10.0.2.2:3333/api/v0.0.5/user/7/photo",
  {
    headers: {
      "Content-Type": "image/png",
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

componentDidMount(){
  this._retrieveTokenData()
  //this.Get_Image();
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
    <View>
    <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
      <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Chit Pictures Posted -</Text>
    </View>

    <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
      <Text style={{color:'gray', fontSize:15, width:285, fontWeight:'bold', marginBottom:10}}>Posted Chit Images:</Text>
      <Image
                  style={{width:300, height: 300, borderRadius:15, marginBottom:20}}
                  source={{uri: "http://10.0.2.2:3333/api/v0.0.5/chits/"+this.state.user_id +"/photo" +'?' + new Date()}}
                />
      <Button  title="Post" onPress={() => this.postChit()} ></Button>
    </View>
  </View>
 );
 }
}
export default Display_Chit_Images;
/*
I like to eat banana's because they are good for you, sometimes I eat apples to but I prefer the softness of bananas */