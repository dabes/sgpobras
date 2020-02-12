import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerBg: {
    backgroundColor: "#47C156"
  },
  header: {
    height: "15%",
    backgroundColor: "#47C156",
    width: "100%"
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    width: "67%",
    paddingRight: "20%"
  },
  headerIconTouchable: {
    marginLeft: 10,
    paddingLeft: 10,
    width: "20%"
  },
  contentContainer: {
    flex: 1
  },
  card: {
    width: "95%",
    padding: 10,
    margin: 10
  },
  cardBemTitulo: {
    paddingBottom: 0,
    marginBottom: 0
  },
  cardBemContent: {
    paddingTop: 0,
    marginTop: 0
  },
  cardContentContainer: { flexGrow: 1 }
});

export default styles;
