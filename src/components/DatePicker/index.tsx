import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme, { Text } from "../../config/Theme";

interface IDatePicker {
  onChange?: (e: any) => void;
  value?: string;
}

const DatePicker = (props: IDatePicker) => {
  const { onChange: onChangeProp, value } = props;

  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<string>(value || "");

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date || event;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if (onChangeProp) onChangeProp(currentDate);
  };

  const dateText = (text: string) => {
    const d = new Date(text);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          {
            borderBottomColor: theme.colors.defautlInput,
          },
        ]}
        onPress={() => setShow(true)}
      >
        {date ? (
          <Text style={styles.placeholder}>{dateText(date)}</Text>
        ) : (
          <Text style={styles.placeholder} color="defautlInput">
            Date of birth
          </Text>
        )}
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(date)}
          mode="date"
          display="calendar"
          onChange={onChange}
        />
      )}
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: "5%",
  },
  placeholder: {
    fontSize: 16,
    height: 40,
    padding: 10,
  },
});
