/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../config/Theme";

export type TCheckboxesOptions = Array<string | number>;

interface ICheckboxesList {
  options: TCheckboxesOptions;
  label?: string;
  onChange?: (selectedValues: TCheckboxesOptions) => void;
}

const CheckboxesList = (props: ICheckboxesList) => {
  const { options, label, onChange } = props;

  const [selectedValues, setSelectedValues] = useState<TCheckboxesOptions>([]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedValues);
    }
  }, [selectedValues]);

  const onValueChange = (isSelected: boolean, option: string | number) => {
    let newSelectedValues = [...selectedValues];

    if (isSelected) {
      newSelectedValues = [...selectedValues, option];
    } else {
      newSelectedValues.splice(selectedValues.indexOf(option), 1);
    }

    setSelectedValues([...newSelectedValues]);
  };

  return (
    <View style={styles.container}>
      <Text>{label}</Text>

      {options.map((o) => (
        <View key={o} style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            value={selectedValues.includes(o)}
            onValueChange={(v) => onValueChange(v, o)}
          />
          <Text>{o}</Text>
        </View>
      ))}
    </View>
  );
};

export default CheckboxesList;

const styles = StyleSheet.create({
  container: {},
});
