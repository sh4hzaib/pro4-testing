import React, { useState, useEffect, Fragment } from 'react';
import {Linking,
  Platform, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView,
  Button, Keyboard, Modal, SafeAreaView, TouchableHighlight, Image, Share
} from 'react-native';
//import { Platform,  StyleSheet,  Text,  View,  FlatList,  TouchableOpacity,  TouchableWithoutFeedback, 
// Keyboard,  Modal,  SafeAreaView, } from 'react-native';
//import { black } from 'react-native-paper/lib/typescript/src/styles/colors'; 
import Card from '../shared/card';
import { globalStyles, images } from '../styles/global';
import firebase from "./firebase.js";
import { StatusBar } from 'expo-status-bar';

const ref = firebase.firestore().collection("ads");

const ReviewDetails = ({ navigation, route }) => {

  // const pressHandler = () => {
  //   navigation.goBack();
  // };
  const [isImage1Available, setIsImage1Available] = useState(false);
const [isImage2Available, setIsImage2Available] = useState(false);
  const [isImage3Available, setIsImage3Available] = useState(false);
  const [isImage4Available, setIsImage4Available] = useState(false);
 


  const [ads, setAds] = useState("");
  //const [adsAt0, setAdsAt0] = useState("");
  function getAds() {
    ref
      //.where('category','!=', '')
      // .where('type', '==', 'single')    
      .onSnapshot((querySnapshot) => {
        const ads = [];
        querySnapshot.forEach((doc) => {
          ads.push(doc.data());
        });
        setAds(ads[0].detailPageImage);
        //setAdsAt0(ads[0].detailPageImage);
        //setOriginalCopyUsers(items);
      });
  }
  function callNumber(phone) {

    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  function isImageAvailable() {
    var xy = route.params.image1 == "" ;
    var xyz = route.params.image2 == "";
    var xyz1 = route.params.image3 == "";
    var image4 =  ads == "";
    
      setIsImage1Available(!xy);    
      setIsImage2Available(!xyz); 
      setIsImage3Available(!xyz1);
      setIsImage4Available(!image4);
  }
  //https://reactnative.dev/docs/share
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'FitanAdvertizement.com | ፈጣን ማስታወቂያ,  Please download the app to find ',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    isImageAvailable();
    getAds();
    //addReview();
    // getCategory();
  }, []);
  //onError={() => {route.params.category.categoryImage}}
  //<ImageBackground source={require('../assets/game_bg.png')} style={globalStyles.container}>
  // border color  borderColor: '#dddddd',
  return (
    <SafeAreaView style ={styles.localCard}> 
        <StatusBar
        animated={true}
        backgroundColor="#158A3C"               
     />
     <View>
        <Text style={styles.location}> {route.params.category}{', '}{route.params.city}{' '} {route.params.state}</Text>
        <Text style={styles.location2} onPress={() => { callNumber(route.params.phone) }}>ስልክ:  {route.params.phone} </Text>
        <Text style={styles.location2}>Item #:  {route.params.createdAt.seconds} </Text>
        <Text style={styles.location2}>ItemID #:  {route.params.itemID} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Manage')}> Manage </TouchableOpacity>
         </View>
      <ScrollView scrollEventThrottle={16}>
      
        <View style={styles.cardSize}>          
          <View>
            <ScrollView horizontal={true}>
           
              {isImage1Available?
              <View style={styles.imageAndPriceBorder} >
                <View style={styles.imageBorder}>
                  <Image style={styles.imageSize} source={{ uri: route.params.image1 }} />
                </View>
                <View style={styles.imageBorder} >
                <Text style={styles.phoneNumber}>  {route.params.price} </Text>  
                  <Text style={styles.phoneNumber} onPress={() => { callNumber(route.params.phone) }}>ስልክ:  {route.params.phone} </Text>             
                  <Text style={styles.phoneNumber}>አድራሻ:  {route.params.city}  {route.params.state}</Text>                 
                </View>               
              </View>
                : null}
              
               {isImage2Available?
              <View style={styles.imageAndPriceBorder}>
                <View style={styles.imageBorder}>
                  <Image style={styles.imageSize} source={{ uri: route.params.image2 }} />
                </View>
                <View style={styles.imageBorder} >
                <Text style={styles.phoneNumber}>  {route.params.price} </Text>  
                  <Text style={styles.phoneNumber} onPress={() => { callNumber(route.params.phone) }}>ስልክ:  {route.params.phone} </Text>             
                    <Text style={styles.phoneNumber}>አድራሻ:  {route.params.city}  {route.params.state}</Text>      
                </View>
              </View>
                : null}
              
                {isImage3Available?
              <View style={styles.imageAndPriceBorder}>
                  <View style={styles.imageBorder}>
                    <Image style={styles.imageSize} source={{ uri: route.params.image3 }} />
                  </View>
                  <View style={styles.imageBorder} >                
                  <Text style={styles.phoneNumber}>  {route.params.price} </Text>  
                  <Text style={styles.phoneNumber} onPress={() => { callNumber(route.params.phone) }}>ስልክ:  {route.params.phone} </Text>             
                    <Text style={styles.phoneNumber}>አድራሻ:  {route.params.city}  {route.params.state}</Text>
                   
                
                </View>
                </View>
                : null}             
            </ScrollView>
          </View>
    
          <View style={styles.description2}>
            <Text>{route.params.description2}</Text>
          </View>

        </View>
        
      </ScrollView>
      
      <View style={{ marginTop: 50 }}>
      <Button onPress={onShare} title="Share" />
      </View>

      {isImage1Available?
      <View>
      <Image style={styles.previewImage} source={{ uri: ads}} resizeMode='cover'/>
      </View>  : null}
      <View style={styles.footer}>
            <Text>   Contact US  </Text>   
      </View>
    </SafeAreaView>
  );
};
//

export default ReviewDetails;

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1, 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  localCard: {
    flex: 1,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginVertical: 6,
  },
  imageView: {
    height: 290,
    width: '100%',
    paddingLeft: 2,
    paddingRight: 2,
  },
  imageSize: {
    height: 240,
    width: 300,
    resizeMode: "cover",
    borderTopRightRadius: 11,
    borderTopLeftRadius: 11,
  },
  imageBorder: {
    flex: 12,
  },
  phoneNumber: {
    paddingLeft: 10,
    fontSize: 12,
    color: '#0D7E73',
    
  },
  imageAndPriceBorder: {
    borderWidth: 3,
    borderRadius: 11,
    borderWidth: .5,
   
    marginLeft: 7,
    marginTop: 7,
    paddingBottom: 4,
  },
  previewImage: {
    width: '85%',
    height:50,
    resizeMode: "cover",
   
    margin:5,
    padding:5,
  },
  category: {
    fontSize: 24, fontWeight: '700', paddingHorizontal: 20, flex: 1, backgroundColor: 'white', padding: 10,
  },
 
  description2: {
    flex: 1,
    padding: 20,
  },
  price: {
    color: '#2E8B57',
    fontWeight: 'bold',
  },
  priceLabel: {
    color: '#2E8B57',
  },
  location: {
    color: '#0D7E73',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',    
    paddingTop: 7,
    
  },
  location2: {
    color: '#0D7E73',
    fontSize: 14,
    textAlign: 'center',
    paddingBottom:4,
    
  },
  footer:{
    margin: 10, 
    backgroundColor: '#FECE75',
    bottom: 0,
    width: 100, 
    height: 50,
    borderRadius:30,
    
  },
}); 
