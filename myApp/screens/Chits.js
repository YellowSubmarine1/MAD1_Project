import React, { Component } from 'react';
import { Text, View,ActivityIndicator,FlatList,Image,TouchableOpacity } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
class HomeScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        Given_Name:'',
        Family_Name:'',
        Email:'',
        Chits_List: [],
        Recent_Chits:[],

        user_id:'',
        actions: [
          {
            text: "Logout",
          //  icon: require("./images/ic_accessibility_white.png"),
            name: "bt_accessibility",
            position: 2
          },
          {
            text: "Post Chits",
          //  icon: require("./images/ic_language_white.png"),
            name: "Post Chits",
            position: 1,
            //this.props.navigation.navigate('Post_Chits')
          }
        ]
        }
    }

      // function uses 'fetch' to call the api and return a JSON string from the server
  getData()
  {
    let search = "http://10.0.2.2:3333/api/v0.0.5/chits";
    console.log("All Chits:");
    console.log(search);
   return fetch(search,
   {
     headers: {
       "Content-Type": "application/json"
     },
     method: 'GET'
   })
   .then((response) => response.json())
   .then((responseJson) => {
       this.setState({
       isLoading: false,
       Chits_List: responseJson,
       Recent_Chits: responseJson.recent_chits,
     });
     console.log("JSON Results:");
     console.log(this.state.Chits_List);
   })
   .catch((error) =>{
   console.log(error);
   });
   }
  

 componentDidMount(){
   this.getData();
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
  <View style={{ flex:1, flexDirection:'column', marginBottom:3} }>
  <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
      <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Chits -</Text>
  </View>
  
<View style={{ flex:1, flexDirection:'row', marginBottom:3} }>
  <FlatList
    data={this.state.Chits_List}
    renderItem={({item}) => (
      
      <View style={{backgroundColor:'#9CCAE8',borderBottomWidth:1, borderBottomColor: '#ddd'}}>
        <View style={{ flexDirection:'row', borderRadius:20}}>
          <View style={{flex:1, margin:2, marginLeft:5}}>
            <Image
                  style={{width:40, height: 40, borderRadius:15}}
                  source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                />
          </View>

          <View style={{flex:3}}>
            <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:2}}>
                <View>
                  <Text style={{fontSize:10, fontWeight:'bold'}}>{item.user.given_name} {item.user.family_name}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:9}}> {item.timestamp}</Text>
                </View>
            </View>

            <View style={{backgroundColor:'#9CCAE8', width:'95%', height:50, borderRadius:2, marginBottom:3}}>
                  <Text style={{fontSize:10, alignSelf:'auto', alignItems:'stretch'}}> {item.chit_content}</Text>
            </View>

        </View>
      </View>
    </View>
    )}
    keyExtractor={i => i.id}
  />
</View>

  <FloatingAction
    actions={this.state.actions}
    onPressItem={name => {
      console.log(`selected button: ${name}`);
      this.props.navigation.navigate('Post_Chits')
    }}
  />
</View>
 );
 }
}

/*
 <View style={{ flex:1, flexDirection:'column', marginBottom:3} }>
  <View style={{backgroundColor:'#E91E63', alignItems:'center', justifyContent:'center', borderBottomWidth:10, borderBottomColor:'#ddd'}}>
      <Text style={{color:'white', fontSize:18, height:50, paddingTop:10}}>- Chits -</Text>
  </View>

  
<View style={{ flex:1, flexDirection:'row', marginBottom:3} }>
  <FlatList
    data={this.state.Chits_List}
    renderItem={({item}) => (
      
        <View style={{backgroundColor:'#9CCAE8', marginBottom:2}}>
        <View style={{borderBottomWidth:1, borderBottomColor: 'gray', flexDirection:'row', borderRadius:20}}>
          <View style={{flex:1, margin:2, marginLeft:5}}>
            <Image
                  style={{    width:50, height: 50, borderRadius:15}}
                  source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                />
          </View>

          <View style={{flex:3}}>
            <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:2}}>
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:10}}>{item.user.given_name} {item.user.family_name}</Text>
                  <Text style={{fontSize:10}}>{item.user.email}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:10}}> {item.timestamp}</Text>
                </View>

            </View>
            <View style={{backgroundColor:'gray', width:'95%', height: 50, borderRadius:2, marginBottom:3}}>
                  <Text style={{fontSize:10, alignSelf:'center', alignItems:'stretch'}}> {item.chit_content}</Text>
            </View>
          </View>
        </View>
      </View>
    )}
    keyExtractor={i => i.id}
  />
</View>
</View>
*/
export default HomeScreen;