import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  StatusBar,
  YellowBox,
  Alert
} from "react-native";
import Artist from "../components/Artist";
import Tracks from "../components/Tracks";
import * as firebase from "firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, Button } from "@ui-kitten/components";
import { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";

// ignore unneccesory warning

YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);

// firebase initializes
const firebaseConfig = {
  apiKey: "AIzaSyBT3R07TfvYTu465VpHbJV8bGa6zG70Iqw",
  authDomain: "favorite-artists-31c6d.firebaseapp.com",
  databaseURL: "https://favorite-artists-31c6d.firebaseio.com",
  projectId: "favorite-artists-31c6d",
  storageBucket: "favorite-artists-31c6d.appspot.com",
  messagingSenderId: "895526225000",
  appId: "1:895526225000:web:30d9461a994ff1a4bee7dd",
  measurementId: "G-LJR3XWF2JB"
};

firebase.initializeApp(firebaseConfig);

const API_ADDRESS = "https://spotify-api-wrapper.appspot.com";

export default function HomeScreen() {
  const [artistQuery, setArtistQuery] = useState("");
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [previousAddedArtist, setPreviousAddedArtist] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref("artists/")
      .on("value", snapshot => {
        const data = snapshot.val();
        if (data !== null) {
          const prods = Object.values(data);
        }
      });
  }, []);

  // function to add the artist to the favorite artists section

  const addFavoriteArtist = () => {
    if (artist.name === previousAddedArtist.name) {
      showMessage({
        message: "This artist is already in your favorite team.",
        type: "warning",
        icon: "danger"
      });
    } else {
      firebase
        .database()
        .ref("artists/")
        .push({ name: artist.name, url: artist.images[1].url });
      showMessage({
        message: "Successful added!",
        type: "info",
        icon: "success"
      });
      setPreviousAddedArtist(artist);
    }
  };

  // Fetch artist's information and his/her songs
  const fetchArtist = () => {
    fetch(`${API_ADDRESS}/artist/${artistQuery}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.artists.total > 0) {
          const artist = responseJson.artists.items[0];
          setArtist(artist);
          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
            .then(response => response.json())
            .then(json => setTracks(json.tracks))
            .catch(error => alert(error.message));
        }
      })
      .catch(error => alert(error.message));
  };

  return (
    <Layout style={{ flex: 1 }} level="1">
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ flex: 1, marginTop: 10, alignItems: "center" }}>
            <TextInput
              style={{
                fontSize: 16,
                height: 25,
                width: 200,
                paddingLeft: 10,
                backgroundColor: "lightgray"
              }}
              value={artistQuery}
              placeholder="Artist"
              onChangeText={text => setArtistQuery(text)}
            />
            <Button
              onPress={fetchArtist}
              appearance="outline"
              status="warning"
              style={{ marginVertical: 20 }}
            >
              Find Artists
            </Button>

            <Artist artist={artist} addFavoriteArtist={addFavoriteArtist} />
          </View>
          <Tracks tracks={tracks} />
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
