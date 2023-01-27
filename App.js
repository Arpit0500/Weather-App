import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/Searchbar';


const API_KEY="a3593ac27a663f128b43b0b72b1b995c";


export default function App() {

  const [weatherData, setweatherData]=useState(null);
  const [loadData,setloadData]=useState(true);

async function fetchWeatherData(cityName){
  setloadData(false);
  const API=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}`
  try{
    const response = await fetch(API);
    if(response.status == 200){
      const data= await response.json();
      setweatherData(data);

    }else{
      setweatherData(null);
    }
   setloadData(true);
  }catch(error){
    console.log(error);
  }
}

useEffect(() => {
    fetchWeatherData('Mumbai');
    console.log(weatherData);
},[])

if(!loadData) {


    return(
      <View style={styles.container}>
                <ActivityIndicator color='gray'  size={36} />
            </View>
    )
}
else if(weatherData === null){
   <View>
          <SearchBar fetchWeatherData={fetchWeatherData}/>
           <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
   </View>
}
        

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28
}
});
