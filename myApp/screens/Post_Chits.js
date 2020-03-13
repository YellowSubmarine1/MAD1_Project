import React, { Component } from 'react';
import { Text, View, Button, TextInput, AsyncStorage,Alert,PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
class HomeScreen extends Component{
// removes the header from the page
static navigationOptions = {
    header: null
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
    chit_content:'',
    timestamp:'',
    longitude:'',
    latitude:'',
    // parameters for all the features of the elements in the list
    location:[],
    locationPermission: false,
    }
}
async requestLocationPermission(){
  try {
      const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Lab04 Location Permission',
        message:
        'This app requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
    } catch (err) {
    console.warn(err);
    }
 };
findCoordinates = () => {
  if(!this.state.locationPermission){
    this.state.locationPermission = this.requestLocationPermission();
  }
    Geolocation.getCurrentPosition(
    (position) => {
      const location = JSON.stringify(position);
      console.log(location);
      this.setState({ location: location });
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp
    });
    console.log("Timestamp: "+this.state.timestamp)
    console.log("Latitude: "+this.state.latitude)
    console.log("Longitude: "+this.state.longitude)
    },
    (error) => {
      Alert.alert(error.message)
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    }
  )
};
 

postChit()
{
 let result = JSON.stringify({
   chit_id:0,
   timestamp:this.state.timestamp,
   chit_content: this.state.chit_content,
   location:{longitude:this.state.longitude,latitude:this.state.latitude},
   user:{
    user_id: parseInt(this.state.user_id),
    given_name: this.state.Given_Name,
    family_name: this.state.Family_Name,
    email: this.state.Email
   }
 });

 console.log(result);
 console.log(this.state.XAuthorization);

 return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
 {
   headers: {
     "Content-Type": "application/json",
     "X-Authorization": this.state.XAuthorization
   },
   method: 'POST',
   body: result
 })
 .then((response) => response.json())
 .then((responseJson) => {
   console.log("-------- Chit Posted -------------");
   console.log('Server Response: '+ responseJson.status);
   alert("Chit Posted!");
 })
 .catch((error) => {
   console.error(error);
 });
}


getData(){
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
      Family_Name:responseJson.family_name,
      Given_Name:responseJson.given_name,
      Email: responseJson.email,
    });
    console.log("JSON Results:"+ responseJson);
    console.log("User's Name:"+ this.state.Given_Name + " "+ this.state.Family_Name);
    console.log("Email: "+ this.state.Email);

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
      this.getData();
    }
  } catch (error) {
    // Error retrieving data
  }
};

componentDidMount(){
  this.findCoordinates();
  this._retrieveTokenData();
 }
 render(){
 return(
    <View>
    <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
      <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Post Chits -</Text>
    </View>

    <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
      <Text style={{color:'gray', fontSize:11, width:285}}>Enter Chits:</Text>
      <TextInput style={{ height: 140, backgroundColor:'lightgray', borderRadius:8, marginBottom:10}}
          onChangeText={(value) => this.setState({chit_content:value})}
          multiline={true}
          underlineColorAndroid='transparent'
          maxLength={141}

      />
      <Button  title="Post" onPress={() => this.postChit()} ></Button>
    </View>
  </View>
 );
 }
}
export default HomeScreen;
/*
I like to eat banana's because they are good for you, sometimes I eat apples to but I prefer the softness of bananas */