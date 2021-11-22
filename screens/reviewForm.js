//import React, {useState, useEffect, Fragment } from 'react';
import React, { Component, useState, useEffect, Fragment, useContext } from "react";
//import {TouchableOpacity, Image, Platform, View, Button, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableWithoutFeedback, ScrollView, TouchableOpacity, Image, Platform, View, Button, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import firebase from "./firebase.js";
import DropDownPicker from "react-native-dropdown-picker";
import { v4 as uuidv4 } from 'uuid';
const ref = firebase.firestore().collection("users");
const fireCategory = firebase.firestore().collection("categories");
const fireCountry = firebase.firestore().collection("dataCountry");
const bFireCategory = firebase.firestore().collection("bCategories");
//import { Checkbox } from 'react-native-paper';
//import AddPost from "../screen/addPost.js";
//import  ImagePicker from 'react-native-image-picker'; 
// <Text style={globalStyles.inputTopLabel}>(+) Add Photos</Text>
import * as ImagePicker from 'expo-image-picker';
import { PayPalButton } from "react-paypal-button-v2";
import StripeApp from "../src/StripeApp.js";
import { StatusBar } from "expo-status-bar";
import { TextInputState } from "react-native";

import ReactDOM from "react-dom"
//const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });


//import StripeApp from "../src/StripeApp";
//import { StripeProvider, CardField, useConfirmPayment } from "@stripe/stripe-react-native";
/*
  <StripeProvider publishableKey="pk_live_51JgY4yCHezrCmuoSQkq8CMjSc9NXhqY0VNL9hd6sH3cta5qL7549JDSshOQYO2rDTacaP5qqMGjIU5Rzu5IkWODB00DDTiQKD4">
      <StripeApp />
    </StripeProvider>
*/


const reviewSchema = yup.object({
  //name: yup.string().required(),
  email: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  description2: yup.string().required(),
  phone: yup.string().required().test('is-1-10000000', 'please use number only', (val) => {
    return parseInt(val) < 10000000000 && parseInt(val) > 0;
  }),
});

//<Text style={globalStyles.errorText}>{formikProps.touched.category1 && formikProps.errors.category1}</Text>
//initialValues={{ title: '', body: '', rating: '' }}
export default function ReviewForm({ addReview }) {
  // dropdowns   
  const [Users, setUsers] = useState([]);
  const [type, setType] = useState("single");
  const [Categories, setCategories] = useState([]);
  const [Countries, setCountries] = useState([]);
  const [States, setStates] = useState([]);
  const [Cities, setCities] = useState([]);
  const [citiesList, setCitieslist] = useState([]);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  
  //const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("");
  const [phone, setPhone] = useState(1);
  const [storeName, setStoreName] = useState("");
  const [amharicStoreName, setAmharicStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const [score, setScore] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [image, setImage] = useState(null);

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");


  const [showStore, setShowStore] = useState(false);
  const [showStoreLabel, setShowStoreLabel] = useState(true);

  // admin and internal uses
  // const [category, setCategory] = useState("");
  const [categoryPermanentName, setCategoryPermanentName] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("");

  const [isApproved, setIsApproved] = useState(false);
  const [internalReview, setInternalReview] = useState("good-initial");
  const [itemIDs, setItemIDs] = useState();


  function getCategory() {
    setLoading(true);
    fireCategory
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setCategories(items);
        setLoading(false);
      });
  }

  /*const [category, setCategory] = useState("");

  function changeCategory(cat) {
    setCategory(cat);
  }
  function changeCheckboxState(cat) {
    setIsChecked(cat.isChecked);
  }
*/
  // get country ............. get country info
  function getAllCountry() {
    //setLoading(true);
    fireCountry
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setCountries(items);
        //    setLoading(false);
      });
  }

  function getCountry() {
    var data1 = Countries.reduce((acc, it) => {
      acc[it.country] = acc[it.country] + 1 || 1;
      return acc;
    }, {});

    var data = [];
    for (const count in data1) {
      // data.push(Countries[count].value);
      data.push({ "label": count, "value": count });
    }
    return data
  }

  function updateState(cat) {
    setCountry(cat);
    fireCountry
      .where('country', '==', cat)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setStates(items);
        // setLoading(false);
      });
  }

  function getState() {
    var data1 = States.reduce((acc, it) => {
      acc[it.state] = acc[it.state] + 1 || 1;
      return acc;
    }, {});

    var data = [];
    for (const count in data1) {
      // data.push(Countries[count].value);
      data.push({ "label": count, "value": count });
    }
    return data
  }
  // update City

  function updateCity(cat) {
    setState(cat);
    fireCountry
      .where('state', '==', cat)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setCities(items);
        // setLoading(false);
      });
  }

  // get state info

  function getCity() {
    var data1 = Cities.reduce((acc, it) => {
      acc[it.city] = acc[it.city] + 1 || 1;
      return acc;
    }, {});

    var data = [];
    for (const count in data1) {
      // data.push(Countries[count].value);
      data.push({ "label": count, "value": count });
    }
    return data
  }
  function handleCity(cat) {
    setCity(cat);
   /* fireCountry
      .where('city', '==', cat)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
      //  setListOfCities(items);
        // setLoading(false);
      }); */
  }
  function handleStore(cat) {

    if (cat.value == "Yes" || cat == "Yes") {
      setShowStore(true);
      setShowStoreLabel(false);
      setType("business");
    }
    else {
      setShowStore(false);
      setShowStoreLabel(true);
      setType("single");
    }

  }

  async function img1(handleChange) {
    setImage1('');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setImage1(result.uri);
    }
  }

  async function img2(handleChange) {
    setImage2('');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setImage2(result.uri);
    }
  }
  async function img3(handleChange) {
    setImage3('');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setImage3(result.uri);
    }
  }

  function getRandomInt() {
    var randomId = (((1 + Math.random()) * 0x100000) | 0).toString(10).substring(1);
    setItemIDs(randomId);
    };
    
  var test;
  /* {showStore ? <Text style={styles.formTitle}>Add Online Store Or Business Ads</Text> :null}
             {showStore ? <Text style={{paddingBottom:10}}>  </Text> */

