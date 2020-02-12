import React, { useEffect, useState } from "react";
import ImageBrowser from "./ImageBrowser";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";

function getObra(obras, id, obra) {
  const newObras = obras;
  for (var cada in obras) {
    if (obras[cada].id == id) {
      newObras[cada] = obra;
    }
  }
  return newObras;
}

export default function index(props) {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.obra);
  const obras = useSelector(state => state.obras);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  useEffect(() => {
    setImagePickerOpen(true);
  });

  if (imagePickerOpen) {
    return (
      <ImageBrowser
        max={101} // Maximum number of pickable image. default is None
        headerCloseText={"Fechar"} // Close button text on header. default is 'Close'.
        headerDoneText={"Selecionar"} // Done button text on header. default is 'Done'.
        headerButtonColor={"#3F51B5"} // Button color on header.
        headerSelectText={"Selecionados"} // Word when picking.  default is 'n selected'.
        badgeColor={"#3F51B5"} // Badge color when picking.
        emptyText={"Galeria Vazia"} // Empty Text
        selectedPhotos={selected.photos}
        callback={assets => {
          assets.then(items => {
            dispatch({ type: "SELECIONADAS", photos: items });
            // obras = getObra(obras, selected.id, obra);
            dispatch({ type: "ATUALIZAOBRAS", obra: selected });
          });
          setImagePickerOpen(false);
          props.navigation.navigate("Obras");
        }}
        callbackclose={assets => {
          props.navigation.navigate("Obras");
        }}
      />
    );
  } else return <View />;
}
