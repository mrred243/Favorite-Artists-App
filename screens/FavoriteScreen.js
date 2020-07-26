import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as firebase from "firebase";
import {
  List,
  ListItem,
  Layout,
  Text,
  Divider,
  Avatar,
  Button,
  Icon,
  Card
} from "@ui-kitten/components";
import { showMessage } from "react-native-flash-message";

export default function FavoriteScreen() {
  const [favoriteArtists, setFavoriteArtists] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("artists/")
      .on("value", snapshot => {
        const data = snapshot.val();

        if (data === null) {
          setFavoriteArtists([]);
        } else if (data !== null) {
          console.log(data);
          const prods = Object.entries(data);
          setFavoriteArtists(prods);
        }
      });
  }, []);

    // Delete the artist from firebase database
  const deleteFavortieArtist = item => {
    firebase
      .database()
      .ref(`artists/${item[0]}`)
      .remove();
    showMessage({
      message: "Successfully delete the artist",
      type: "info",
      icon: "success"
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10
      }}
      onLongPress={() => deleteFavortieArtist(item)}
    >
      <Avatar
        source={{ uri: item[1].url }}
        style={{ width: 85, height: 85, marginHorizontal: 30 }}
      />

      <Text style={{ fontSize: 16 }}>{item[1].name}</Text>
    </TouchableOpacity>
  );

  return (
    <Layout style={{ flex: 1 }} level="1">
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text category="h3" style={{ marginTop: 30, marginLeft: 30 }}>
            Favorite Artists
          </Text>
          <Text style={{ marginLeft: 20, marginBottom: 30 }}>
            * Long press to delete your favorite artists
          </Text>

          <List
            data={favoriteArtists}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
            scrollEnabled="false"
          />
        </SafeAreaView>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});
