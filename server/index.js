
import express from "express";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect, Fragment } from 'react';
import {
  Platform, StyleSheet,Text, TextInput, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView,
  Button, Keyboard, Modal, SafeAreaView, TouchableHighlight, Image
} from 'react-native';
import Stripe from "stripe";

const app = express();
const port = 3000; //add your port herehttp://localhost:19007/


const PUBLISHABLE_KEY = "pk_test_51JgY4yCHezrCmuoS8yUxdU9rhtYlMnamGdFs3wQ9pzkGY3juWAw4uZkGPOtbxncZm4UEikqtbyUDr04Z3GpPDzOP00UIErn9xT";
const SECRET_KEY = "sk_test_51JgY4yCHezrCmuoSnvu0KSG8NCGt0xAT1dVjb5T8M2kALT9qsckwjbLA1rSF3rXbUuS2irkOtvCiyfVawFKtMDPJ00OpWEzMss";


app.listen(port, () => {
  //console.log(`Example app listening at http://localhost:${port}`);
});
/*

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });



app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});*/