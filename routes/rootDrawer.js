import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
//other navigators
import { HomeStack } from './homeStack';
import { AboutStack } from './aboutStack';
import { ManageStack } from './manageStack';
//import { PayStack } from './payStack';

// const Drawer = createDrawerNavigator();
//<Screen name='Payment' component={PayStack} />
const { Navigator, Screen } = createDrawerNavigator();

export const RootDrawerNavigator = () => {
  return (
    <Navigator initialRouteName='Home'>
      <Screen name='Home' component={HomeStack} />    
      <Screen name='Add New Post' component={AboutStack} />
      <Screen name='Remove/Update Existing Post' component={AboutStack} />  
      <Screen name='Contact US' component={AboutStack} />   
      <Screen name='About' component={AboutStack} />
      <Screen name='Manage' component={ManageStack} />
     
    </Navigator>
  );
};
