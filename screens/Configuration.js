import React from "react";
import { Text, CardItem, Card, Button, Input, Item, Icon } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import styles from "../constants/Styles";
import MenuHeader from "./MenuHeader";

export default function ConfigurationIp(props) {
  const config = useSelector(state => state.configs);
  const dispatch = useDispatch();
  return (
    <Card>
      <CardItem
        style={{
          paddingBottom: 1
        }}
      >
        <Text>IP:</Text>
      </CardItem>
      <CardItem
        style={{
          paddingTop: 1
        }}
      >
        <Item>
          <Icon name="ios-navigate" />
          <Input
            placeholder="Endereço IP"
            onChangeText={text => {
              dispatch({ type: "IP", ip: text });
            }}
            value={config.ip}
          />
        </Item>
      </CardItem>
      <CardItem>
        <Text>
          Preencher com ex:
          {"\n"}servidor.com.br ou 127.0.0.1
          {"\n"}ou caso tenha porta
          {"\n"}servidor.com.br:porta ou 127.0.0.1:porta
        </Text>
      </CardItem>
    </Card>
  );
}

ConfigurationIp.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params } = navigation.state;
  return {
    headerTitle: <MenuHeader navigation={navigation} />,
    headerStyle: styles.headerBg
  };
};
