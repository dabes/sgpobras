import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "../constants/Styles";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardItem,
  Item,
  Icon,
  Input,
  Button,
  Thumbnail,
  Left,
  Right
} from "native-base";
import MenuHeader from "./MenuHeader";

function Bem(props) {
  navigation = props.navigation;
  const bem = useSelector(state => state.bem);
  const dispatch = useDispatch();
  return (
    <Card>
      <CardItem bordered>
        <Button
          onPress={a => {
            null;
          }}
          transparent
        >
          <Thumbnail source={{ uri: photo }} bordered />
        </Button>
        <Text>
          {"   "}Tombamento: {bem.tombamento}
        </Text>
      </CardItem>
      <CardItem style={styles.cardBemTitulo}>
        <Text>Descrição do Bem:</Text>
      </CardItem>
      <CardItem style={styles.cardBemContent}>
        <Text>{bem.descricao}</Text>
      </CardItem>
      <CardItem style={styles.cardBemTitulo}>
        <Text>Descrição do Produto:</Text>
      </CardItem>
      <CardItem style={styles.cardBemContent}>
        <Text>{bem.produto_descricao}</Text>
      </CardItem>
      <CardItem style={styles.cardBemTitulo}>
        <Text>Centro de Custo:</Text>
      </CardItem>
      <CardItem
        style={(styles.cardBemContent, { paddingLeft: 10, height: 10 })}
      ></CardItem>
      <CardItem
        style={(styles.cardBemTitulo, { marginBottom: 5, marginTop: 5 })}
      >
        <Text>{bem.ccusto ? "Encontrado" : "Não Encontrado"}</Text>
        <Right></Right>
      </CardItem>
    </Card>
  );
}

function getBem(bens, text) {
  for (var cada in bens) {
    if (bens[cada].tombamento === text) {
      return bens[cada];
    }
  }
}

function SearchBar(props) {
  navigation = props.navigation;
  const bem = useSelector(state => state.bem);
  const bens = useSelector(state => state.bens);
  const dispatch = useDispatch();
  return (
    <Card>
      <CardItem style={{ paddingBottom: 0 }}>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Buscar Bem"
            keyboardType="numeric"
            returnKeyType="send"
            onChangeText={text => {
              const bemencontrado = getBem(bens, text);
              dispatch({ type: "A", bem: bemencontrado });
            }}
            value={bem.tombamento}
            onEndEditing={text => {
              const bemencontrado = getBem(bens, text.nativeEvent.text);
              dispatch({ type: "A", bem: bemencontrado });
            }}
          />
          <Button
            onPress={() => {
              navigation.navigate("BarcodeScan");
            }}
            transparent
          >
            <Icon name="md-barcode" />
          </Button>
        </Item>
      </CardItem>
      <CardItem style={{ paddingTop: 0 }}>
        <Button transparent onPress={null}>
          <Text>Buscar</Text>
        </Button>
      </CardItem>
    </Card>
  );
}

export default function BemScreen(props) {
  navigation = props.navigation;
  photo = "null";
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.cardContainer}
        contentContainerStyle={styles.cardContentContainer}
      >
        <Card>
          <CardItem style={styles.card}>
            <Text>ccusto</Text>
          </CardItem>
        </Card>
        <SearchBar navigation={navigation} />
        <Bem navigation={navigation} />
      </ScrollView>
    </View>
  );
}

BemScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params } = navigation.state;
  return {
    headerTitle: <MenuHeader navigation={navigation} />,
    headerStyle: styles.headerBg
  };
};
