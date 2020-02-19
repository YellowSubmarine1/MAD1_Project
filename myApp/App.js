import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';

const AppTabNav  = createBottomTabNavigator({
  Followers: {
    screen: FollowersScreen
  },
  Following:{
    screen: FollowingScreen
  },
  UserProfile: {
    screen: Profile
  },
  EditProfile:{
    screen: Edit_Profile
  },
  Chits:{
    screen: Chits
  }
});
const AppContainer = createAppContainer(AppTabNav )
export default AppContainer;
import FollowersScreen from './screens/Followers'
import FollowingScreen from './screens/Following'
import Profile from './screens/Profile'
import Edit_Profile from './screens/Edit_Profile'
import Chits from './screens/Chits'