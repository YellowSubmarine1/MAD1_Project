import React, { Component } from 'react';
import { Text, View, Button,TextInput,ActivityIndicator, Image,TouchableOpacity } from 'react-native';
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
        XAuthorization: '',
        saved_Chits_Drafts: [],
        }
    }

  componentDidMount(){
    console.log("-------------------------------------------------------------------------");
    console.log("Selected Profile Page Reached:");
    console.log("Selected Chit:" +this.props.navigation.state.params.selected_chit);
    console.log("Selected Chit Index:" +this.props.navigation.state.params.selected_chit_index);
   }

  

 render(){

 return(
  <View>

      <View style={{flexDirection:'column'}}>
          {/* Styling for the Image*/}
          <View style={{marginTop:25,alignItems:'center', paddingRight:20}}>
          <TouchableOpacity onPress={()=> this.handleChoosePhoto()}>
            <Image
              source={{uri: this.state.image_url}}
              style= {{width:210, height:180, borderRadius:25}}
            />
            </TouchableOpacity>
          </View>
      </View>


      <View style={{flexDirection:'column', alignSelf:'center', paddingTop:20}}>
        <Text style={{color:'gray', fontSize:11, width:285}}>First Name</Text>
          <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8}}
              onChangeText={(value) => this.setState({Given_Name:value})}
              value={this.state.Given_Name}
          />
          <Text style={{color:'gray', fontSize:11}}>Family Name</Text>
          <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8}}
              onChangeText={(value) => this.setState({Family_Name:value})}
              value={this.state.Family_Name}
          />
          <Text style={{color:'gray', fontSize:11}}>Email</Text>
          <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8}}
              onChangeText={(value) => this.setState({Email:value})}
              value={this.state.Email}
          />
          <Text style={{color:'gray', fontSize:11}}>Password</Text>
          <TextInput style={{ height: 40, backgroundColor:'lightgray', borderRadius:8, marginBottom:10}}
              onChangeText={(value) => this.setState({Password:value})}
              secureTextEntry={true} 
          />
          <Button  title="Update" onPress={() => this.updateProfile(this)} ></Button>

      </View>
   </View>
 );
 }
}
export default HomeScreen;