import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import { createStackNavigator  } from 'react-navigation-stack';

const AppTabNav = createStackNavigator ({
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
  Saved_Chits_Drafts:{
    screen: Saved_Chits_Drafts
  },
  Edit_Chit_Drafts:{
    screen: edit_chit_drafts
  },
  Display_Chit_Pictures:{
    screen: load_chit_picture
  },
  ViewChits:{
    screen: createBottomTabNavigator({
      Chits:{
        screen: View_Chits_Not_Logged_In
      },
      Search_Users:{
        screen: Search_Users_Not_Logged_In
      }
    }),
    navigationOptions: {
      title: 'Home',
      headerShown: false
    }
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

import load_chit_picture from './screens/Display_Image'

import Search_Users_Not_Logged_In from './screens/Search_Users_Not_Logged_In'
import View_Chits_Not_Logged_In from './screens/View_Chits_Not_Logged_In'

import Saved_Chits_Drafts from './screens/Saved_Chits_Drafts'
import edit_chit_drafts from './screens/Edit_Chit_Drafts'