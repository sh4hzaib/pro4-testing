import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Custom Components:
//import Home from '../src/StripeApp';
import { Header } from '../shared/header';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
const { Navigator, Screen } = createStackNavigator();

export const PayStack = ({ navigation }) => (
  // headerMode='screen' //default option fontWeight: 'bold'   // backgroung gold color #FECE75 , green background #0DAA41
  <Navigator
    initialRouteName='Pay'
    screenOptions={{
      gestureEnabled: false,
      headerStyle: { backgroundColor: '#0CAA41', height: 65, paddingBottom: 22,},   //Door Color
      //headerStyle: { backgroundColor: '#FECE75', height: 70 },  
      headerTitleStyle: { color: '#FFFFFF',fontWeight: 'bold', paddingBottom: 22,  },
      headerTitleAlign: 'center',   headerTintColor: '#fff',  
              
    }}>
        
    <Screen
      name='Pay'
      component={Pay}
      options={{
        headerTitle: () => <Header title='Pay' navigation={navigation} />
       /* headerTitle: () => <Header title='pay' navigation={navigation} />, */ 
      }}
    />

  </Navigator>  

);
