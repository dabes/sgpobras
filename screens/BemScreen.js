import React from "react";
import { Image, ScrollView, Text, View, Switch } from "react-native";
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
  Right,
  Picker
} from "native-base";
import MenuHeader from "./MenuHeader";

function Bem(props) {
  navigation = props.navigation;
  const bem = useSelector(state => state.bem);
  const ccusto = useSelector(state => state.ccustos);
  const dispatch = useDispatch();
  const fakephoto = Image.resolveAssetSource(
    require("../assets/images/foto.png")
  );
  if (bem.tombamento === null || bem.tombamento === undefined) {
    return <View></View>;
  } else {
    return (
      <Card>
        <CardItem bordered>
          <Button
            onPress={a => {
              null;
            }}
            transparent
          >
            <Thumbnail
              source={{
                uri:
                  bem.photo === null || bem.photo === undefined
                    ? fakephoto.uri
                    : bem.photo
              }}
              bordered
            />
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
        >
          <Picker
            selectedValue={bem.ccusto}
            onValueChange={valor =>
              dispatch({ type: "BEMCCUSTO", ccusto: valor })
            }
          >
            {getCcusto(ccusto).map(cada => (
              <Picker.Item label={cada.sigla} value={cada.id} key={cada.id} />
            ))}
          </Picker>
        </CardItem>
        <CardItem
          style={
            (styles.cardBemTitulo,
            { marginBottom: 5, marginTop: 5, paddingBottom: 1 })
          }
        >
          <Text>{bem.ccusto ? "Encontrado" : "Não Encontrado"}</Text>
          <Right>
            <Switch
              value={bem.encontrado}
              onValueChange={valor =>
                dispatch({ type: "ENCONTRADO", encontrado: valor })
              }
            />
          </Right>
        </CardItem>
      </Card>
    );
  }
}

function getBem(bens, text) {
  for (var cada in bens) {
    if (bens[cada].tombamento === text) {
      return bens[cada];
    }
  }
}

function getCcusto(ccusto) {
  let ccustos = [];
  try {
    for (var cada in ccusto) {
      ccustos.push(ccusto[cada]);
    }
    return ccustos;
  } catch {
    return ccusto;
  }
}

function CentroCusto(props) {
  navigation = props.navigation;
  const config = useSelector(state => state.configs);
  const ccusto = useSelector(state => state.ccustos);
  const dispatch = useDispatch();
  return (
    <Card>
      <CardItem
        style={{
          paddingTop: 1,
          paddingBottom: 1
        }}
      >
        <Picker
          selectedValue={config.ccusto_selecionado}
          onValueChange={valor => dispatch({ type: "CCUSTO", ccusto: valor })}
        >
          {getCcusto(ccusto).map(cada => (
            <Picker.Item label={cada.sigla} value={cada.id} key={cada.id} />
          ))}
        </Picker>
      </CardItem>
    </Card>
  );
}

function SearchBar(props) {
  navigation = props.navigation;
  const bem = useSelector(state => state.bem);
  const bens = useSelector(state => state.bens);
  const dispatch = useDispatch();
  return (
    <Card>
      <CardItem style={{ paddingBottom: 0, paddingTop: 1 }}>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Buscar Bem"
            keyboardType="numeric"
            returnKeyType="send"
            onChangeText={text => {
              const bemencontrado = getBem(bens, text);
              dispatch({ type: "BEMENCONTRADO", bem: bemencontrado });
            }}
            value={bem.searchBem}
            onEndEditing={text => {
              const bemencontrado = getBem(bens, text.nativeEvent.text);
              bem.tombamento = text.nativeEvent.text;
              dispatch({ type: "BEMENCONTRADO", bem: bemencontrado });
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
      <CardItem style={{ paddingTop: 0, paddingBottom: 1 }}>
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
        <CentroCusto navigation={navigation} />
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
