import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const Header = ({ navigation, title }) => {
  //
const openMenu = () => {
    navigation.openDrawer();
  };
  // add below headerTitle 2nd View <Image source={require('../assets/FetanMastaweqia.pngx')} style={styles.headerLogo} />
  return (
    <View style={styles.header}>
      <View style={styles.headerIcon}>
        <MaterialIcons name='menu' size={34} onPress={openMenu} style={styles.menuIcon} />
      </View>
      <View style={styles.headerTitle}>      
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    
  },
  headerIcon: {
    width: '20%',
    paddingHorizontal: 5,
   
  },
  menuIcon: {
    paddingLeft: 20,
    paddingBottom: 22,
    color: '#fff',
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
    
  },
  headerLogo: {
    width: 35,
    height: 35,
    marginHorizontal: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,  
    letterSpacing: 1.5,
    color:'#fff',
    paddingBottom: 22,
  },
});
