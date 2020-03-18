import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator, Image,TouchableOpacity } from 'react-native';
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

     // function uses 'fetch' to call the api and return a JSON string from the server
    getData(user, authorization){
      console.log('-------------------------------------');
      console.log('Edit Profile');
      console.log(user);
      let result = "http://10.0.2.2:3333/api/v0.0.5/user/"+ user;
    return fetch(result, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json'
        }})
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(0,responseJson)
        this.setState({
        isLoading: false,
        Given_Name: responseJson.given_name,
        Family_Name: responseJson.family_name,
        Email: responseJson.email,
        user_id: responseJson.user_id,
        XAuthorization: authorization,
      });
      console.log(this.state.user_id);
      this.Get_Image()
    })
    .catch((error) =>{
    console.log(error);
    });
    }
  componentDidMount(){
    console.log("-------------------------------------------------------------------------");
    console.log("Selected Profile Page Reached:");
    console.log("UserID:" +this.props.navigation.state.params.user_id);
    console.log("Authenication:" +this.props.navigation.state.params.XAuthorization);
    this.getData(this.props.navigation.state.params.user_id,this.props.navigation.state.params.XAuthorization);
   }

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
      console.log("Res:" + JSON.stringify(response));
      console.log("Res status:" + JSON.stringify(response.status));
      console.log("Res ok?:" + JSON.stringify(response.ok));
      this.setState({
        server_response: response.status,
      });
      return response.json()
    })
    .then((responseJson) => {

      if(this.state.server_response == 201)
      {
        console.log("-------- Update Made -------------");
        console.log('Server Response: '+ responseJson);
        alert("Profile Updated!");
        console.log('Updates made');
        this.props.navigation.navigate('Profile');
      }
      else if (this.state.server_response === 404){
        alert("Update not made");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

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
      server_response: response.status,
      image_url:response.url    
    });
  })
  .catch((error) =>{
    console.log(error);
    })
}
  handleChoosePhoto= () =>{
    console.log("Button Pressed")
    const options ={
      title: 'My Pictures',
      takePhotoButtonTitle:'Select from Camera',
      chooseFromLibraryButtonTitle:'Select from Library'
    };
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
        console.log("Image URL:"+ this.state.image_url)
  
        console.log("Image URL: "+ this.state.image_url)
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
          this.Get_Image()
        })
        .then((response)=>{
          Alert.alert("Photo Added!");
          //this.props.navigation.navigate('Post_Chits',{image_url:data.url})
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
              source={{uri: this.state.image_url}}
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