import React, { Component } from 'react';
import { Text, View,ActivityIndicator,FlatList, StyleSheet, Image,TouchableOpacity, AsyncStorage } from 'react-native';
import SearchBar from 'react-native-search-bar';
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
        }
    }


   _retrieveTokenData = async () => {
    console.log("--------------------Retreive Chits Drafts--------------------------------");
    try {
      const retreived_chit_drafts =JSON.parse(await AsyncStorage.getItem('SaveChitDrafts')) ;
      console.log("Check Existing Saved Chits: "+ retreived_chit_drafts)
      console.log("Recieved Saved Drafts: "+JSON.stringify( retreived_chit_drafts));
      if (retreived_chit_drafts !== null) {
        this.setState({saved_Chits_Drafts:retreived_chit_drafts});
        console.log("Chits Value is: "+JSON.stringify( this.state.saved_Chits_Drafts));

      }
    } catch (error) {
      // Error retrieving data
    }
  };

  storeUpdated_Chits = async(updated_Drafts)=>{
    console.log("-----Async Token ------");
    try{
      //const retreived_chit_drafts =JSON.parse(await AsyncStorage.getItem('SaveChitDrafts')) ;
      //console.log("Existing Chits: "+JSON.stringify(retreived_chit_drafts));

      await AsyncStorage.setItem('SaveChitDrafts', JSON.stringify(updated_Drafts))
      console.log("Updated Chits: "+JSON.stringify(updated_Drafts));
    }catch(e){}
  }


  // I can Remove Item from the Array List
  removeDraft(selected_chit){
    console.log("Remove Draft:"+JSON.stringify(selected_chit));
      const index = this.state.saved_Chits_Drafts.indexOf(selected_chit);
      console.log("Index of Draft:"+index);
      const newArray = [this.state.saved_Chits_Drafts];
      this.state.saved_Chits_Drafts.splice(index,1);

      console.log("Updated Draft:"+JSON.stringify(this.state.saved_Chits_Drafts));
      this.storeUpdated_Chits(this.state.saved_Chits_Drafts)
    }


  editDraft(selected_chit){
      console.log("selected Draft:"+JSON.stringify(selected_chit));
      const index = this.state.saved_Chits_Drafts.indexOf(selected_chit);
      console.log("Index of Draft:"+index);
      this.props.navigation.navigate('Edit_Chit_Drafts',{selected_chit:selected_chit, selected_chit_index:index});
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
                  <TouchableOpacity style={{backgroundColor:'#E91E63', width:60,height:30,borderRadius:20, justifyContent:'center', marginTop:10, marginRight:10 }} onPress={()=> this.editDraft(item.user_id)}>
                    <Text style={{color:'#fff', fontSize:10,alignSelf:'center'}}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor:'#E91E63', width:60,height:30,borderRadius:20, justifyContent:'center', marginTop:10, marginRight:10 }} onPress={()=> this.UnFollow(item.user_id)}>
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