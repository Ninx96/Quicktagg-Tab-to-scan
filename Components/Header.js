import React from "react";
import { Alert, Image, SafeAreaView, View } from "react-native";
import { IconButton } from "react-native-paper";
import MyStyles from "../Styles/MyStyles";
import { AuthContext } from "./Context";

const Header = ({ logoPath, right }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <SafeAreaView
      style={{
        //paddingTop: MyStyles.barHeight,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <IconButton
        icon="exit-to-app"
        color={MyStyles.primaryColor.backgroundColor}
        size={30}
        onPress={() => signOut()}
      />

      <Image
        style={{ flex: 8, resizeMode: "contain" }}
        source={
          logoPath
            ? { uri: "https://jewellerapi.quickgst.in/BranchLogo/" + logoPath }
            : require("../assets/logo.png")
        }
      />
      {/* <IconButton
        icon="bell"
        color={MyStyles.primaryColor.backgroundColor}
        size={30}
        onPress={() => Alert.alert("Coming Soon...")}
      /> */}
      {right}
    </SafeAreaView>
  );
};

export default Header;
