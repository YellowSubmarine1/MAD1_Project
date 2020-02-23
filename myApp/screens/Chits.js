import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator,FlatList } from 'react-native';
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
        }
    }

      // function uses 'fetch' to call the api and return a JSON string from the server
  getData(){
   return fetch("http://10.0.2.2:3333/api/v0.0.4/user/7",
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
       Chits_List: responseJson,
       Recent_Chits: responseJson.recent_chits,
       Given_Name: responseJson.given_name,
       Family_Name: responseJson.family_name,
       Email: responseJson.email
     });
     console.log("JSON Results:");
     console.log(responseJson);
     console.log("Recent Chit:");
     console.log(this.state.Recent_Chits);
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
        <Text style={{width: 420, height: 60, backgroundColor: 'orange', fontWeight: 'bold'} }>Chits</Text>
        <FlatList
        data={this.state.Recent_Chits}
        renderItem={({item}) => (
          <View>
             <Text>{this.state.Given_Name} {this.state.Family_Name} {item.timestamp}</Text>
            <Text>{item.chit_content }</Text>
            <Text>-------------------------------------------------------------</Text>
          </View>
        )}
      />
    </View>
 );
 }
}
export default HomeScreen;