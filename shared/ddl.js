


/*import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import SearchableDropdown from 'react-native-searchable-dropdown';
import firebase from "../screens/firebase.js";

import FlatButton from '../shared/button';

export default function Dropdown() {

// filter 
const [loading, setLoading] = useState(false);
const [Users, setUsers] = useState([]);
const [UsersCopy, setUsersCopy] = useState([]);
const [Groups, setGroups] = useState(0);
const ref = firebase.firestore().collection("users");
function getUsers() {
  setLoading(true);
  ref

	//.where('country', '==', USA)
	//.where('title', '==', 'School1') // does not need index
	//.where('score', '<=', 10)    // needs index
	//.orderBy('owner', 'asc')
	//.limit(3)
	//.where('type', '==', 'single')
	
    .where('city','!=', '')
	.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
		setUsers(items); 
		setUsersCopy(items);       
		setLoading(false);
	  });
	}
	
useEffect(() => {
  getUsers(); 	
  
  // eslint-disable-next-line
}, []);

	return(
		<div id="container">
			Cascading or Dependent Dropdown using React
			<div>
		  
			</div>
		</div>
	);
  }
  
  const styles = StyleSheet.create({
	card: {
	  borderRadius: 6,
	  elevation: 3,
	  backgroundColor: '#fff',
	  shadowOffset: { width: 1, height: 1 },
	  shadowColor: '#333',
	  shadowOpacity: 0.3,
	  shadowRadius: 2,
	  marginHorizontal: 4,
	  marginVertical: 6,
	  padding: 12,
	},
	cardContent: {},
  });
  

  /*

class Dropdown extends React.Component {
	constructor(props) {
		super();
		this.state = {
			countries : [],
			states : [],
			cities : [],
			selectedCountry : '--Choose Country--',
			selectedState : '--Choose State--'
		};
		this.changeCountry = this.changeCountry.bind(this);
		this.changeState = this.changeState.bind(this);
	}
  
	componentDidMount() {
		this.setState({
			countries : [
				{ name: 'Germany', states: [ {name: 'A', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn']} ] },
				{ name: 'Spain', states: [ {name: 'B', cities: ['Barcelona']} ] },
				{ name: 'USA', states: [ {name: 'C', cities: ['Downers Grove']} ] },
				{ name: 'Mexico', states: [ {name: 'D', cities: ['Puebla']} ] },
				{ name: 'India', states: [ {name: 'E', cities: ['Delhi', 'Kolkata', 'Mumbai', 'Bangalore']} ] },
			]
		});
	}
  
	changeCountry(event) {
		this.setState({selectedCountry: event.target.value});
		this.setState({states : this.state.countries.find(cntry => cntry.name === event.target.value).states});
	}

	changeState(event) {
		this.setState({selectedState: event.target.value});
		const stats = this.state.countries.find(cntry => cntry.name === this.state.selectedCountry).states;
		this.setState({cities : stats.find(stat => stat.name === event.target.value).cities});
	}
	
	render() {
		return (
			<div id="container">
				<h2>Cascading or Dependent Dropdown using React</h2>
	
				<div>
					<label>Country</label>
					<select placeholder="Country" value={this.state.selectedCountry} onChange={this.changeCountry}>
						<option>--Choose Country--</option>
						{this.state.countries.map((e, key) => {
							return <option key={key}>{e.name}</option>;
						})}
					</select>
				</div>

				<div>
					<label>State</label>
					<select placeholder="State" value={this.state.selectedState} onChange={this.changeState}>
						<option>--Choose State--</option>
						{this.state.states.map((e, key) => {
							return <option key={key}>{e.name}</option>;
						})}
					</select>
				</div>
				
				<div>
					<label>City</label>
					<select placeholder="City">
						<option>--Choose City--</option>
						{this.state.cities.map((e, key) => {
							return <option key={key}>{e}</option>;
						})}
					</select>
				</div>
			</div>
		)
	}
}

export default Dropdown;*/