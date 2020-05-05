import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import { Layout, Button, Text } from '@ui-kitten/components';



const Artist = ( {artist, addFavoriteArtist} ) => {

    if (!artist ) return null;

    const { images, name, genres, followers } = artist;

    const addToFavoriteArtist = () => {
        addFavoriteArtist();
}

    return (
        <View style={{flex: 1, alignItems: 'center', marginBottom: 20}} level='2'>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 20, marginRight: 10, color: 'white'}}>{name}</Text>
                <Button size='tiny' appearance='outline' status='warning' onPress={addToFavoriteArtist}>⭐️</Button>
            </View>
            <Text>{followers.total} followers</Text>
            <View style={{height: 50}}><Text>{genres.join(', ')}</Text></View>
            <Image style={{width:200, height: 200, borderRadius: 100}} source={{uri:images[1] && images[1].url}} alt='artist-profile' />
        </View>
        )
}

export default Artist;
