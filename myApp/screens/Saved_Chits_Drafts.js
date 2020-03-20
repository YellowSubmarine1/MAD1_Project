import React, { Component } from 'react';
import { Text, View,ActivityIndicator,FlatList, StyleSheet, Image,TouchableOpacity, AsyncStorage } from 'react-native';
export default class FollowersScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
      header: false
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        saved_Chits_Drafts: [],
        XAuthorization:'',
        Chit_Draft_Key:'',
        refreshing: false,
        seed:1,
        page:1,
        }
    }

  // Async Function retrieves the user_id, token and the array used to store the chit Drafts for the current user from Async Storage
   _retrieveTokenData = async () => {
    console.log("--------------------Retreive Chits Drafts--------------------------------");
    try {
      const key2 =JSON.parse(await AsyncStorage.getItem('key2')) ;  // gets the user_id of the current user
      const key = key2+'SaveChitsDrafts';  // variable is the key to retreive the array containing the Chit Drafts from the Async Storage

      const retreived_chit_drafts =JSON.parse(await AsyncStorage.getItem(key)) ; // Uses the 'key' variable to retreive the array containing the Chit Drafts from the Async Storage
      const token = await AsyncStorage.getItem('Token');
      console.log("Check Existing Saved Chits: "+ retreived_chit_drafts)
      console.log("Recieved Saved Drafts: "+JSON.stringify( retreived_chit_drafts));
     
      // Checks to see that the 'retreived_chit_drafts' array isnt null and contains chit drafts, that the token and user_id are not null before assigning them to a state variable 
      if (retreived_chit_drafts !== null && token !==null) {
        this.setState({
          XAuthorization:token,
          Chit_Draft_Key:key,
          saved_Chits_Drafts:retreived_chit_drafts
        });
        console.log("Key for Chit Drafts:"+this.state.Chit_Draft_Key )
        console.log("Chits Value is: "+JSON.stringify( this.state.saved_Chits_Drafts));
        console.log("Recieved Token Value is: "+this.state.XAuthorization);

      }
    } catch (error) {
      // Error retrieving data
    }
  };

  // Function is used to update the chit Draft array in the Async Storage 
  storeUpdated_Chits = async(updated_Drafts)=>{
    console.log("-----Async Token ------");
    try{
      await AsyncStorage.setItem(this.state.Chit_Draft_Key, JSON.stringify(updated_Drafts))
      console.log("Updated Chits: "+JSON.stringify(updated_Drafts));
    }catch(e){}
  }


  // Function Removes selected Item from the Array and updates the chit Draft Array in the Async Storage
  removeDraft(selected_chit){
    console.log("Remove Draft:"+JSON.stringify(selected_chit));
      const index = this.state.saved_Chits_Drafts.indexOf(selected_chit);
      console.log("Index of Draft:"+index);
      this.state.saved_Chits_Drafts.splice(index,1);

      console.log("Updated Draft:"+JSON.stringify(this.state.saved_Chits_Drafts));
      this.storeUpdated_Chits(this.state.saved_Chits_Drafts)
      this._retrieveTokenData() // used to refresh the page and display the updated list of Chit Drafts saved
    }

// Function is used to Edit the selected chit Draft in the Array, get the index value of the chit, passes the chit and index value to the page where the chit content can be updated
  editDraft(selected_chit){
    console.log("--------------Edit Chit-------------------")
      console.log("selected Draft:"+JSON.stringify(selected_chit.chit_content));
      const index = this.state.saved_Chits_Drafts.indexOf(selected_chit);
      console.log("Index of Draft:"+index);
      this.props.navigation.navigate('Edit_Chit_Drafts',{selected_chit:selected_chit, selected_chit_index:index});
    }

    // Post's Selected Chit Draft
    postChit(selected_chit)
    {

      console.log("--------------Post Chit-------------------")
      console.log("selected Draft:"+JSON.stringify(selected_chit));
      const index = this.state.saved_Chits_Drafts.indexOf(selected_chit);
      console.log("Index of Draft:"+index);

      console.log("Authorization: "+this.state.XAuthorization);
    
      return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": this.state.XAuthorization
        },
        method: 'POST',
        body: JSON.stringify(selected_chit)
      })
      .then((response) => {
        let server_response = JSON.stringify(response.status);
        console.log("Response Status: "+server_response)
        if(server_response == 201)
        {
          this.setState({
            isLoading: false,
            refreshing: false
          });
          console.log("-------- Update Made -------------");
          this.state.saved_Chits_Drafts.splice(index,1);
    
          console.log("Updated Draft:"+JSON.stringify(this.state.saved_Chits_Drafts));
          this.storeUpdated_Chits(this.state.saved_Chits_Drafts)
          console.log("-------- Chit Posted -------------");
          alert("Chit Posted!");
          this._retrieveTokenData()
          //this.props.navigation.navigate('Chits'); 
        }
        if(server_response == 401){
          alert("Unauthorized, Please Login");
        }})
    /*  .then((response) => {
        response.json()
      })
    .then((responseJson) => {
          this.state.saved_Chits_Drafts.splice(index,1);
    
          console.log("Updated Draft:"+JSON.stringify(this.state.saved_Chits_Drafts));
          this.storeUpdated_Chits(this.state.saved_Chits_Drafts)

            console.log("-------- Chit Posted -------------");
            console.log("Response Status: "+this.state.server_response)
            alert("Chit Posted!");
            this._retrieveTokenData()
            //this.props.navigation.navigate('Chits');
      })
      */
      .catch((error) =>{
        console.log(error);
        this.setState({isLoading:false,refreshing:false})
        })
        
    }

    // Function is used to refresh the page whenever the user pulls down the gethData function is run again returning the most recent chits.
