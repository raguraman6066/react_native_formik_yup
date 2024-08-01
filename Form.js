import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const Schema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(8),
  rating: yup
    .string()
    .required()
    .test("is_num_1-5", "rating must be number and 1 to 5", (val) => {
      return parseInt(val) < 6 && parseInt(val) > 0;
    }),
});

export default Form = () => {
  const initialReviews = [
    {
      title: "Title-1",
      body: "Body-1",
      rating: 1,
    },
    {
      title: "Title-2",
      body: "Body-2",
      rating: 3,
    },
  ];
  const [review, addReview] = useState(initialReviews);
  return (
    <View style={styles.container}>
      {review.map((single) => (
        <View style={styles.list}>
          <Text>title : {single.title}</Text>
          <Text>body : {single.body}</Text>
          <Text>rating : {single.rating}</Text>
        </View>
      ))}
      <Formik
        validationSchema={Schema}
        initialValues={{ title: "", body: "", rating: "" }}
        onSubmit={(values) => {
          console.log(values);
          addReview((oldData) => {
            return [...oldData, values];
          });
        }}
      >
        {(formikProps) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter title"
              onChangeText={formikProps.handleChange("title")}
              value={formikProps.values.title}
            />
            <Text style={{ color: "red" }}>{formikProps.errors.title}</Text>

            <TextInput
              style={styles.input}
              multiline
              placeholder="Enter body"
              onChangeText={formikProps.handleChange("body")}
              value={formikProps.values.body}
            />
            <Text style={{ color: "red" }}>{formikProps.errors.body}</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Rating (1-5)"
              onChangeText={formikProps.handleChange("rating")}
              value={formikProps.values.rating}
              keyboardType="numeric"
            />
            <Text style={{ color: "red" }}>{formikProps.errors.rating}</Text>

            <Button
              title="submit"
              color="orange"
              onPress={formikProps.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 30,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
  },
  input: {
    borderWidth: 1,
    fontWeight: "bold",
    margin: 10,
    fontSize: 18,
    borderRadius: 6,
    borderColor: "#ddd",
  },
  list: {
    margin: 10,
    borderWidth: 2,
    padding: 10,
    borderColor: "blue",
    borderRadius: 20,
  },
});
