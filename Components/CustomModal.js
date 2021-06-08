import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Portal, Modal } from "react-native-paper";
import MyStyles from "../Styles/MyStyles";

const CustomModal = ({ visible, content, onDismiss }) => {
  return (
    <Portal>
      <Modal
        dismissable={false}
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: MyStyles.secondaryColor.backgroundColor,
          width: "90%",
          maxHeight: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <View style={{ borderWidth: 2, borderColor: "#555", padding: 10, height: "auto" }}>
          {content}
        </View>
      </Modal>
    </Portal>
  );
};

export default CustomModal;
