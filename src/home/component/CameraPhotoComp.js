import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity, Button, PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import * as RNFS from 'react-native-fs'; // Import react-native-fs
import { requestCameraPermission } from '../../helpers/RequestCameraPermasion';

export const CameraPhotoComp = async ({setselectedPhoto}) => {
  
    if(! await requestCameraPermission()){
        return;
    }
    const options = {
      mediaType: 'photo',
      saveToPhotos: true, // Save captured photo to device's gallery
    };

    ImagePicker.launchCamera(options, (response) => {
        if (response && !response.didCancel) {
          const photoUri = response.assets[0].uri;
          // Create a folder in the gallery to save project-specific photos
          const projectFolder = RNFS.PicturesDirectoryPath + '/vReliConnect';
          RNFS.exists(projectFolder).then((exists) => {
            if (!exists) {
              RNFS.mkdir(projectFolder)
                .then(() => {
                  console.log('Project folder created successfully');
                  movePhotoToFolder(photoUri, projectFolder);
                })
                .catch((error) => {
                  console.log('Error creating project folder:', error);
                });
            } else {
              movePhotoToFolder(photoUri, projectFolder);
            }
          });
        } else {
          console.log('Camera operation canceled or failed');
        }
      });
    
    const movePhotoToFolder = (photoUri, folderPath) => {
      RNFS.moveFile(photoUri, folderPath + `/${Date.now()}.jpg`)
        .then(() => {
          console.log('Photo saved successfully');
          // Refresh photos list
          setselectedPhoto(photoUri);
        })
        .catch((error) => {
          console.log('Error moving photo:', error);
        });
    };

};


