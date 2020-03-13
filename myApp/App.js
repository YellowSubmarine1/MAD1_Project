import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import { createStackNavigator  } from 'react-navigation-stack';

const AppTabNav = createStackNavigator ({
 // Post_Chits:{
 //   screen:post_chits
 // },
  Login:{
    screen: Login
  },
  UserProfile: {
    screen: Profile
  },
  Register:{
    screen: Create_Account
  },
    selectedUserProfile:{
    screen: selected_User_Profile
  },
  Edit_User_Profile:{
    screen: Edit_Profile
  },
  Search_Users:{
    screen: Search_Users
  },
  Post_Chits:{
    screen:post_chits
  },
  HomePage:{
    screen: createBottomTabNavigator({
      Profile: {
        screen: Profile
      },
      Chits:{
        screen: Chits
      },
      Followers: {
        screen: FollowersScreen
      },
      Following:{
        screen: FollowingScreen
      }
    }),
    navigationOptions: {
      title: 'Home',
      headerShown: false
    }
  }
});

const AppContainer = createAppContainer(AppTabNav )
export default AppContainer;
import Profile from './screens/Profile'
import Login from './screens/Login'
import Create_Account from './screens/Create_Account'

import FollowersScreen from './screens/Followers'
import FollowingScreen from './screens/Following'
import Chits from './screens/Chits'
import Edit_Profile from './screens/Edit_Profile'
import selected_User_Profile from './screens/selectedProfile'

import Search_Users from './screens/Search'
import post_chits from './screens/Post_Chits'