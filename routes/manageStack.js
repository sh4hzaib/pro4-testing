import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens
import Manage from '../screens/manage';
import { Header } from '../shared/header';

const { Navigator, Screen } = createStackNavigator();

export const ManageStack = ({ navigation }) => (
  <Navigator
    // headerMode='screen' //default option
    initialRouteName='Manage'
    screenOptions={{
      gestureEnabled: false,
      headerTintColor: '#444',
      headerStyle: { backgroundColor: '#de1', height: 70 },
      headerTitleStyle: { fontWeight: 'bold',  },
      headerTitleAlign: 'center',
    }}>
    <Screen
      name='Manage'
      component={Manage}
      options={{
        headerTitle: () => <Header title='Manage' navigation={navigation} />,
      }}
    />
  </Navigator>
);
