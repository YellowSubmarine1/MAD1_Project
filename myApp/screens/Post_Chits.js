import React, { Component } from 'react';
import { Text, View, Button, TextInput, AsyncStorage,Alert,PermissionsAndroid,Image} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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
    chit_content:'',
    timestamp:'',
    longitude:'',
    latitude:'',
    // parameters for all the features of the elements in the list
    location:[],
    locationPermission: false,
    server_response:'',
    Image_URL:'',
    Display_content:false,
    Chit_Draft_Key:''
    }
}

// This Async Function is used to display an alert to ask the user for their permission to use their location details
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

 // Function uses the 'requestLocationPermission' function to get the location and timestamp details and store them in state variables to use when a chit is published.
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
 

// Function is used to Post the Chit, it takes the Text entered in the TextInput, uses the details of the current user and post a chit.
postChit()
{
  // Converts the chit content into a JSON String Object.
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
  .then((response) => {
    // retreives the server response from the Chit Post request and then checks to see whether it was successful or not and displays an appropriate response on the app.
    let server_response = JSON.stringify(response.status);
    if(server_response == 201)
    {
      console.log("-------- Chit Posted -------------");
      console.log("Response Status: "+server_response)
      alert("Chit Posted!");
      this.props.navigation.navigate('Chits');
    }
    if(server_response == 401){
      alert("Unauthorized, Please Login");
    }
  })
  .catch((error) =>{
    console.log(error);
    })
}

// Function is used to return all the profile details of the current user
getData(){
  console.log("__________________________________");
  console.log("user_id: "+ this.state.user_id)
  let result = "http://10.0.2.2:3333/api/v0.0.5/user/"+ this.state.user_id;
  console.log('Get Request');
  console.log(result);
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
})
  .catch((error) =>{
  console.log(error);
  });
}


// Async Tasks is used to retrieve the Token and User_ID of the user logged in from the async storage
_retrieveTokenData = async () => {
  console.log("--------------------Retreive Token--------------------------------");
  try {
      // gets the Token and User_ID from async storage, asigns them to state variables to use later to post chits.
    const authorization_Token = await AsyncStorage.getItem('Token');
    const new_user_id =JSON.parse(await AsyncStorage.getItem('key2')) ;
    const key = new_user_id+'SaveChitsDrafts';  // Generates a unique Chit Draft Key for all the users 
    console.log("Key for Chit Drafts:"+key )
    
    const retreived_chit_drafts =JSON.parse(await AsyncStorage.getItem(key)) ;  // Uses the 'key' variable to retreive the array containing the Chit Drafts from the Async Storage
       // Checks to see that the 'retreived_chit_drafts' array isnt null and contains chit drafts, that the token and user_id are not null before assigning them to a state variable 
    if (authorization_Token !== null && new_user_id !== null) {
      console.log("Post_Chits Retreived Token: "+authorization_Token);
      this.setState({
        XAuthorization:authorization_Token,
        user_id:new_user_id,
        Chit_Draft_Key:key
      });
     /* console.log("Key for Chit Drafts:"+this.state.Chit_Draft_Key )
      console.log("Recieved Token Value is: "+this.state.XAuthorization);
      console.log("Recieved User UD Value is: "+this.state.user_id);
      console.log("Saved Chits Array List: "+retreived_chit_drafts);
      */
      this.getData();
      this.Get_Image();
    }
    
  } catch (error) {
    // Error retrieving data
  }
};

// Function is used to post a chit photo, it opens the image picker giving the user the option of taking a picture or selecting an image from the library which then posts the chit photo to the server and the URI of the image is returned.
// The Posted Chit Photo is displayed.
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
  
      console.log("Image URL:"+ this.state.Image_URL)
      let search = "http://10.0.2.2:3333/api/v0.0.5/chits/"+this.state.user_id+"/photo";
      // Posts the chit photo
      return fetch(search,
      {
        headers: {
          "Content-Type": "image/jpeg",
          "X-Authorization":this.state.XAuthorization
        },
        method: 'POST',
        body: response
      })
      .then((response) => {
          let server_response = JSON.stringify(response.status);
          if(server_response == 201)
          {
            console.log("-------- Update Made -------------");
            console.log('Server Response: '+ server_response);
            alert("Chit Photo Posted!");
            console.log("Returned URL: "+response.url)
            this.setState({Image_URL: response.url,Display_content: true}) // updates the Iage_URI of the posted Image so that it can be displayed.
            console.log("Returned Image URL: "+this.state.Image_URL)
        }
        if(server_response == 404){
          alert("Not Found");
        }
        if(server_response == 401){
          alert("Unauthorized Post, Please Login");
        }
        if(server_response == 400){
          alert("Bad Request");
        }
      })
    //  .then((response)=>{
    //    Alert.alert("Photo Added!");
    //  })
      .catch((error) =>{
        console.log(error);
        })
      
    }
  });
}

// Function is used to create and save the chit draft on the local storage, the Chit Draft Array from the Async Storage
storeChits = async()=>{
  console.log("-----Async Post Chits ------");
  // Stores the content of the chit on a variable
  let chitToBeSaved = {
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
  };

  try{
    // Checks to see if the Array used to store the Chit Drafts exist for the current user, if not then a new Async storage array is created.
    const newProduct =JSON.parse(await AsyncStorage.getItem(this.state.Chit_Draft_Key)) ;
    if (!newProduct) {
      console.log("Check Existing Saved Chits: "+ newProduct)
      newProduct = []
    }

    console.log("Chits Array: "+ newProduct)
    newProduct.push(chitToBeSaved)  // adds the current chit into the chit Draft array 
    // converts the array into a JSON String Object and updates the Array on the Async Storage using the key for that array
    await AsyncStorage.setItem(this.state.Chit_Draft_Key,JSON.stringify(newProduct)) 
    .then( ()=>{
      alert("Chit Draft Created and Saved !");
      console.log('It was saved successfully')
      this.props.navigation.navigate('Chits');
    })
    .catch( ()=>{
     console.log('There was an error saving the chit')
    })
  }catch(e){}
}


componentDidMount(){
  this.findCoordinates();
  this._retrieveTokenData();
  this.setState({Image_URL:''});
 }
 render(){
 return(
    <View>
    <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
      <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Post Chits -</Text>
    </View>

    <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
      <Text style={{color:'gray', fontSize:11, width:285}}>Enter Chits:</Text>
      {
        // Display the content in screen when state object "content" is true.
        // Hide the content in screen when state object "content" is false. 
        this.state.Display_content ? 
        <Image
              style={{width:200, height: 100, borderRadius:15, marginBottom:10}}
              source={{uri: this.state.Image_URL +'?' + new Date()}}
          />: null
      }

      <TextInput style={{ height: 140, backgroundColor:'lightgray', borderRadius:8, marginBottom:10}}
          onChangeText={(value) => this.setState({chit_content:value})}
          multiline={true}
          underlineColorAndroid='transparent'
          maxLength={141}

      />
      <Button  title="Choose Photo" onPress={() => this.handleChoosePhoto()} ></Button>
      <View style={{ paddingTop:2}}>
        <Button  title="Post Chit" onPress={() => this.postChit()} ></Button>
      </View>
      <View style={{ paddingTop:2}}>
      <Button  title="Save Chit" onPress={() => this.storeChits()} ></Button>
      </View>
    </View>
  </View>
 );
 }
}
export default HomeScreen;
/*
I like to eat banana's because they are good for you, sometimes I eat apples to but I prefer the softness of bananas */