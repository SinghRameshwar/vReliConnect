import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity, Button, PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs'; // Import react-native-fs
import { requestCameraPermission } from '../../helpers/RequestCameraPermasion';

export const CameraVideoComp = async ({ videos, setVideos }) => {

  if (! await requestCameraPermission()) {
    return;
  }
  const options = {
    mediaType: 'video',
    saveToPhotos: true, // Save captured video to device's gallery
  };

  ImagePicker.launchCamera(options, (response) => {
    if (response && !response.didCancel) {
      const videoUri = response.assets[0].uri;
      // Create a folder in the gallery to save project-specific videos
      const projectFolder = RNFS.PicturesDirectoryPath + '/vReliConnect';
      RNFS.exists(projectFolder).then((exists) => {
        if (!exists) {
          RNFS.mkdir(projectFolder)
            .then(() => {
              console.log('Project folder created successfully');
              moveVideoToFolder(videoUri, projectFolder);
            })
            .catch((error) => {
              console.log('Error creating project folder:', error);
            });
        } else {
          moveVideoToFolder(videoUri, projectFolder);
        }
      });
    } else {
      console.log('Camera operation canceled or failed');
    }
  });

  const moveVideoToFolder = (videoUri, folderPath) => {
    RNFS.moveFile(videoUri, folderPath + `/${Date.now()}.mp4`)
      .then(() => {
        console.log('Video saved successfully');
        // Refresh videos list
        setVideos([...videos, { uri: videoUri }]);
      })
      .catch((error) => {
        console.log('Error moving video:', error);
      });
  };

  // const renderItem = ({ item }) => (
  //   <TouchableOpacity style={styles.videoContainer}>
  //     <Image source={{ uri: 'https://img.icons8.com/plasticine/100/000000/video-playlist.png' }} style={styles.videoIcon} />
  //   </TouchableOpacity>
  // );

}
