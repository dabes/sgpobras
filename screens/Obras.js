import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Card,
  CardItem,
  Button,
  Left,
  Right,
  Text,
  Thumbnail,
  Item,
  Icon,
  Input
} from "native-base";
import MenuHeader from "./MenuHeader";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../constants/Styles";
import { useSelector, useDispatch } from "react-redux";

function getObra(obras, text) {
  for (var cada in obras) {
    if (
      obras[cada].codigo == text ||
      obras[cada].descricao == text ||
      obras[cada].bem_publico == text
    ) {
      return obras[cada];
    }
  }
}

function getBensPublicosObra(obras, obra) {
  var filtro = [];
  for (var cada in obras) {
    if (obra !== undefined) {
      if (obras[cada].codigo == obra.codigo) {
        filtro.push(obras[cada]);
      }
    }
  }
  return filtro;
}

function ListaBens(props) {
  const bens = props.bens;
  const filter = props.filtro;
  const dispatch = useDispatch();
  var filtro = [];
  for (var cada in bens) {
    if (filter !== null) {
      if (
        bens[cada].bem_publico.toUpperCase().indexOf(filter.toUpperCase()) >= 0
      )
        filtro.push(bens[cada]);
    } else filtro.push(bens[cada]);
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filtro}
        style={{ flex: 1 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Button
            transparent
            onPress={A => {
              dispatch({ type: "SEARCHOBRAS", filter: item });
              dispatch({ type: "TOOGLEFILTERBEMOBRA" });
            }}
          >
            <Text>{item.bem_publico}</Text>
          </Button>
        )}
      />
    </View>
  );
}

function FiltrarBem(props) {
  const config = useSelector(state => state.configs);
  const bempublico = useSelector(state => state.bempublico);
  const obra = useSelector(state => state.obra);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  useEffect(() => {
    return () => {
      if (!config.showfiltrobem) setValue(null);
    };
  });
  if (config.showfiltrobem) {
    return (
      <Card
        style={{
          position: "absolute",
          top: 10,
          zIndex: 10000,
          elevation: 10,
          backgroundColor: "#fff",
          borderColor: "red"
        }}
      >
        <CardItem style={{ paddingBottom: 0, paddingTop: 1 }}>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Buscar Bem Público da Obra"
              returnKeyType="send"
              onChangeText={setValue}
              value={value}
              onEndEditing={ret => {
                dispatch({ type: "FILTERBEMOBRA", filter: [] });
                dispatch({ type: "TOOGLEFILTERBEMOBRA" });
              }}
            />
          </Item>
        </CardItem>
        <CardItem style={{ paddingTop: 0, paddingBottom: 1 }} bordered>
          <Button
            transparent
            onPress={A => {
              dispatch({ type: "FILTERBEMOBRA", filter: [] });
              dispatch({ type: "TOOGLEFILTERBEMOBRA" });
            }}
          >
            <Text>Buscar</Text>
          </Button>
        </CardItem>
        <CardItem
          bordered
          style={{
            paddingTop: 0,
            paddingBottom: 1,
            height: 200
          }}
        >
          <ListaBens bens={bempublico} filtro={value} />
        </CardItem>
      </Card>
    );
  } else return <View></View>;
}

function SearchBar(props) {
  const config = useSelector(state => state.configs);
  const obras = useSelector(state => state.obras);
  const states = useSelector(state => state);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  useEffect(() => {
    return () => {
      if (!config.showsearch) setValue(null);
    };
  });
  if (config.showsearch) {
    return (
      <Card
        style={{
          position: "absolute",
          top: 10,
          zIndex: 10000,
          elevation: 10,
          backgroundColor: "#fff",
          borderColor: "red"
        }}
      >
        <CardItem style={{ paddingBottom: 0, paddingTop: 1 }}>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Buscar Obra"
              keyboardType="numeric"
              returnKeyType="send"
              onChangeText={setValue}
              value={value}
              onEndEditing={ret => {
                const obra = getObra(obras, value);
                const obra_bens = getBensPublicosObra(obras, obra);
                if (obra_bens.length > 1) {
                  dispatch({ type: "FILTERBEMOBRA", filter: obra_bens });
                  dispatch({ type: "TOOGLEFILTERBEMOBRA" });
                }
                dispatch({ type: "SEARCHOBRAS", filter: obra });
                dispatch({ type: "TOOGLESEARCH" });
              }}
            />
          </Item>
        </CardItem>
        <CardItem style={{ paddingTop: 0, paddingBottom: 1 }}>
          <Button
            transparent
            onPress={A => {
              const obra = getObra(obras, value);
              const obra_bens = getBensPublicosObra(obras, obra);
              if (obra_bens.length > 1) {
                dispatch({ type: "FILTERBEMOBRA", filter: obra_bens });
                dispatch({ type: "TOOGLEFILTERBEMOBRA" });
              }
              dispatch({ type: "SEARCHOBRAS", filter: obra });
              dispatch({ type: "TOOGLESEARCH" });
            }}
          >
            <Text>Buscar</Text>
          </Button>
        </CardItem>
      </Card>
    );
  } else return <View></View>;
}

function PhotosSelecionadas(props) {
  const obra = useSelector(state => state.obra);
  return (
    <FlatList
      data={obra.photos}
      numColumns={4}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={a => {
            props.navigation.navigate("ShowPhoto", { uri: item });
          }}
        >
          <Thumbnail
            large
            square
            source={{ uri: item }}
            style={{ marginRight: 1, marginBottom: 1 }}
          />
        </TouchableOpacity>
      )}
      keyExtractor={(_, index) => index}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
}

export default function Obras(props) {
  const obra = useSelector(state => state.obra);
  const dispatch = useDispatch();
  if (obra === undefined || Object.entries(obra).length == 0) {
    return (
      <View>
        <SearchBar navigation={props.navigation} />
        <FiltrarBem navigation={props.navigation} />
        <Card>
          <CardItem bordered>
            <Text>Obra não encontrada</Text>
          </CardItem>
        </Card>
      </View>
    );
  }
  return (
    <View>
      <SearchBar navigation={props.navigation} />
      <FiltrarBem navigation={props.navigation} />
      <Card>
        <CardItem bordered>
          <Text>
            {obra.codigo} - {obra.descricao}
          </Text>
        </CardItem>
        <CardItem>
          <Text>{obra.bem_publico}</Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem style={(styles.card, { padding: 1 })}>
          <Left>
            <Button
              onPress={() => {
                props.navigation.navigate("Galeria");
              }}
            >
              <Text>Selecionar +</Text>
            </Button>
          </Left>
          <Right>
            <Button
              onPress={() => {
                dispatch({ type: "SELECIONADAS", photos: [] });
                obra.photos = [];
                dispatch({ type: "ATUALIZAOBRAS", obra: obra });
              }}
            >
              <Text>Apagar Todas</Text>
            </Button>
          </Right>
        </CardItem>

        <CardItem style={{ height: "72%", padding: 0 }}>
          <PhotosSelecionadas navigation={props.navigation} />
        </CardItem>
      </Card>
    </View>
  );
}

Obras.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params } = navigation.state;
  return {
    headerTitle: <MenuHeader navigation={navigation} />,
    headerStyle: styles.headerBg
  };
};