handleRefresh=()=>{
  this.setState({
    page:1,
    refreshing:true,
    seed:this.state.seed+1
  }, ()=>{
    this._retrieveTokenData();
  })
}
   componentDidMount(){
     console.log("------- Saved Chits Drafts Page -------");
    this._retrieveTokenData();
   }
 render(){
 return(
<View style={{ flex:1, flexDirection:'column', marginBottom:3} }>
      <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
          <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Chits Drafts -</Text>
      </View>

      
      <View >
    <FlatList
      data={this.state.saved_Chits_Drafts}
      renderItem={({item}) => (
        
        <View>
        <View style={{backgroundColor:'#9CCAE8',borderBottomWidth:1, borderBottomColor: '#ddd'}}>
          <View style={{ flexDirection:'row'}}>

  
            <View style={{flex:3}}>
              <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:2}}>
                  <View>
                  <Text> {item.user.given_name} {item.user.family_name}</Text>
                  </View>
                  <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:9}}> {item.timestamp}</Text>
                  </View>
                  
              </View>
  
              <View style={{backgroundColor:'gray', width:'65%',alignItems:'center', height:50, borderRadius:2, marginBottom:3,alignSelf:'center'}}>
                    <Text style={{fontSize:10, alignSelf:'auto', alignItems:'stretch'}}> {item.chit_content}</Text>
              </View>

              <View style={{flexDirection: 'row', marginTop:2,alignSelf:'center', paddingBottom:10}}>
              <TouchableOpacity style={{backgroundColor:'#E91E63', width:60,height:30,borderRadius:20, justifyContent:'center', marginTop:10, marginRight:10 }} onPress={()=> this.removeDraft(item)}>
                    <Text style={{color:'#fff', fontSize:10,alignSelf:'center'}}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor:'#E91E63', width:60,height:30,borderRadius:20, justifyContent:'center', marginTop:10, marginRight:10 }} onPress={()=> this.editDraft(item)}>
                    <Text style={{color:'#fff', fontSize:10,alignSelf:'center'}}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor:'#E91E63', width:60,height:30,borderRadius:20, justifyContent:'center', marginTop:10, marginRight:10 }} onPress={()=> this.postChit(item)}>
                    <Text style={{color:'#fff', fontSize:10,alignSelf:'center'}}>Post</Text>
                  </TouchableOpacity>
                  </View>
          </View>
        </View>
      </View>
      </View>
      )}
      keyExtractor={(item, index) => {
        return item.id;
      }}
      refreshing={this.state.refreshing}
      onRefresh={this.handleRefresh}
    />
   </View>
  </View>
 );
 }
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flexDirection: 'column', backgroundColor: 'green'
  },
  title: {
    fontSize: 19,
    width: '100%', height: '10%', backgroundColor: 'orange', fontWeight: 'bold', textAlign:'center',padding:12
  },
  activeTitle: {
    color: 'red',
    display: 'flex'
  },
  flatListContainer:{
    backgroundColor: 'gray',flexDirection: 'row', alignItems:'flex-end',justifyContent:'space-between'
  },
  profilePicture:{
    width:70, height: 70, marginTop:10, marginLeft:5
  },
  userInfo:{
    textAlign:'center', paddingBottom:5
  },
  userInfoID:{
    alignSelf:'flex-start', paddingTop:15, paddingRight:20
  }
});