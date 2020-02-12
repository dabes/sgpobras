import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
  ActivityIndicator
} from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";

import ImageTile from "./ImageTile";

const { width } = Dimensions.get("window");

export default class ImageBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selected: [],
      after: null,
      hasNextPage: true,
      hasPermission: null
    };
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  componentDidMount() {
    this.getPermissionsAsync();
    this.getPhotos();
    this.setState({
      badgeColor: this.props.badgeColor ? this.props.badgeColor : "#007aff"
    });
  }

  selectedPhoto = selected => {
    let newSelected = [];
    this.state.photos.forEach((element, index) => {
      if (selected.includes(element.uri)) {
        newSelected.push(index);
      }
    });
    this.setState({ selected: newSelected });
  };

  selectImage = index => {
    let newSelected = Array.from(this.state.selected);

    if (newSelected.indexOf(index) === -1) {
      newSelected.push(index);
    } else {
      const deleteIndex = newSelected.indexOf(index);
      newSelected.splice(deleteIndex, 1);
    }

    if (newSelected.length > this.props.max) return;
    if (newSelected.length === 0) newSelected = [];

    this.setState({ selected: newSelected });
  };

  getPhotos = () => {
    let params = { first: 500 };
    if (this.state.after) params.after = this.state.after;
    if (!this.state.hasNextPage) return;
    MediaLibrary.getAssetsAsync(params)
      .then(assets => {
        this.processPhotos(assets);
      })
      .then(() => {
        this.selectedPhoto(this.props.selectedPhotos);
      });
  };

  processPhotos = assets => {
    if (this.state.after === assets.endCursor) return;

    let displayAssets;
    if (this.props.mediaSubtype == null) {
      displayAssets = assets.assets;
    } else {
      displayAssets = assets.assets.filter(asset => {
        return asset.mediaSubtypes.includes(this.props.mediaSubtype);
      });
    }

    this.setState({
      photos: [...this.state.photos, ...displayAssets],
      after: assets.endCursor,
      hasNextPage: assets.hasNextPage
    });
  };

  getItemLayout = (data, index) => {
    let length = width / 4;
    return { length, offset: length * index, index };
  };

  prepareCallback = () => {
    let { selected, photos } = this.state;
    const selectedPhotos = selected.map(i => photos[i]);
    const assetsInfo = Promise.all(
      selectedPhotos.map(i =>
        MediaLibrary.getAssetInfoAsync(i).then(image => image.uri)
      )
    );
    this.props.callback(assetsInfo);
  };

  renderHeader = () => {
    let selectedCount = this.state.selected.length;

    let headerText = `${selectedCount} ${
      this.props.headerSelectText ? this.props.headerSelectText : "Selected"
    }`;
    if (selectedCount === this.props.max) headerText = headerText + " (Max)";
    const headerCloseText = this.props.headerCloseText
      ? this.props.headerCloseText
      : "Close";
    const headerDoneText = this.props.headerDoneText
      ? this.props.headerDoneText
      : "Done";
    const headerButtonColor = this.props.headerButtonColor
      ? this.props.headerButtonColor
      : "#007aff";

    return (
      <View style={styles.header}>
        <Button
          color={headerButtonColor}
          title={headerCloseText}
          onPress={() => this.props.callbackclose(Promise.resolve([]))}
        />
        <Text style={styles.headerText}>{headerText}</Text>
        <Button
          color={headerButtonColor}
          title={headerDoneText}
          onPress={() => this.prepareCallback()}
        />
      </View>
    );
  };

  renderImageTile = ({ item, index }) => {
    const selected = this.state.selected.indexOf(index) !== -1;
    const selectedItemCount = this.state.selected.indexOf(index) + 1;

    return (
      <ImageTile
        item={item}
        selectedItemCount={selectedItemCount}
        index={index}
        camera={false}
        selected={selected}
        selectImage={this.selectImage}
        badgeColor={this.state.badgeColor}
      />
    );
  };

  renderLoading = () => {
    return (
      <View style={styles.emptyContent}>
        <ActivityIndicator
          size="large"
          color={this.props.loadingColor ? this.props.loadingColor : "#bbb"}
        />
      </View>
    );
  };

  renderEmpty = () => {
    return (
      <View style={styles.emptyContent}>
        <Text style={styles.emptyText}>
          {this.props.emptyText ? this.props.emptyText : "No image"}
        </Text>
      </View>
    );
  };

  renderImages = () => {
    return (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_, index) => index}
        onEndReached={() => {
          this.getPhotos();
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={this.renderEmpty}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    );
  };

  render() {
    const { hasCameraPermission, close } = this.state;

    if (hasCameraPermission === null) {
      return <ActivityIndicator size="large" />;
    }
    if (hasCameraPermission === false) {
      return <Text>Acesso a camera bloqueado</Text>;
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  header: {
    width: width,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    color: "#bbb",
    fontSize: 20
  }
});
