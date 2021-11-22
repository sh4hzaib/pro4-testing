import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect, Fragment } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Button,
  Keyboard,
  Modal,
  SafeAreaView,
  TouchableHighlight,
  Image,
  Dimensions,
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
//import { ImageBackground } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "./reviewForm";
//import Filter from './filter.js';
import firebase from "./firebase.js";
import FlatButton from "../shared/button";
import { useHeaderHeight } from "react-navigation-stack";
import { v4 as uuidv4 } from "uuid";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
const windowWidth = Dimensions.get("window").width;

//import { YellowBox } from 'react-native';
//<Image style={{ width: 40, height: 40, borderRadius: 60 / 2 }} source={{ uri: cat.categoryImage }} resizeMode='cover' />
//YellowBox.ignoreWarnings(['Remote debugger']);
// get test1

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  //  const [OriginalCopyUsers, setOriginalCopyUsers] = useState([]);
  //  const [SelectedTypeUsers,setSelectedTypeUsers] = useState([]);
  const [UserType, setUserType] = useState("single");

  const [Users, setUsers] = useState([]);
  const [AllSingleUsers, setAllSingleUsers] = useState([]);
  // test and remove below
  const [AllBusinessUsers, setAllBusinessUsers] = useState([]);
  const [businessAdsGroupedByEmail, setBusinessAdsGroupedByEmail] = useState(
    []
  );
  const [internationalAdsGroupedByEmail, setInternationalAdsGroupedByEmail] =
    useState([]);

  const ref = firebase.firestore().collection("users");
  const refAllBusinessCategory = firebase.firestore().collection("categories");
  const refMidCategory = firebase
    .firestore()
    .collection("singleMiddleCategories");
  const refHotCategory = firebase
    .firestore()
    .collection("hotBusinessCategories");
  const removedPosts = firebase.firestore().collection("removedPosts");
  //const refFirstFiveCategory = firebase.firestore().collection("firstFiveCategories");
  //const refHeaderStyles = firebase.firestore().collection("HeaderStyles");
  const [SelectedCategoryUsers, setSelectedCategoryUsers] = useState([]);
  const [SelectedCountryUsers, setSelectedCountryUsers] = useState([]);
  const [SelectedStateUsers, setSelectedStateUsers] = useState([]);

  //
  const [SelectedCategory1, setSelectedCategory1] = useState([]);
  const [SelectedCountry1, setSelectedCountry1] = useState([]);
  const [SelectedState1, setSelectedState1] = useState([]);
  const [SelectedCity1, setSelectedCity1] = useState([]);
  //
  const [ShowCountry, setShowCountry] = useState(false);
  const [ShowState, setShowState] = useState(false);
  const [ShowCity, setShowCity] = useState(false);
  //
  const [IsVisible1, setIsVisible1] = useState(false);
  const [IsVisible2, setIsVisible2] = useState(false);
  const [IsVisible3, setIsVisible3] = useState(false);
  const [IsVisible4, setIsVisible4] = useState(false);
  const [IsVisible5, setIsVisible5] = useState(false);
  //
  const [ddlVisible, setDdlVisible] = useState(true);
  //
  const [DateFilterItems, setDateFilterItems] = useState([
    { label: "Last 30 Days", value: 30 },
    { label: "Last 60 Days", value: 60 },
    { label: "Last 90 Days", value: 90 },
    { label: "Last 6 months", value: 180 },
    { label: "One Year", value: 360 },
  ]);
  //const [removeItemByDate, setRemoveItemByDate] = useState('');
  //   submit form
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [type, setType] = useState("");
  const [approved, setApproved] = useState("");
  // count
  const [generalCount, setGeneralCount] = useState("");
  const [businessCount, setBusinessCount] = useState("");
  const [roomForRentCount, setRoomForRentCount] = useState("");
  const [babysitterCount, setBabysitterCount] = useState("");
  const [jobsCount, setJobsCount] = useState("");
  const [othersCount, setOthersCount] = useState("");
  const [fashinCount, setFashinCount] = useState("");
  const [categoryCounter, setCategoryCounter] = useState("");
  const [fashinCount2, setFashinCount2] = useState("");
  const [forSaleCount, setForSaleCount] = useState("");

  //const [firstFiveCategories, setfirstFiveCategories] = useState(['']);
  const [midCategories, setMidCategories] = useState([]);
  const [hotCategories, setHotCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  //const [headerStyles, setHeaderStyles] = useState([]);
  // first 4 header images
  const [roomForRentImage, setRoomForRentImage] = useState("");
  // Filter button.
  const [modalOpen, setmodalOpen] = useState(false);
  //const [filterByCategory, setFilterByCategory] = useState('');

  const [modalVisible, setModalVisible1] = useState(false);
  // Modal
  const [isModalVisible, setModalVisible] = useState(true);

  const [ngShow, setNgShow] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    getBusinessAdsGroupedByEmail();
    setIsVisible1(false);
    setIsVisible2(false);
    setIsVisible3(false);
    setIsVisible4(false);
    setShowCountry(false);
    setShowState(false);
    setShowCity(false);
  };
  const [currentFilterCategory, setCurrentFilterCategory] = useState({
    value: "Room for Rent",
  });
  const [currentFilterCountry, setCurrentFilterCountry] = useState({
    value: "USA",
  });
  const [currentFilterState, setCurrentFilterState] = useState({ value: "VA" });
  const [currentFilterCity, setCurrentFilterCity] = useState({
    value: "McLean",
  });
  const [currentFilterDate, setCurrentFilterDate] = useState({});

  const [removedPostsID, setRemovedPostsID] = useState([100]);

  // Creates the first physical boxes(boxes were in the middle) with boarders and styles dynamically,   single midCategory
  function getMidCategories() {
    setLoading(true);
    refMidCategory.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMidCategories(items);
      setLoading(false);
    });
  }
  // Filtered by category, ads display when user click on the first boxes
  function filterByCategorySingle(selectedCat) {
    setLoading(true);
    setShowCountry(false);
    setShowState(false);
    setShowCity(false);
    ref
      .where("category", "==", selectedCat.value)
      .where("country", "==", currentFilterCountry.value)
      .where("state", "==", currentFilterState.value)
      .where("itemID", "not-in", removedPostsID)
      .where("status", "==", 1)
      .limit(100)
      // .where("lastUpdate", ">", new Date(Date.now() - 1000 * 3600 * 24 * 10))
      //.where('createdAt', '<', new Date(Date.now()- 604800000))
      //.where('city', '==', currentFilterCity)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        setFashinCount(items.length);
        setGeneralCount(
          currentFilterState.value + " > " + selectedCat.label + " "
        );
      });
  }

  // -------    //   ----------
  // filter 2- get all valid business ads
  function getBusinessAdsGroupedByEmail() {
    setLoading(true);
    setShowCountry(false);
    setShowState(false);
    setShowCity(false);
    ref
      .where("type", "==", "business")
      .where("country", "==", currentFilterCountry.value)
      .where("state", "==", currentFilterState.value)
      .where("itemID", "not-in", removedPostsID)
      .where("status", "==", 1)
      .orderBy("itemID", "desc")
      .orderBy("lastUpdate", "desc")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        setUserType("business");
        setAllBusinessUsers(items);

        var groupedItems = items.reduce((acc, value) => {
          // Group initialization
          acc[value.email] = [];
          // Grouping
          acc[value.email].push(value);
          return acc;
        }, {});

        // Change grouped objects to array and removing unnessury key value pairs..
        var changedValue = [];
        var changeToArray = Object.keys(groupedItems).reduce((array, key) => {
          changedValue.push(groupedItems[key][0]);
          return changedValue;
        }, []);

        setBusinessAdsGroupedByEmail(changeToArray);
        setLoading(false);
        setDdlVisible(true);
        setBusinessCount(items.length);
      });
  }
  //Filter by email - business ads will be filtered when top tile are clicked
  function filterByBusinessName(selectedCat) {
    setLoading(true);
    ref
      .where("type", "==", "business")
      .where("email", "==", selectedCat.email)
      .where("itemID", "not-in", removedPostsID)
      .where("status", "==", 1)
      .orderBy("itemID", "desc")
      .orderBy("lastUpdate", "desc")

      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        setFashinCount(items.length);
        setGeneralCount(
          currentFilterState.value + " > " + selectedCat.storeName + "  "
        );
        setLoading(false);
      });
  }

  // -------    //   ----------
  function getInternationalAds() {
    setLoading(true);
    setShowCountry(false);
    setShowState(false);
    setShowCity(false);
    ref
      .where("type", "==", "business")
      .where("status", "==", 1)
      .where("international", "==", 1)
      .where("itemID", "not-in", removedPostsID)
      .orderBy("itemID", "desc")
      .orderBy("lastUpdate", "desc")
      .limit(100)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        setUserType("business");
        setAllBusinessUsers(items);

        var groupedItemsInternational = items.reduce((acc, value) => {
          // Group initialization
          acc[value.email] = [];
          // Grouping
          acc[value.email].push(value);
          return acc;
        }, {});
        // Change grouped objects to array and removing unnessury key value pairs..
        var changedValueInternational = [];
        var changeToArrayInternational = Object.keys(
          groupedItemsInternational
        ).reduce((array, key) => {
          changedValueInternational.push(groupedItemsInternational[key][0]);
          return changedValueInternational;
        }, []);
        setInternationalAdsGroupedByEmail(changeToArrayInternational);
        setLoading(false);
        setDdlVisible(true);
        setBusinessCount(items.length);
      });
  }
  //Filter by email and international- business/international ads will be filtered when top tile are clicked
  function filterInternationalAds(selectedCat) {
    setLoading(true);
    ref
      .where("type", "==", "business")
      .where("email", "==", selectedCat.email)
      .where("itemID", "not-in", removedPostsID)
      .where("status", "==", 1)
      .where("international", "==", 1)
      .orderBy("itemID", "desc")
      .orderBy("lastUpdate", "desc")

      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        setFashinCount(items.length);
        setGeneralCount(
          currentFilterState.value + " > " + selectedCat.storeName + "  "
        );
        setLoading(false);
      });
  }
  // custom Ads database you have database control on display
  function filterByHotBusiness(selectedCat) {
    setLoading(true);
    ref
      .where("type", "==", "business")
      .where("amharicStoreName", "==", selectedCat.amharicStoreName)
      .where("storeName", "==", selectedCat.storeName)
      .where("itemID", "not-in", removedPostsID)
      .where("status", "==", 1)
      .orderBy("itemID", "desc")
      .orderBy("lastUpdate", "desc")

      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        setGeneralCount(selectedCat.amharicStoreName);
        setFashinCount(items.length);
        setGeneralCount(
          currentFilterState.value + " > " + selectedCat.storeName + "  "
        );
        setLoading(false);
      });
  }

  /* function getFirstFiveCategories() {
    setLoading(true);
    refFirstFiveCategory
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setfirstFiveCategories(items);
        setLoading(false);
      });
  }
*/
  function getHotCategories() {
    setLoading(true);
    refHotCategory.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setHotCategories(items);
      setLoading(false);
    });
  }
  /* function getFirstFiveCategories() {
    setLoading(true);
    refFirstFiveCategory
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setfirstFiveCategories(items);
        setLoading(false);
      });
  }
*/

  function removePosts() {
    //setLoading(true);
    removedPosts.onSnapshot((querySnapshot) => {
      const items = [];
      const removedItemsArray = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        if (doc.data().itemID) {
          removedItemsArray.push(doc.data().itemID);
        }
      });
      setRemovedPostsID(removedItemsArray);
    });
  }
  function getAllCategories() {
    setLoading(true);
    refAllBusinessCategory.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAllCategories(items);
      setLoading(false);
    });
  }
  // filter 2- get single users
  function getTotalCount() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setLoading(false);
    });
  }
  //get header Styles
  /*function getHeaderStyles() {
    setLoading(true);
    refHeaderStyles
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setHeaderStyles(items);
        setLoading(false);
      });
  }*/
  // Filter 1 - get all users(Business and Single)
  function getAllUsers() {
    setLoading(true);
    setShowCountry(false);
    setShowState(false);
    setShowCity(false);
    ref
      //.where('category','!=', '')
      .where("type", "==", "single")
      .where("itemID", "not-in", removedPostsID)
      .where("status", "==", 1)

      //.where('country', '==', 'USA')
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        //setOriginalCopyUsers(items);
        setLoading(false);
      });
  }
  // filter 2- get single users
  function getSingleUsers() {
    setLoading(true);
    setShowCountry(false);
    setShowState(false);
    setShowCity(false);
    ref
      //.where('type', '==', 'single')

      .where("status", "==", 1)
      .where("itemID", "not-in", removedPostsID)
      .orderBy("itemID", "desc")
      .orderBy("lastUpdate", "desc")
      .limit(200)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        setUserType("single");
        setAllSingleUsers(items);
        setLoading(false);
        setDdlVisible(true);
        //setGeneralCount(items.length);
      });
  }

  // Top 5 listing, Filter by Category 1
  function getCategory() {
    var data = [];
    var count = [];
    var total = 0;
    // var selectedType = OriginalCopyUsers;
    //if (UserType == 'single')
    var selectedType = AllSingleUsers;
    //if (UserType == 'business')
    //selectedType = AllBusinessUsers;

    var groupByCity = selectedType.reduce((acc, it) => {
      acc[it.category] = acc[it.category] + 1 || 1;
      return acc;
    }, {});

    // data.push
    for (const i in groupByCity) {
      total = total + groupByCity[i];
      /* if((i=='') || (!i || 0 === i.length) || (i == "undefined"))
       {  data.push({"label":'na' + '   (' + groupByCity[i] + ')', "value":i, "total":total});   }
       else */
      {
        data.push({
          label: i + "   (" + groupByCity[i] + ")",
          value: i,
          total: total,
        });
      }
    }
    return data;
  }
  function handleCategoryChange(selectedCategory) {
    setLoading(true);
    //  getCity();
    // getState();

    ref
      //.where('category','!=', '')
      //.where('type', '==', UserType)
      .where("category", "==", selectedCategory.value)
      .where("itemID", "not-in", removedPostsID)
      .where("status", "==", 1)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        setSelectedCategoryUsers(items);
        setSelectedCategory1(selectedCategory.value);
        setLoading(false);
        setShowCountry(true);
        setShowState(false);
        setShowCity(false);
        setGeneralCount(selectedCategory.value);
        setFashinCount(items.length);
        setCurrentFilterCategory(selectedCategory);
      });
  }
  // filter by Country 2
  function getCountry() {
    var data = [];
    //var count =[];
    var total = 0;
    //if (UserType == 'single')
    var selectedType = AllSingleUsers;
    //if (UserType == 'business')
    //  selectedType = AllBusinessUsers;
    //if ((!SelectedCategoryUsers || 0 !== SelectedCategoryUsers.length)) {
    // selectedType = SelectedCategoryUsers;
    //}
    // var y = selectedType.createdAt.toDate();
    // var z = Math.round(Date.now() - selectedType.createdAt.toDate());

    var groupByCity = selectedType.reduce((acc, it) => {
      acc[it.country] = acc[it.country] + 1 || 1;
      return acc;
    }, {});

    // data.push
    for (const i in groupByCity) {
      total = total + groupByCity[i];
      /*if((i=='') || (!i || 0 === i.length) || (i == "undefined"))
           {  data.push({"label":'na' + '   (' + groupByCity[i] + ')', "value":i, "total":total});   }
           else*/
      {
        data.push({
          label: i + "   (" + groupByCity[i] + ")",
          value: i,
          total: total,
        });
      }
    }
    return data;
  }
  function handleCountryChange(selectedCountry) {
    setLoading(true);
    if (selectedCountry.value) var showCategory1 = selectedCountry.value;
    else showCategory1 = "";
    if (selectedCountry.state) var showState1 = selectedCountry.state;
    else showState1 = "";
    if (selectedCountry.country) var showCountry1 = selectedCountry.country;
    else showCountry1 = "";
    if (selectedCountry.city) var showCity1 = selectedCountry.city;
    else showCity1 = "";
    // getCity();
    ref
      .where("type", "==", UserType)
      .where("category", "==", SelectedCategory1)
      .where("country", "==", selectedCountry.value)
      .where("itemID", "not-in", removedPostsID)
      .where("status", "==", 1)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        setSelectedCountryUsers(items);
        setSelectedCountry1(selectedCountry.value);
        setLoading(false);
        setShowState(true);
        setShowCity(false);
        setFashinCount(items.length);
        setCurrentFilterCountry(selectedCountry);
      });
  }
  // filter by State
  // add to store count at the box
  function getState() {
    var data = [];
    //var count =[];
    var total = 0;
    //if (UserType == 'single')
    var selectedType = AllSingleUsers;
    //if (UserType == 'business')
    //   selectedType = AllBusinessUsers;
    // if ((!SelectedCountryUsers || 0 !== SelectedCountryUsers.length)) {
    // selectedType = SelectedCountryUsers;
    // }
    var groupByCity = selectedType.reduce((acc, it) => {
      acc[it.state] = acc[it.state] + 1 || 1;
      return acc;
    }, {});

    // data.push
    for (const i in groupByCity) {
      total = total + groupByCity[i];
      /* if((i=='') || (!i || 0 === i.length) || (i == "undefined"))
          {  data.push({"label":'na' + '   (' + groupByCity[i] + ')', "value":i, "total":total});   }
          else */
      {
        data.push({
          label: i + "   (" + groupByCity[i] + ")",
          value: i,
          total: total,
        });
      }
    }
    return data;
  }

  function handleStateChange(selectedState) {
    setLoading(true);
    if (selectedState.value) var showCategory1 = selectedState.value;
    else showCategory1 = "";
    if (selectedState.state) var showState1 = selectedState.state;
    else showState1 = "";
    if (selectedState.country) var showCountry1 = selectedState.country;
    else showCountry1 = "";
    if (selectedState.city) var showCity1 = selectedState.city;
    else showCity1 = "";
    ref
      .where("type", "==", UserType)
      .where("category", "==", SelectedCategory1)
      .where("country", "==", SelectedCountry1)
      .where("state", "==", selectedState.value)
      .where("itemID", "not-in", removedPostsID)
      .where("status", "==", 1)
      .orderBy("lastUpdate", "desc")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        setSelectedStateUsers(items);
        setSelectedState1(selectedState.value);
        setLoading(false);
        setShowState(true);
        setShowCity(true);
        setFashinCount(items.length);
        setCurrentFilterState(selectedState);
      });
  }
  // end state end Filter
  // Filter City 4
  function getCity() {
    var data = [];
    //var count =[];
    var total = 0;
    //if (UserType == 'single')
    var selectedType = AllSingleUsers;
    //if (UserType == 'business')
    //selectedType = AllBusinessUsers;
    //if ((!SelectedStateUsers || 0 !== SelectedStateUsers.length)) {
    // selectedType = SelectedStateUsers;
    //}
    var groupByCity = selectedType.reduce((acc, it) => {
      acc[it.city] = acc[it.city] + 1 || 1;
      return acc;
    }, {});
    // data.push
    for (const i in groupByCity) {
      total = total + groupByCity[i];
      /* if((i=='') || (!i || 0 === i.length) || (i == "undefined"))
          {  data.push({"label":'na' + '   (' + groupByCity[i] + ')', "value":i, "total":total});   }
          else */
      {
        data.push({
          label: i + "   (" + groupByCity[i] + ")",
          value: i,
          total: total,
        });
      }
    }
    return data;
  }

  function handleChange(selectedCity) {
    setLoading(true);
    ref
      .where("type", "==", UserType)
      .where("category", "==", SelectedCategory1)
      .where("country", "==", SelectedCountry1)
      .where("state", "==", SelectedState1)
      .where("city", "==", selectedCity.value)
      .where("itemID", "not-in", removedPostsID)
      .where("status", "==", 1)
      .orderBy("lastUpdate", "desc")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUsers(items);
        setLoading(false);
        setFashinCount(items.length);
        setCurrentFilterCity(selectedCity);
      });
  }
  // filter by Category
  // // Filter City 4
  function getDate() {
    var data = [];
    //var count =[];
    var total = 0;
    //if (UserType == 'single')
    var selectedType = AllSingleUsers;
    //if (UserType == 'business')
    // selectedType = AllBusinessUsers;
    var groupByCity = selectedType.reduce((acc, it) => {
      acc[it.city] = acc[it.city] + 1 || 1;
      return acc;
    }, {});
    // data.push
    for (const i in groupByCity) {
      total = total + groupByCity[i];
      if (i == "" || !i || 0 === i.length || i == "undefined") {
        data.push({
          label: "na" + "   (" + groupByCity[i] + ")",
          value: i,
          total: total,
        });
      } else {
        data.push({
          label: i + "   (" + groupByCity[i] + ")",
          value: i,
          total: total,
        });
      }
    }
    return data;
  }

  const addReview = (review) => {
    /*setReviews((currentReviews) => {
      return [review, ...currentReviews];
    });*/
    setmodalOpen(false);
  };
  const filter = (filter) => {
    /*setReviews((currentReviews) => {
      return [review, ...currentReviews];
    });*/
    //setModalVisible(false);
  };

  useEffect(() => {
    //getHeaderStyles();
    //getFirstFiveCategories();
    removePosts();
    getMidCategories();
    getHotCategories();
    //getAllCategories();

    getInternationalAds();
    getBusinessAdsGroupedByEmail();
    getSingleUsers();
    //getTotalCount();
    //getAllUsers();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar animated={true} backgroundColor="#158A3C" />

      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={20}
              onPress={() => setmodalOpen(false)}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
            />
            <ReviewForm addReview={addReview} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.container}>
        <Modal visible={isModalVisible} animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <View style={styles.modal}>
                <View style={styles._row}>
                  <Text style={styles.labelHeader}> Filters </Text>
                  <Image
                    source={require("../assets/filter.png")}
                    style={{ height: 35, width: 35 }}
                  />
                </View>
                {ddlVisible ? (
                  <Text isVisible={IsVisible1} style={styles.label}>
                    {" "}
                    Select Category
                  </Text>
                ) : null}
                {ddlVisible ? (
                  <DropDownPicker
                    placeholder="select category"
                    itemStyle={{ justifyContent: "flex-start" }}
                    items={getCategory()}
                    containerStyle={{ height: 50 }}
                    onChangeItem={(item) => handleCategoryChange(item)}
                    isVisible={IsVisible1}
                    onOpen={() => {
                      setIsVisible1(true);
                      setIsVisible2(false);
                      setIsVisible3(false);
                      setIsVisible4(false);
                    }}
                    onClose={() => {
                      setIsVisible1(false);
                      setIsVisible2(false);
                      setIsVisible3(false);
                      setIsVisible4(false);
                    }}
                  />
                ) : null}
                {ShowCountry ? (
                  <Text isVisible={IsVisible2} style={styles.label}>
                    {" "}
                    Country
                  </Text>
                ) : null}
                {ShowCountry ? (
                  <DropDownPicker
                    placeholder="Country"
                    items={getCountry()}
                    containerStyle={{ height: 50 }}
                    onChangeItem={(item) => handleCountryChange(item)}
                    isVisible={IsVisible2}
                    onOpen={() => {
                      setIsVisible2(true);
                      setIsVisible1(false);
                      setIsVisible3(false);
                      setIsVisible4(false);
                    }}
                    onClose={() => {
                      setIsVisible1(false);
                      setIsVisible2(false);
                      setIsVisible3(false);
                      setIsVisible4(false);
                    }}
                  />
                ) : null}
                {ShowState ? (
                  <Text isVisible={IsVisible3} style={styles.label}>
                    {" "}
                    State
                  </Text>
                ) : null}
                {ShowState ? (
                  <DropDownPicker
                    placeholder="State"
                    items={getState()}
                    containerStyle={{ height: 50 }}
                    onChangeItem={(item) => handleStateChange(item)}
                    isVisible={IsVisible3}
                    onOpen={() => {
                      setIsVisible3(true);
                      setIsVisible1(false);
                      setIsVisible2(false);
                      setIsVisible4(false);
                    }}
                    onClose={() => {
                      setIsVisible1(false);
                      setIsVisible2(false);
                      setIsVisible3(false);
                      setIsVisible4(false);
                    }}
                  />
                ) : null}
                {ShowCity ? (
                  <Text isVisible={IsVisible4} style={styles.label}>
                    {" "}
                    City
                  </Text>
                ) : null}
                {ShowCity ? (
                  <DropDownPicker
                    placeholder="City"
                    items={getCity()}
                    containerStyle={{ height: 50 }}
                    onChangeItem={(item) => handleChange(item)}
                    isVisible={IsVisible4}
                    onOpen={() => {
                      setIsVisible4(true);
                      setIsVisible1(false);
                      setIsVisible2(false);
                      setIsVisible3(false);
                    }}
                    onClose={() => {
                      setIsVisible1(false);
                      setIsVisible2(false);
                      setIsVisible3(false);
                      setIsVisible4(false);
                    }}
                  />
                ) : null}
                <TouchableOpacity
                  style={styles.doneBtn}
                  onPress={() => {
                    toggleModal(!isModalVisible);
                  }}
                >
                  <Text style={styles.findPosts}>Find Posts</Text>
                  {/* <Button
                    style={styles.findPosts}
                    title="Find Posts"
                    onPress={() => {
                      toggleModal(!isModalVisible);
                    }}
                  ></Button> */}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      <TouchableOpacity
        style={[
          styles.searchFilter,
          {
            flexDirection: "row",
            paddingRight: 20,
            justifyContent: "space-between",
            marginBottom: 15,
          },
        ]}
        onPress={() => toggleModal(true)}
      >
        <Text
          style={{
            fontSize: 15,
            color: "#5a5a5a",
            fontFamily: "Poppins-Medium",
          }}
        >
          {" "}
          Filters
        </Text>
        <MaterialIcons
          tyle={{ flexDirection: "row", justifyContent: "center" }}
          name="search"
          size={30}
          color="#6649C4"
        />
      </TouchableOpacity>

      <View style={styles.addPost}>
        <TouchableHighlight
          style={styles.addPost1}
          onPress={() => toggleModal(true)}
        >
          <Text style={styles.breadCrumb}> {generalCount} </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setmodalOpen(true)}>
          <Text style={styles.breadCrumb}>({fashinCount}) Posts</Text>
        </TouchableHighlight>
        <View style={styles.addPost3} onPress={() => setmodalOpen(true)}>
          <MaterialIcons
            name="add"
            size={20}
            color="#6649C4"
            onPress={() => setmodalOpen(true)}
          />
          <TouchableHighlight onPress={() => setmodalOpen(true)}>
            <Text
              style={{
                color: "#6649C4",
                fontFamily: "Poppins-Medium",
                fontSize: 12,
              }}
            >
              {" "}
              Add Posts{" "}
            </Text>
          </TouchableHighlight>
        </View>
      </View>

      <View
        style={{
          ...(Platform.OS !== "android" && {
            zIndex: 3,
          }),
          flexDirection: "row",
        }}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Fragment>
            {midCategories.map((cat, i) => {
              return (
                <TouchableOpacity
                  style={styles.firstFiveTopBox}
                  onPress={() => filterByCategorySingle(cat)}
                  key={i}
                >
                  <Text style={styles.allTopBoxTextStyle}>
                    {" "}
                    {cat.amharicLabel}{" "}
                  </Text>
                  <Text style={styles.allTopBoxTextStyle}> {cat.label}</Text>
                  <Text style={styles.allTopBoxTextStyle}>
                    {" "}
                    {currentFilterState.value}{" "}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {businessAdsGroupedByEmail.map((cat, i) => {
              return (
                <TouchableOpacity
                  style={styles.secondBoxHotBusiness}
                  onPress={() => filterByBusinessName(cat)}
                  key={i}
                >
                  <Text style={styles.allTopBoxTextStyle}> {cat.label}</Text>
                  <Text style={styles.allTopBoxTextStylefilterByBusinessName}>
                    {" "}
                    {cat.storeName}{" "}
                  </Text>
                  <Text style={styles.allTopBoxTextStyle}>
                    {" "}
                    {cat.amharicStoreName}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 8,
                      color: "#2196f3",
                    }}
                  >
                    {" "}
                    Ethiopian Stores/Businesses Near You{" "}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {internationalAdsGroupedByEmail.map((cat, i) => {
              return (
                <TouchableOpacity
                  style={styles.secondBoxHotBusiness}
                  onPress={() => filterInternationalAds(cat)}
                  key={i}
                >
                  <Text style={styles.allTopBoxTextStyle}> {cat.hotTitle}</Text>
                  <Text style={styles.allTopBoxTextStylefilterByBusinessName}>
                    {" "}
                    {cat.storeName}{" "}
                  </Text>
                  <Text style={styles.allTopBoxTextStyle}>
                    {" "}
                    {cat.amharicStoreName}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 8,
                      color: "#2196f3",
                    }}
                  >
                    {" "}
                    International Ads{" "}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {hotCategories.map((cat, i) => {
              return (
                <TouchableOpacity
                  style={styles.secondBoxHotBusiness}
                  key={i}
                  onPress={() => filterByHotBusiness(cat)}
                >
                  <Text style={styles.allTopBoxTextStyle}>
                    {" "}
                    {cat.hotTitle}{" "}
                  </Text>
                  <Text style={styles.allTopBoxTextStylefilterByBusinessName}>
                    {" "}
                    {cat.storeName}{" "}
                  </Text>
                  <Text style={styles.allTopBoxTextStyle}>
                    {" "}
                    {cat.amharicStoreName}
                  </Text>
                  <Text style={styles.allTopBoxTextStyle}> International </Text>
                </TouchableOpacity>
              );
            })}
          </Fragment>
        </ScrollView>
      </View>

      <View
        style={{
          ...(Platform.OS !== "android" && {
            zIndex: 0,
          }),
        }}
      >
        <FlatList
          data={Users}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", item)}
            >
              <Card>
                <View style={{flexDirection: "row",flexWrap:"wrap" }}>
                  <Text style={{ fontFamily: "Poppins-Medium",fontSize:12 }}>
                    {" "}
                    Email address : {item.email}{" "}
                  </Text>
                  <Text
                    style={[
                      styles.time,
                      { flexDirection: "row", textAlign: "right" },
                    ]}
                  >
                    {" "}
                    ItemID {item.itemID}{" "}
                  </Text>

                  <Text
                    style={[
                      styles.time,
                      { flexDirection: "row", textAlign: "left" },
                    ]}
                  >
                    {" "}
                    {item.category} {">"} {item.storeName}{" "}
                    {item.amharicStoreName}
                  </Text>
                  <Text
                    style={[
                      styles.time,
                      {flexDirection: "row", textAlign: "right" },
                    ]}
                  >
                    {" "}
                    {item.lastUpdate
                      ? Math.round(
                          (Date.now() - item.lastUpdate.toDate()) /
                            (1000 * 3600 * 24)
                        )
                      : "NA"}{" "}
                    days ago
                  </Text>
                  <Text
                    style={[
                      styles.time,
                      { flexDirection: "row", textAlign: "left",flexWrap:"wrap" },
                    ]}
                  >
                    {"Type ="} {item.type} {"  status = "}
                    {item.status} {">"} {item.country} {">"} {item.state} {">"}{" "}
                    {item.city}
                  </Text>
                  <Text style={{ fontFamily: "Poppins-Medium",fontSize:12,flexWrap:"wrap"}}>
                    {" "}
                    {" Filter by Category "} {currentFilterCategory.value}
                    {"  Filter by Country > "} {currentFilterCountry.value}{" "}
                  </Text>
                  <Text
                    style={[
                      styles.time,
                      { textAlign: "left" },
                    ]}
                  >
                    {" "}
                    {" filter by State  = "}
                    {currentFilterState.value} {" filter by city = "}
                    {currentFilterCity.value}{" "}
                  </Text>
                </View>
                {/* <View style={{ flex: 1, flexDirection: "row" }}></View> */}
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View
                    style={{
                      width: "100%",
                      height: 2,
                      backgroundColor: "lightblue",
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  {console.log(">>>>>>>>>>>", item)}
                  {item.image1 ? (
                    <Image
                      style={styles.imageSize}
                      source={{ uri: item.image1 }}
                      resizeMode="cover"
                    />
                  ) : null}
                  <Text
                    style={[
                      styles.description,
                      { flex: 1, flexDirection: "row", textAlign: "left" },
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.country,
                    { flex: 1, flexDirection: "row", textAlign: "left" },
                  ]}
                >
                  {item.country} {">"} {item.state} {">"} {item.city}{" "}
                </Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 4,
    borderColor: "red",
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  _row: {
    flexDirection: "row",
    alignItems: "center",
    // width: windowWidth,
    justifyContent: "space-between",
    height: 50,
    borderBottomWidth: 2,
    borderColor: "#6649C4",
    marginBottom: 20,
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalContent: {
    flex: 1,
    padding: 25,
    paddingTop: 1,
  },
  //header style
  main: {
    flex: 1,
  },
  dropdown: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "stretch",
  },
  safeAreaView: {
    backgroundColor: "#f5fbff",
  },
  cancelx: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 1,
    borderWidth: 2,
    padding: 50,
    borderRadius: 10,
    alignSelf: "center",
    borderColor: "red",
  },
  secondBoxHotBusiness: {
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 2,
    marginBottom: 5,

    padding: 3,
    margin: 4,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#fbffed",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
  },
  searchFilter: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "#fbffed",
    marginBottom: 8,
    borderWidth: 0.4,
    borderColor: "#6649C4",
  },
  firstFiveTopBox: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,

    padding: 3,
    margin: 5,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#FFFFFF",

    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: 120,
    height: 160,
    color: "#0D7E73",
  },
  allTopBoxTextStyle: {
    textAlign: "center",
    fontSize: 16,
    padding: 4,
    color: "#0D7E73",
    fontFamily: "Poppins-Medium",
  },
  generalCategory2x: {
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "green",
    padding: 5,
    margin: 5,
    borderRadius: 10,
    fontFamily: "Poppins-Medium",
  },
  business: {
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "green",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  fashin: {
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "yellow",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  books: {
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "blue",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  filter: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 3,
    borderWidth: 2,
    borderColor: "#0D7E73",
    padding: 5,
    marginLeft: 20,
    borderRadius: 10,
  },
  addPost: {
    flexDirection: "row",
    borderColor: "#0D7E73",
    // marginLeft: 20,
    borderRadius: 10,
    margin: 5,
    marginBottom: 10,
  },
  addPost2: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 6,
    paddingTop: 6,
    paddingRight: 10,
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#0D7E73",
    fontWeight: "bold",
  },
  addPost3: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    padding: 6,
    position: "absolute",
    right: 0,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#6649C4",
    // elevation: 3,
    // backgroundColor: "#FFFFFF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    // fontWeight: 'bold',
    paddingTop: 10,
    flexDirection: "row",
    fontFamily: "Poppins-Medium",
    color: "grey",
  },
  labelHeader: {
    // fontWeight: 'bold',
    color: "#242024",
    flexDirection: "row",
    // padding: 5,
    borderColor: "#2196F3",
    // borderBottomWidth: 1,
    // textAlign: 'center',
    justifyContent: "flex-start",
    fontSize: 20,
    fontFamily: "Poppins-Medium",
  },
  doneBtn: {
    marginTop: 40,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6649c4",
  },
  findPosts: {
    // position: "absolute",
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    color: "white",
  },

  imageSize: {
    height: 60,
    width: 60,
  },
  description: {
    textAlign: "center",
    color: "gray",
    alignContent: "center",
    margin: 20,
    fontFamily: "Poppins-Medium",
  },
  description2: {
    textAlign: "center",
    color: "gray",
    alignContent: "center",
    margin: 20,
  },
  time: {
    color: "#0D7E73",
    fontFamily: "Poppins-Medium",
    fontSize:12
  },
  country: {
    color: "#003B73",
    fontFamily: "Poppins-Medium",
  },
  backGroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 2,
    borderRadius: 10,
    padding: 3,
    margin: 4,
    borderRadius: 10,
    elevation: 3,
  },
  breadCrumb: {
    margin: 5,
    fontSize: 16,
    color: "#6649C4",
    // fontWeight: "bold",
    fontFamily: "Poppins-Medium",
  },
});
