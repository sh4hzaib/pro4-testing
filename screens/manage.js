import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect, Fragment } from 'react';
import {Item, passwordVisibility,rightIcon, StatusBar, InputField, Container,Form, Label, TextInput,  Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView,
  Button, Keyboard, Modal, SafeAreaView, TouchableHighlight, Image
} from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { v4 as uuidv4 } from 'uuid';
//const removedPosts = firebase.firestore().collection("removedPosts");
import firebase from "./firebase.js";


import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function Manage() {
  const refFilter = firebase.firestore().collection("users");
  const refRemovedPosts = firebase.firestore().collection("removedPosts");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [varifiedEmail, setVarifiedEmail] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
 
  const [singleUsers, setSingleUsers] = useState([]);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [removedPostsID, setRemovedPostsID] = useState([100]);
  const [count, setCount] = useState('');
  
  /*function initialEmail(unverifiedEmail) {
    if (unverifiedEmail) {
      setEmail(unverifiedEmail);
    }
  }
  function initialPassword(pw) {
    if (pw) {
      setPassword(pw)
    }

  }*/
  function signUp(email, password)  {
    
      firebase
          .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          //send verification mail.
          userCredential.user.sendEmailVerification();
          //auth.signOut();
          alert("An email has been sent. Please check your inbox and confirm");
          setShowCreateAccount(false);
        }).catch(function (e) {
          alert(e)
        })
  }


  function signIn(email, password) {
    validateEmail(email);
    validatePassword(password);
    var email = email.trim();
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(res => {
           const user = firebase.auth().currentUser;
           setShowCreateAccount(false);
           if (user && user !== null) {
             if (user.emailVerified == true) {
               setVarifiedEmail(user.email);         
             }
             if (user.emailVerified == false) {
              alert("An email has been sent. Please check your inbox and confirm or reset your password");
             }
              //setVarifiedEmail(user.email);
            }

      }).catch(function (e) {
        alert(e)
      })
      if (varifiedEmail) {
        filterByEmail(varifiedEmail);
      }
  }
  function signOut() {
    firebase
    .auth()
      .signOut()
    setVarifiedEmail('');
  }
  
  function resetPassword(email) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(function (user) {
        setPassword('');
        alert('An email has been sent. Please check your inbox')
      }).catch(function (e) {
        alert(e)
      })
  }


  function validateEmail(x) {
    var text = x.trim();
    setEmail(text)
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmailErrorMsg("The email address is not valid");
      return false;
    }
    else {
      
      setEmailErrorMsg("");
      
    }
  }
  function validatePassword(pw) {
    
      var initialPW = pw.trim();
      setPassword(initialPW)
    
  }
 


   // Filtered by category, ads display when user click on the first boxes
  function filterByEmail(varifiedEmail) {
    //removedItems();
     
       refFilter
         .where('email', '==', varifiedEmail)
         .where('itemID', 'not-in', removedPostsID)
         .limit(20)
         // .where("lastUpdate", ">", new Date(Date.now() - 1000 * 3600 * 24 * 10))      
         //.where('createdAt', '<', new Date(Date.now()- 604800000))
         //.where('city', '==', currentFilterCity)
         .onSnapshot((querySnapshot) => {
           const items = [];
           querySnapshot.forEach((doc) => {
             items.push(doc.data());
           });
           setSingleUsers(items);
           setCount(items.length);
         });
     
     }
  

  
   // Filtered by category, ads display when user click on the first boxes
   function removeItem(itemID) {
     if (varifiedEmail) {
       const newPost = {
         itemID: itemID,
         email: varifiedEmail,
         id: uuidv4(),
         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
         lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
                      
       };

       refRemovedPosts
         .doc(newPost.id)
         .set(newPost)
         .catch((err) => {
           console.error(err);
         });
       if (varifiedEmail) {
         filterByEmail(varifiedEmail);
       }
     }
   
  }


  function removedItems() {
   
    refRemovedPosts
      .onSnapshot((querySnapshot) => {
        const items = [];
        const removedItemsArray = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
          if (doc.data().itemID) {
            removedItemsArray.push(doc.data().itemID);
          }
        });
        setRemovedPostsID(removedItemsArray);
       // setSingleUsers(items);
      //  setRemovedPostsID(items[0].removedPosts);
      });
      if (varifiedEmail){
        filterByEmail(varifiedEmail);
    }
  }

  function showHideCreateAccount(cat) {
    if (cat.value == "Yes" || cat == "Yes") {
      setShowCreateAccount(true);
    }
    else {
      setShowCreateAccount(false); 
    }
  }
 
    useEffect(() => {
      removedItems();
     // filterByEmail(varifiedEmail);
    // signUp();
     
      //email,password
      
    }, [varifiedEmail]);
    
  return (
      
    <SafeAreaView style={globalStyles.container}>
    <StatusBar
     animated={true}
     backgroundColor="#158A3C"
      />
       <ScrollView vertical={true}>  
        <View style={styles.container}>
        {showCreateAccount ? <Text> </Text> : null}
        {showCreateAccount ? <Text> Easy 1 step, to create an account</Text> : null}
          {showCreateAccount ? <Text> Add your email and a new password, then click "Create an Account'</Text> : null}
           
       
      <Text style={globalStyles.errorText}>  {emailErrorMsg} </Text>
          {!varifiedEmail ? <Text style={globalStyles.inputTopLabel}>Email</Text> : null}
          {!varifiedEmail ? <TextInput
            style={globalStyles.input}
            onChangeText={(unverifiedEmail) => validateEmail(unverifiedEmail)}
            value={email}
          />
            : null}
          {!varifiedEmail ?
            <Text style={globalStyles.inputTopLabel}>Password</Text> : null}
          {!varifiedEmail ? <TextInput
            style={globalStyles.input}
            onChangeText={unverifiedPassword => validatePassword(unverifiedPassword)}
            value={password}
            secureTextEntry={true} /> : null}
       
          {!showCreateAccount && !varifiedEmail?
        <Button
          title="Sign In"
          onPress={() => signIn(email, password)}
          />
         : null}  

          {!varifiedEmail && showCreateAccount ?
          <Button 
          title="Create an Account"
          onPress={() => signUp(email, password)}/>
            : null}
          {!varifiedEmail ?
            <Text style={globalStyles.links} onPress={() => resetPassword(email, password)} > Forgot password </Text>
            : null}
          {!showCreateAccount && !varifiedEmail?
            <Text style={globalStyles.links} onPress={() => { showHideCreateAccount('Yes') }}>First time Logging in? Click Here  </Text>
            : null}
        
        {showCreateAccount && !varifiedEmail?
            <Text style={globalStyles.links}  onPress={() => signIn(email, password)}>Sign In </Text>
            : null}
            {varifiedEmail ?
            <Text style={globalStyles.links}  onPress={() => signOut()}>Sign Out </Text>
            : null}
      </View>     
        <View>
          {varifiedEmail ?
            <Text> User name: {varifiedEmail}  Number of Posts : {count}</Text>
            : null}
          
         </View>
        <FlatList
          data={singleUsers}
          renderItem={({ item }) => ( 
            <View style={styles.itemBox}>
            <Text style={styles.removePost}
                  title=" Remove Post"
                onPress={() => removeItem(item.itemID)} > Remove post 
            </Text>
              
            <Text>  Post#  {item.itemID} </Text>
            <ScrollView horizontal={true}>
                
            <View style={{ flex: 1, flexDirection: 'row' }}>                               
            <Text style={[styles.time, { margin:5, flex: 1, flexDirection: 'row', textAlign: "left" }]}>   Posted {item.lastUpdate ? Math.round(((Date.now() - item.lastUpdate.toDate()) / (1000 * 3600 * 24))) : 'NA'} days ago</Text>                                
                </View>
                <View style={{ flex: 2, flexDirection: 'row', padding: 5 }}>              
                <Text style={[styles.description, { flex: 1, flexDirection: 'row', textAlign: "left" }]}>{item.description2}</Text> 
                </View>
               
              </ScrollView>
            </View>
          
          )}
        />
         </ScrollView>
    

      </SafeAreaView>
  
  );
};



const styles = StyleSheet.create({
  container: {
   
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
  imageSize: {
    height: 35,
    width: 35,
    alignContent: "flex-start",
    
  },
  time: {
    margin: 5,
    color: 'darkblue',
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
    marginBottom:5
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
  firstFiveTopBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
   
    padding: 3,
    margin: 5,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#FFFFFF",
   
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: 120,
    height:160,
    color: '#0D7E73',
   
  },
  allTopBoxTextStyle:{
    textAlign: 'center',
    fontSize: 16,
    padding: 4,
    color: '#0D7E73'
  },
  generalCategory2x: {
    marginBottom: 5,
    borderWidth: 3,
    borderColor: 'green',
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  itemBox: {
    borderColor: 'blue',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 10
  },
  removePost:{
  alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 4,
    elevation: 4,
    backgroundColor: '#FD5602',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    width: '40%',

  }
});