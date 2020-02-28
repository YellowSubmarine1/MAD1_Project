import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator,FlatList, StyleSheet, Image,TouchableOpacity } from 'react-native';
class HomeScreen extends Component{
    // removes the header from the page
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        Followers_List:[],
        }
    }

  // function uses 'fetch' to call the api and return a JSON string from the server
  getData(){
   return fetch("http://10.0.2.2:3333/api/v0.0.5/user/7/followers",
   {
     headers: {
       "Content-Type": "application/json",
       "X-Authorization": "c9a196bf7f9cd7c02f4d90a4504310de"
     },
     method: 'GET'
   })
   .then((response) => response.json())
   .then((responseJson) => {
       this.setState({
       isLoading: false,
       Followers_List: responseJson,
     });
     console.log("JSON Results:");
     console.log(responseJson);
   })
   .catch((error) =>{
   console.log(error);
   });
   }
  

 //  <View>
//   <Text>{item.user_id } {item.given_name } {item.family_name }</Text> 
 //</View>

 //  <View style={{
 // flex: 1,
//  flexDirection: 'column'
//}}>
 //     <Text style={{width: '100%', height: '12%', backgroundColor: 'orange', fontWeight: 'bold'} }>Followers</Text>
 //     <FlatList
 //     data={this.state.Followers_List}
 //     renderItem={({item}) => (
 //       <View style={{width: '45%' , height: '25%', backgroundColor: 'powderblue'}} />
 //     )}
 //   />    
 // </View>
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
    <View style={{flexDirection: 'column', backgroundColor: 'green'} }>
        <FlatList
          data={this.state.Followers_List}
          renderItem={({item}) => ( 
            <View style={{marginBottom: '2%', backgroundColor: 'gray', padding:'3%', flexDirection: 'column'}} >
              <View style={{backgroundColor: 'gray',flexDirection: 'row'}} >
                <TouchableOpacity onPress={()=> alert('image clicked')}>
                  <Image
                      style={{width: '24%', height: '85%', marginTop:10}}
                      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                    />
                  </TouchableOpacity>

              <Text style={{marginLeft: '10%', paddingTop:'20%', fontSize:17}} > {item.given_name } {item.family_name }</Text> 
              <Text style={{alignItems: 'center'}} > {item.user_id }</Text> 
              </View>
            </View>
          )}
      />
    </View>
 );
 }
}

export default HomeScreen;