/*
         function createSubscription(data, actions){
              return actions.subscription.create({
                plan_id: 'P-35K009890N8926024MFNALJY',
              });
              };
              const paypalOnError = (err) => {
              console.log("Error")
              }
              const paypalOnApprove = (data, detail) => {
              // call the backend api to store transaction details
              console.log("Payapl approved")
              console.log(data.subscriptionID)
              };*/

        const createOrder = (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "1",
                      },
                    },
                  ],
                });
              }
  
             const onApprove = (data, actions)=> {
                return actions.order.capture();
              }
          

          
  useEffect(() => {
    //changeCheckboxState();
    //Demo();
    getCategory();
    getAllCountry();
    getRandomInt();
    //initPayPalButton();


  }, []);
  return (
    <View style={styles.inner} style={{ flex: 1, marginBottom: 40 }}>

      <ScrollView scrollEventThrottle={16}>
        <Formik
          initialValues={{ status: 1, storeName: '', amharicStoreName: '', description: '', description2: '', category: '', country: '', States: '', Cities: '', Categories: '', email: '', phone: '', image1: '', image2: '', image3: '', itemIDs:'' }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {

            const newPost = {
              type,
              status: values.status,
              storeName: values.storeName,
              amharicStoreName: values.amharicStoreName,
              email: values.email,
              phone: values.phone,
              category: values.category,
              country,
              state,
              city,
              description: values.description,
              description2: values.description2,
              image1,
              image2,
              image3,

              id: uuidv4(),
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
              itemID: itemIDs,
              
            };

            ref
              .doc(newPost.id)
              .set(newPost)
              .catch((err) => {
                console.error(err);
              });
            actions.resetForm();
            addReview(values);
          }} >

          {(props) => (
            <View>
              {showStoreLabel ?
                <Text style={{ textAlign: 'right', color: '#0000FF', textDecorationLine: 'underline' }}
                  onPress={() => { handleStore('Yes') }}
                  title="Click to create new online store or business ads"
                >Shops and Business</Text>
                : null}
              {showStore ? <Text style={{ textAlign: 'right', color: '#0000FF', textDecorationLine: 'underline' }}
                onPress={() => { handleStore('No') }}
              > Back  </Text> : null}

              {showStore ? <Text style={styles.formTitle}>Add Online Store Or Business Ads</Text>
                : <Text style={styles.formTitle}>Add New Posts ( rent, babysiter, etc. )</Text>}

              {showStore ?
                <Text style={globalStyles.inputTopLabel}> Business/Shop Name (English) *</Text> : null}
              {showStore ?
                <TextInput
                  style={globalStyles.input}
                  maxLength={20}
                  multiline={false}
                  numberOfLines={1}
                  onChangeText={props.handleChange('storeName')}
                  onBlur={props.handleBlur('storeName')}
                  value={props.values.storeName}
                /> : null}
              {showStore ? <Text style={globalStyles.errorText} > {props.touched.storeName && props.errors.storeName} </Text>
                : null}
              {showStore ?
                <Text style={globalStyles.inputTopLabel}> Business/Shop Name (Amharic) </Text> : null}
              {showStore ? <TextInput
                style={globalStyles.input}
                multiline={false}
                numberOfLines={1}
                onChangeText={props.handleChange('amharicStoreName')}
                value={props.values.amharicName}
                onBlur={props.handleBlur('amharicStoreName')}
              />
                : null}
              {showStore ? <Text style={globalStyles.errorText} > {props.touched.amharicStoreName && props.errors.amharicStoreName} </Text>
                : null}
           
              <Text style={globalStyles.inputTopLabel}> Short Descriptions (2 lines) * </Text>
              <TextInput
                style={globalStyles.input}
                maxLength={400}
                multiline={true}
                numberOfLines={2}
                onChangeText={props.handleChange('description')}
                onBlur={props.handleBlur('description')}
                value={props.values.description}
              />
              <Text style={globalStyles.errorText} > {props.touched.description && props.errors.description} </Text>

              <Text style={globalStyles.inputTopLabel}> Full Descriptions and Details * </Text>
              <TextInput
                style={globalStyles.input}
                maxLength={800}
                multiline={true}
                numberOfLines={5}
                onChangeText={props.handleChange('description2')}
                onBlur={props.handleBlur('description2')}
                value={props.values.description2}
              />
              <Text style={globalStyles.errorText} > {props.touched.description2 && props.errors.description2} </Text>


              <View style={{ flexDirection: "row" }}>
                <View style={styles.addPhotos}>
                  <Image style={styles.button} source={{ uri: image1 }} resizeMode='contain' />
                  <Button title='(+) Add Photo' onPress={() => { img1(props.handleChange('image1')) }}> </Button>
                </View>
                <View style={styles.addPhotos}>
                  <Image style={styles.button} source={{ uri: image2 }} resizeMode='contain' />
                  <Button title='(+) Add Photo' onPress={() => { img2(props.handleChange('image2')) }}> </Button>
                </View>
                <View style={styles.addPhotos}>
                  <Image style={styles.button} source={{ uri: image3 }} resizeMode='contain' />
                  <Button title='(+) Add Photo' onPress={() => { img3(props.handleChange('image3')) }}> </Button>
                </View>
              </View>

        
              <Text style={globalStyles.inputTopLabel}>Email *</Text>
              <TextInput
                style={globalStyles.input}
                maxLength={20}
                /*placeholder='Email'*/

                multiline={false}
                numberOfLines={1}
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                onBlur={props.handleBlur('email')} />
              <Text style={globalStyles.errorText} > {props.touched.email && props.errors.email} </Text>


              <Text style={globalStyles.inputTopLabel}> Phone Number</Text>
              <TextInput
                style={globalStyles.input}
                maxLength={20}
                multiline={false}
                numberOfLines={1}
                onChangeText={props.handleChange('phone')}
                value={props.values.phone}
                onBlur={props.handleBlur('phone')} />
              <Text style={globalStyles.errorText} > {props.touched.phone && props.errors.phone} </Text>

              <View style={{
                ...(Platform.OS !== 'android' && {
                  zIndex: 4
                })
              }}>
                <Text style={globalStyles.inputTopLabel}> Category *</Text>
                <DropDownPicker
                  style={globalStyles.input}
                  
                  containerStyle={{ height: 50 }}
                  items={Categories}
                  onChangeItem={itemValue => props.setFieldValue('category', itemValue.value)}
                  value={props.values.category}
                />
                <Text style={globalStyles.errorText} > {props.touched.category && props.errors.category} </Text>
              </View>

              <View style={{
                ...(Platform.OS !== 'android' && {
                  zIndex: 3
                })
              }}>
                <Text style={globalStyles.inputTopLabel}> Country </Text>
                <DropDownPicker
                  style={globalStyles.input}
                  /*placeholder='Country' */
                  containerStyle={{ height: 50 }}
                  items={getCountry()}
                  onChangeItem={(item) => updateState(item.value)}
                />

              </View>
              <View style={{
                ...(Platform.OS !== 'android' && {
                  zIndex: 2
                })
              }}>
                <Text style={globalStyles.inputTopLabel}> State </Text>
                <DropDownPicker
                  style={globalStyles.input}
                  /*placeholder='State' */
                  containerStyle={{ height: 50 }}
                  items={getState()}
                  onChangeItem={(item) => updateCity(item.value)} />
              </View>

              <View style={{
                ...(Platform.OS !== 'android' && {
                  zIndex: 1
                })
              }}>
                <Text style={globalStyles.inputTopLabel}> City </Text>
                <DropDownPicker
                  style={globalStyles.input}
                  containerStyle={{ height: 50 }}
                  items={getCity()}
                  onChangeItem={(item) => handleCity(item.value)} />
              </View>

              
              <Button title='submit' onPress={props.handleSubmit}></Button>   

            </View>
            
          )}
          
        </Formik>

        
      </ScrollView>
      <StripeApp />


    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8ff',
    borderWidth: .5,
    padding: 8,
  },

  inputs: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    paddingBottom: 5,
  },
  dropdown: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 0,
    backgroundColor: '#FAFAFA',
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,

  },
  formDescription: {
    fontSize: 13, paddingBottom: 14
  },
  button: {
    
    height: 60,
    justifyContent: 'center',
    marginBottom: 5
  },
  addPhotos: {
    flex: 1, marginLeft: 15, marginTop: -5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  
  },
  submit: {
    margin: 20,
  },
  pay: {  
    
    color: 'gold',
    
  
  }
});