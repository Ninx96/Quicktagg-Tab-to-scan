import React from "react";
import { View, Image, Alert, TouchableHighlight } from "react-native";
import { Button, Portal, Subheading, Modal, IconButton } from "react-native-paper";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const ImageUpload = ({ source, onUploadImage, onClearImage, label, disabled }) => {
  const [modal, setModal] = React.useState(false);
  const [viewImage, setViewImage] = React.useState(source);

  React.useEffect(() => {
    setViewImage(source);
  }, [source]);

  const Upload = async () => {
    try {
      // const Camera = await Permissions.getAsync(Permissions.CAMERA);
      // const camera_roll = await Permissions.getAsync(Permissions.MEDIA_LIBRARY);

      const Camera = await ImagePicker.getCameraPermissionsAsync();
      const camera_roll = await ImagePicker.getMediaLibraryPermissionsAsync();

      if (!Camera.granted) {
        ImagePicker.requestCameraPermissionsAsync();
      } else if (!camera_roll.granted) {
        ImagePicker.requestMediaLibraryPermissionsAsync(writeOnly);
      } else {
        const options = {
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.2,
          base64: true,
        };
        Alert.alert("Select Upload Option", "Choose an Option To Continue", [
          {
            text: "Camera",
            onPress: () => {
              ImagePicker.launchCameraAsync(options).then((result) => {
                if (!result.cancelled) {
                  onUploadImage(result);
                  //setViewImage({ uri: result.uri });
                }
              });
            },
          },
          {
            text: "Gallery",
            onPress: () => {
              ImagePicker.launchImageLibraryAsync(options).then((result) => {
                if (!result.cancelled) {
                  onUploadImage(result);
                  //setViewImage({ uri: result.uri });
                }
              });
            },
          },
        ]);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <Portal>
        <Modal
          visible={modal}
          dismissable={false}
          transparent={true}
          contentContainerStyle={{
            backgroundColor: "rgba(0,0,0,0.7)",
            height: "100%",
          }}
          onDismiss={() => {
            setModal(false);
          }}
        >
          <IconButton
            icon="close"
            size={30}
            color="#fff"
            style={{ alignSelf: "flex-end" }}
            onPress={() => setModal(false)}
          />
          <Image
            source={viewImage}
            style={{
              width: "100%",
              height: "80%",
              resizeMode: "contain",
            }}
          />
        </Modal>
      </Portal>
      <Subheading>{label}</Subheading>
      <View style={{ marginVertical: 5, flexDirection: "row" }}>
        <TouchableHighlight style={{ width: "50%" }} onPress={() => setModal(true)}>
          <Image
            source={viewImage}
            style={{
              width: "100%",
              height: 80,
              resizeMode: "contain",
              borderRadius: 5,
            }}
          />
        </TouchableHighlight>

        <View style={{ width: "50%" }}>
          <Button disabled={disabled} mode="text" compact={true} onPress={Upload} color="#22356A">
            Upload
          </Button>
          <Button disabled={disabled} mode="text" color="red" onPress={onClearImage}>
            Clear
          </Button>
        </View>
      </View>
    </>
  );
};

export default ImageUpload;
