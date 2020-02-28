import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator,FlatList } from 'react-native';
class Following extends Component{
    // removes the header from the page
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state ={
        isLoading: true,
        Following_List:[],
        }
    }

      // function uses 'fetch' to call the api and return a JSON string from the server
  getData(){
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/7/following",
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
       Following_List: responseJson,
     });
     console.log("JSON Results:");
     console.log(responseJson);
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
    <View style={{flex:1, flexDirection: 'column', flexWrap:'wrap'}}>
        <Text style={{width: 420, height: 60, backgroundColor: 'orange', fontWeight: 'bold'} }>Following</Text>
        <FlatList
        data={this.state.Following_List}
        renderItem={({item}) => (
          <View>
            <Text>{item.user_id } {item.given_name } {item.family_name }</Text> 
          </View>
        )}
      />    
    </View>
 );
 }
}
export default Following;