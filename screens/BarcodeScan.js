import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { ActivityIndicator, StyleSheet, Button } from "react-native";
import { Text, View } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useSelector, useDispatch } from "react-redux";

async function getPermissionsAsync(hasCameraPermission) {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  if (hasCameraPermission === null) {
    return <ActivityIndicator size="large" />;
  }
  if (hasCameraPermission === false) {
    return <Text>Acesso a camera bloqueado</Text>;
  }
  return status === "granted";
}

function getBem(bens, text) {
  for (var cada in bens) {
    if (bens[cada].tombamento === text) {
      return bens[cada];
    }
  }
}

export default function BarCodeScan(props) {
  const hasCameraPermission = null;
  const scanned = false;
  const close = false;
  const bens = useSelector(state => state.bens);
  const bem = useSelector(state => state.bem);
  const dispatch = useDispatch();

  useEffect(() => {
    getPermissionsAsync(hasCameraPermission);
  });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "black"
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={dados => {
          const bemencontrado = getBem(bens, dados.data);
          dispatch({
            type: "BARCODE",
            bem: bemencontrado === undefined ? bem : bemencontrado,
            code: dados.data
          });
          props.navigation.navigate("Inventário");
        }}
        style={StyleSheet.absoluteFillObject}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0.2, 0.2, 0.2, 0.2)",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <View
            style={{
              width: 300,
              height: 100,
              backgroundColor: "transparent",
              borderColor: "white",
              borderWidth: 2
            }}
          />
        </View>
      </BarCodeScanner>
      <Button
        title={"Fechar"}
        onPress={() => props.navigation.navigate("Inventário")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,
    height: "115%",
    padding: 0
  }
});
