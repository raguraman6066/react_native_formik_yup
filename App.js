import { StyleSheet, Text, View } from "react-native";
import Form from "./Form";

export default function App() {
  return <Form />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
