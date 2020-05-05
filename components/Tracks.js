import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { List, ListItem, Layout, Text, Divider, Avatar, Button } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';


const Tracks = ( { tracks } ) => {

    if (!tracks ) return [];

//  create initial states

    const [playing, setPlaying] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentSoundUrl, setCurrentSoundUrl] = useState(null);


    const initialStatus = {
//        Play by default
         shouldPlay: false,
//        Control the speed
         rate: 1.0,
//        Correct the pitch
         shouldCorrectPitch: true,
//        Control the Volume
         volume: 1.0,
//        mute the Audio
         isMuted: false
    };

//  Playing Audio function

    const playAudio = async (previewUrl) => {
        const audio = new Audio.Sound();
        await audio.loadAsync({uri: previewUrl, initialStatus});

      if(!playing) {
           await audio.playAsync();
           await setPlaying(true);
           await setCurrentAudio(audio);
           await setCurrentSoundUrl(previewUrl);
           console.log('playing!')

      } else {
            await currentAudio.pauseAsync();

            if (currentSoundUrl === previewUrl) {
              await setPlaying(false);
}           else{
              await audio.playAsync();
              await setCurrentAudio(audio);
              await setCurrentSoundUrl(previewUrl);
}

}
}

const setFalse = false;


  const listSeparator = () => {
    return (
      <Layout level='1'
        style={{
          height: 7,
        }}
      />
    );
  };

// Track icon behavior

  const trackIcon = track => {
      if (track.preview_url === null) {
        return(<Text style={{fontSize: 15, padding: 10, fontWeight: 'bold'}}>N/A   </Text>)
}
      if (playing && (currentSoundUrl === track.preview_url)) {
        console.log('Pause')
        return(<Ionicons style={{paddingTop: 5, paddingRight: 20}} name="md-pause" size={32} color="white" />)
  }
        return(      <Ionicons style={{paddingTop: 5, paddingRight: 20}} name="md-play" size={32} color="white" />
)
}


return (
    <View style={{flex: 1, marginTop: 10  }}>
        <List
          renderItem={({item}) =>
          <TouchableOpacity style={styles.listcontainer} onPress={() => playAudio(item.preview_url)}>
              <Image style={{width: 100, height: 100}}
               source={{uri: item.album.images[1].url}} alt='track-image'  />
              <View style={{height: 100, width: 250, padding: 10, justifyContent: 'center'}}><Text style={{fontSize: 16}}>{item.name}</Text></View>
              {trackIcon(item)}
          </TouchableOpacity>}
          scrollEnabled={setFalse}
          data={tracks}
          ItemSeparatorComponent={listSeparator}
        />
    </View>

        )
};

const styles = StyleSheet.create({
   listcontainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center'
   },
});

export default Tracks;
