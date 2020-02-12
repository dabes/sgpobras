import React from "react";
import { View, Button, Text, Left, Right } from "native-base";
import { Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function ShowPhoto(props) {
  const photo = props.navigation.getParam("uri");
  const dispatch = useDispatch();
  const obra = useSelector(state => state.obra);
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: photo }} style={{ flex: 1 }}></Image>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          bottom: 30,
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          left: 0,
          right: 0
        }}
      >
        <Button
          block
          style={{ marginRight: 100 }}
          onPress={a => {
            props.navigation.navigate("Obras");
          }}
        >
          <Text>Fechar</Text>
        </Button>
        <Button
          block
          onPress={a => {
            obra.photos = obra.photos.filter(element => element !== photo);
            dispatch({ type: "ATUALIZAOBRAS", obra: obra });
            props.navigation.navigate("Obras");
          }}
        >
          <Text>Apagar</Text>
        </Button>
      </View>
    </View>
  );
}
