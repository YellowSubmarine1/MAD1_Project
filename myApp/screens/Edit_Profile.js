import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator, Image,TouchableOpacity,AsyncStorage, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
class HomeScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
      header: false
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        user_id:'',
        Given_Name:'',
        Family_Name:'',
        Email:'',
        Password:'',
        XAuthorization: '',
        image_url:''
        }
    }

// Async Tasks is used to retrieve the Token and User_ID of the user logged in from the async storage and then do a get request which retreives the details of the current user using the user_id
_retrieveTokenData = async () => {
  console.log("--------------------Retreive Token & User_ID--------------------------------");
  try {
    // gets the Token and User_ID from async storage, asigns them to state variables to use later to update the user profile.
      const authorization_Token = await AsyncStorage.getItem('Token');
      const new_user_id =JSON.parse(await AsyncStorage.getItem('key2')) ;
      console.log("Retreived Token: "+authorization_Token);
      console.log("Retreived User_ID: "+new_user_id);
      this.setState({XAuthorization: authorization_Token, user_id:new_user_id});

      let result = "http://10.0.2.2:3333/api/v0.0.5/user/"+ new_user_id;
      return fetch(result, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }})
          .then((response) => {
            let server_response = JSON.stringify(response.status);

            if(server_response == 404)
            {
              Alert.alert("User Not Found");
            }else
            {
              console.log("Respose: "+ server_response)
              console.log("res: "+ JSON.stringify(response))
              return response.json()
            }
          })
      .then((responseJson) => {
          console.log("Response Code: "+JSON.stringify(responseJson))
          // stores the details returned from the server and displays them on the TextInput so that the user can update them.
          this.setState({
          isLoading: false,
          Given_Name: responseJson.given_name,
          Family_Name: responseJson.family_name,
          Email: responseJson.email,
          user_id: responseJson.user_id,
        });
        // Loads the profile picture of the current user.
        this.Get_Image()
      })
      .catch((error) =>{
      console.log(error);
      });
  } catch (error) {
    // Error retrieving data
  }
};

  componentDidMount(){
    console.log("-------------------------------------------------------------------------");
    console.log("Selected Profile Page Reached:");
    this._retrieveTokenData();
   }
// Function is used to update the profile details of the user logged in, it takes the details entered from the TextInput,
// converts to JSON string object and updates the user's details.
updateProfile()
   {
    let result = JSON.stringify({
      given_name: this.state.Given_Name,
      family_name: this.state.Family_Name,
      email: this.state.Email,
      password: this.state.Password
    });

    console.log(result);
    console.log(this.state.XAuthorization);

    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+ this.state.user_id,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": this.state.XAuthorization
      },
      method: 'PATCH',
      body: result
    })
    .then((response) => {
      let server_response = JSON.stringify(response.status);
      if(server_response == 201)
      {
        console.log("-------- Update Made -------------");
        console.log('Server Response: '+ server_response);
        alert("Profile Updated!");
        console.log('Updates made');
        this.props.navigation.navigate('Profile');
      }
      if(server_response == 404){
        alert("Update not made");
      }
      if(server_response == 401){
        alert("Unauthorized, Please Login");
      }})
    .catch((error) => {
      console.error(error);
    });
  }

// Function is used to get the profile picture of the current user.
Get_Image()
{
  return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id+"/photo",
  {
    headers: {
      "Content-Type": "image/jpeg",
    },
    method: 'GET',
  })
  .then((response) => {
    console.log(response)
    console.log(response.url)
    this.setState({
      isLoading: false,
      image_url:response.url    
    });
  })
  .catch((error) =>{
    console.log(error);
    })
}

// Function is run whenever the user presses on the Profile Picture of the user,
// it opens the image picker giving the user the option of taking a picture or selecting an image from the library to change the profile picture of the user.
  handleChoosePhoto= () =>{
    console.log("Button Pressed")
    const options ={
      title: 'My Pictures',
      takePhotoButtonTitle:'Select from Camera',
      chooseFromLibraryButtonTitle:'Select from Library'
    };
    // Displays the optons to the user.
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        this.setState({
          image_url: response.uri
        });
        // sets the profile picture of the current user to the new image taken/ selected
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/photo",
        {
          headers: {
            "Content-Type": "image/jpeg",
            "X-Authorization":this.state.XAuthorization
          },
          method: 'POST',
          body: response
        })
        .then((response) => {
          console.log("Res:" + JSON.stringify(response.status));
          console.log("Response: "+response)
          console.log("Returned URL: "+response.url)
          this.Get_Image()  // loads and displays the new image.
        })
        .then((response)=>{
          Alert.alert("Photo Added!");
        })
        .catch((error) =>{
          console.log(error);
          })
        
      }
    });
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

      <View style={{flexDirection:'column'}}>
          {/* Styling for the Image*/}
          <View style={{marginTop:25,alignItems:'center', paddingRight:20}}>
          <TouchableOpacity onPress={()=> this.handleChoosePhoto()}>
            <Image
              source={{uri: this.state.image_url +'?' + new Date()}}
              style= {{width:210, height:180, borderRadius:25}}
            />
            </TouchableOpacity>
          </View>
      </View>


      <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
        <Text style={{color:'gray', fontSize:11, width:285}}>First Name</Text>
          <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8}}
              onChangeText={(value) => this.setState({Given_Name:value})}
              value={this.state.Given_Name}
          />
          <Text style={{color:'gray', fontSize:11}}>Family Name</Text>
          <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8}}
              onChangeText={(value) => this.setState({Family_Name:value})}
              value={this.state.Family_Name}
          />
          <Text style={{color:'gray', fontSize:11}}>Email</Text>
          <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8}}
              onChangeText={(value) => this.setState({Email:value})}
              value={this.state.Email}
          />
          <Text style={{color:'gray', fontSize:11}}>Password</Text>
          <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8, marginBottom:10}}
              onChangeText={(value) => this.setState({Password:value})}
              secureTextEntry={true} 
          />
          <Button  title="Update" onPress={() => this.updateProfile(this)} ></Button>

      </View>
   </View>
 );
 }
}
export default HomeScreen;