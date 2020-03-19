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
        input:'',
        Chit_Draft_Key:''
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
    console.log("Chit Content 2:" +JSON.stringify(this.state.current_chit_Draft.chit_content));
    this.setState({input:JSON.stringify(this.state.current_chit_Draft.chit_content)});
  };

  // Function is used to update the current chit draft and save it back onto the chit draft array in the Async Storage
  updateChit_Content(){
    console.log("Chit Content: "+ this.state.input);
    this.setState({current_chit_Draft: this.state.input})
    console.log("Chit Content: "+ JSON.stringify(this.state.current_chit_Draft));
  }
  
  componentDidMount(){
    console.log("------- Edit Chits Drafts Page -------");
    this._retrieveTokenData();
    console.log("Selected Chit Index:" +this.props.navigation.state.params.selected_chit_index);
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
                onChangeText={(value) => this.setState({input:value})}
                value={this.state.current_chit_Draft.chit_content}
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