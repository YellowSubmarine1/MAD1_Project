import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';

const AppTabNav  = createBottomTabNavigator({
  //Followers: {
  //  screen: FollowersScreen
  //},
  //Following:{
  //  screen: FollowingScreen
  //},
  Login:{
    screen: Login
  },
  UserProfile: {
    screen: Profile
  },
  EditProfile:{
    screen: Edit_Profile
  },
 // Search:{
 //   screen: searchUser
 // },
//  Chits:{
//    screen: Chits
//  },
//  selectedUserProfile:{
//    screen: selected_User_Profile
//  },

  Register:{
    screen: Create_Account
  }
});
const AppContainer = createAppContainer(AppTabNav )
export default AppContainer;
import FollowersScreen from './screens/Followers'
import FollowingScreen from './screens/Following'
import Profile from './screens/Profile'
import Edit_Profile from './screens/Edit_Profile'
import selected_User_Profile from './screens/selectedProfile'
import searchUser from './screens/Search'
import Chits from './screens/Chits'
import Login from './screens/Login'
import Create_Account from './screens/Create_Account'