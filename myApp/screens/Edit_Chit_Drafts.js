import React, { Component } from 'react';
import { Text, View, Button,TextInput,AsyncStorage, Image,TouchableOpacity } from 'react-native';
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
        XAuthorization: '',
        saved_Chits_Drafts: [],
        current_chit_Draft:[],
        chit_index_to_remove:'',
        Chit_Draft_Key:'',
        user_id:'',
        Given_Name:'',
        Family_Name:'',
        Email:'',
        chit_content:'',
        timestamp:'',
        longitude:'',
        latitude:'',
        chit_id:''
        }
    }

    // Async Function retrieves the user_id, token and the array used to store the chit Drafts for the current user from Async Storage
  _retrieveTokenData = async () => {
    console.log("--------------------Retreive Chits Drafts--------------------------------");
    try {
      const key2 =JSON.parse(await AsyncStorage.getItem('key2')) ;  // gets the user_id of the current user
      const key = key2+'SaveChitsDrafts';  // variable is the key to retreive the array containing the Chit Drafts from the Async Storage
      console.log("Key for Chit Drafts:"+key )

      const retreived_chit_drafts =JSON.parse(await AsyncStorage.getItem(key)) ; // Uses the 'key' variable to retreive the array containing the Chit Drafts from the Async Storage
      console.log("Check Existing Saved Chits: "+ retreived_chit_drafts)

      // Checks to see that the 'retreived_chit_drafts' array isnt null and contains chit drafts
      if (retreived_chit_drafts !== null) {
        // Stores the array containing all the chits Drafts, the key to get the array containing the Chits Drafts in variables from the contructor.
        this.setState({saved_Chits_Drafts:retreived_chit_drafts});
        this.setState({Chit_Draft_Key:key});
        this.setState({current_chit_Draft:this.props.navigation.state.params.selected_chit});         // The current Chit that is being edited is stored in the 'current_chit_Draft' variable.
        console.log("Key for Chit Drafts:"+this.state.Chit_Draft_Key )
        console.log("Chits Value is: "+JSON.stringify( this.state.saved_Chits_Drafts));
        //JSON.stringify(this.state.chit_content.chit_content)
      }
    } catch (error) {
      // Error retrieving data
    }

    console.log("------- Chit Details -------");
    console.log("Chit_ID:" +JSON.stringify(this.state.current_chit_Draft.chit_id));
    console.log("Chit TimeStamp:" +JSON.stringify(this.state.current_chit_Draft.timestamp));
    console.log("Chit Content 2:" +JSON.stringify(this.state.current_chit_Draft.chit_content));
    console.log("Chit latitude:" +JSON.stringify(this.state.current_chit_Draft.location.latitude));
    console.log("Chit longitude:" +JSON.stringify(this.state.current_chit_Draft.location.longitude));
    console.log("Chit User_ID:" +JSON.stringify(this.state.current_chit_Draft.user.user_id));
    console.log("Chit Given Name:" +JSON.stringify(this.state.current_chit_Draft.user.given_name));
    console.log("Chit Family Name:" +JSON.stringify(this.state.current_chit_Draft.user.family_name));
    console.log("Chit Email:" +JSON.stringify(this.state.current_chit_Draft.user.email));


    this.setState({
      chit_id:JSON.stringify(this.state.current_chit_Draft.chit_id),
      timestamp:JSON.stringify(this.state.current_chit_Draft.timestamp),
      chit_content:this.state.current_chit_Draft.chit_content,
      latitude:JSON.stringify(this.state.current_chit_Draft.location.latitude),
      longitude:JSON.stringify(this.state.current_chit_Draft.location.longitude),
      user_id:JSON.stringify(this.state.current_chit_Draft.user.user_id),
      given_name:this.state.current_chit_Draft.user.given_name,
      family_name:this.state.current_chit_Draft.user.family_name,
      email:this.state.current_chit_Draft.user.email,
    });
    
  };

  
  // Function is used to update the current chit draft and save it back onto the chit draft array in the Async Storage
  updateChit_Content =async()=>{

    let updated_Chit ={
      chit_id:0,
      timestamp:parseInt(this.state.timestamp),
      chit_content: this.state.chit_content,
      location:{longitude: parseFloat(this.state.longitude), latitude:parseFloat(this.state.latitude)},
      user:{
        user_id: parseInt(this.state.user_id),
        given_name: this.state.given_name,
        family_name: this.state.family_name,
        email: this.state.email
      }
    };
    console.log("----------- Update Chit Content");
    console.log("Changed Chit Content: "+ this.state.chit_content);
    console.log("Update Chit Post: "+updated_Chit)

    console.log("Current Chit Content: "+ JSON.stringify(this.state.current_chit_Draft));
    // Removes current chit from the locally stored Array
    console.log("Before Current Chit Removed: "+ JSON.stringify(this.state.saved_Chits_Drafts));
    this.state.saved_Chits_Drafts.splice(this.state.chit_index_to_remove,1);
    console.log("After Current Chit Removed: "+ JSON.stringify(this.state.saved_Chits_Drafts));

    console.log("----------- Update Chit Added to Array");
    this.state.saved_Chits_Drafts.push(updated_Chit)  // adds the updated chit into the chit Draft array
    console.log("Updated Chit Drafts:"+this.state.saved_Chits_Drafts )
    // converts the array into a JSON String Object and updates the Array on the Async Storage using the key for that array
    console.log("Key for Chit Drafts:"+this.state.Chit_Draft_Key )
    try {
      if (this.state.saved_Chits_Drafts != null){
        console.log("Key Exists, Array Found");
        console.log("Check Existing Saved Chits: "+ this.state.saved_Chits_Drafts);
       await AsyncStorage.removeItem(this.state.Chit_Draft_Key);
       await AsyncStorage.setItem(this.state.Chit_Draft_Key,JSON.stringify(this.state.saved_Chits_Drafts)) 
      }
      //await AsyncStorage.setItem(this.state.Chit_Draft_Key,JSON.stringify(this.state.saved_Chits_Drafts)) 
     // .then( ()=>{
        alert("Chit Draft Edited !");
        console.log('It was saved successfully')
        this.props.navigation.navigate('Saved_Chits_Drafts');
     // })
    } catch (error) {
      // Error retrieving data
    }
    
  }
  
  componentDidMount(){
    console.log("------- Edit Chits Drafts Page -------");
    this._retrieveTokenData();
    console.log("Selected Chit Index:" +this.props.navigation.state.params.selected_chit_index);
    this.setState({chit_index_to_remove:this.props.navigation.state.params.selected_chit_index})
   }

  

 render(){

 return(
  <View>

      <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
        
      <View style={{flexDirection:'column', paddingTop:20, width:285}}>
      <Text style={{color:'gray', fontSize:11}}>Chit ID:  {this.state.current_chit_Draft.chit_id}</Text>
      <Text style={{color:'gray', fontSize:11}}>Time_Stamp:  {this.state.current_chit_Draft.timestamp}</Text>
          <Text style={{color:'gray', fontSize:11}}>Chit Content</Text>
                  <TextInput style={{ height: 140, backgroundColor:'lightgray', borderRadius:8, marginBottom:10}}
                onChangeText={(value) => this.setState({chit_content:value})}
                value={this.state.chit_content}
            multiline={true}
            underlineColorAndroid='transparent'
            maxLength={141}

        />
      </View>
          <Button  title="Update" onPress={() => this.updateChit_Content(this)} ></Button>
      </View>
   </View>
 );
 }
}
export default HomeScreen;