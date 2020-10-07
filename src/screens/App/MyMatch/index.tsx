import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RangeSlider from "react-native-range-slider-expo";
import {
  Button,
  CarCard,
  Card,
  Header,
  Icons,
  Input,
} from "../../../components";
import { DrawerLeftMenu } from "../../../components/HOCs";
import theme, { Text } from "../../../config/Theme";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import CheckboxesList, {
  TCheckboxesOptions,
} from "../../../components/Lists/CheckboxesList/indext";

const { height, width } = Dimensions.get("window");

const bodyTypesOptions = ["Cabriolet", "Hatchback", "SUV", "Other"];
const seatsOptions = [2, 4, 5, 7];

const MyMatch = () => {
  const { navigate } = useNavigation();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);

  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const [bodyTypes, setBodyTypes] = useState<TCheckboxesOptions>([]);
  const [seats, setSeats] = useState<TCheckboxesOptions>([]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const CardTitle = () => (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Icons icon="Info" size={15} fill={theme.colors.primary} />
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text variant="heading1" color={theme.colors.white}>
          100-250
        </Text>

        <Text
          variant="heading1"
          style={{ opacity: 0.5 }}
          color={theme.colors.white}
        >
          {" "}
          Mi
        </Text>
      </View>
    </View>
  );

  const CardSubtitle = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Text variant="label" color={theme.colors.white}>
        eVe Range
      </Text>

      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => navigate(APP_STACK_SCREENS_NAMES.MyRoutes)}
      >
        <Icons icon="Edit" size={15} fill={theme.colors.primary} />

        <Text variant="label" color="primary">
          {" "}
          Edit eVe
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      {showModal && (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            height,
            width,
            backgroundColor: theme.colors.blackTransparent,
            zIndex: 1,
          }}
        >
          <ScrollView
            style={{
              marginTop: height * 0.05,
              height: height * 0.95,
              width: width * 0.8,
              backgroundColor: theme.colors.white,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: 25,
              paddingVertical: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text color="primary">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text color="secondaryDark">Done</Text>
              </TouchableOpacity>
            </View>

            <View style={{ padding: 10, borderRadius: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: theme.colors.secondaryDark,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  padding: 10,
                }}
              >
                <Text color={theme.colors.white}>eVe Recommendation</Text>
                <Text color={theme.colors.white}>100 - 250 km</Text>
              </View>

              <Text style={{ padding: 10 }}>User Range Filter</Text>

              <View
                style={{
                  width: "100%",
                  borderColor: theme.colors.grayLighter,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <RangeSlider
                  min={5}
                  max={25}
                  fromValueOnChange={(value) => setFromValue(value)}
                  toValueOnChange={(value) => setToValue(value)}
                  initialFromValue={7}
                  styleSize="small"
                />
              </View>
            </View>

            <View style={{}}>
              <Text>Price</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Input
                  placeholder="Min"
                  containerStyle={{
                    flex: 1,
                    marginRight: 15,
                    marginVertical: 0,
                  }}
                />
                <Input
                  placeholder="Max"
                  containerStyle={{ flex: 1, marginVertical: 0 }}
                />
              </View>
            </View>

            <View>
              <CheckboxesList
                options={bodyTypesOptions}
                onChange={setBodyTypes}
                label="Body Type"
              />
            </View>

            <View>
              <CheckboxesList
                options={seatsOptions}
                onChange={setSeats}
                label="Minimum seats"
              />
            </View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: height * 0.1,
              }}
            >
              <Icons icon="Cancel" size={20} fill="red" />
              <Text variant="error">Reset filters</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      <View style={styles.container}>
        <Header
          title="My Match"
          containerStyle={{
            backgroundColor: theme.colors.white,
          }}
          icon="Menu"
          onPress={toggleDrawer}
        />

        <View style={styles.content}>
          <Card
            title={<CardTitle />}
            subTitle={<CardSubtitle />}
            containerStyle={{
              width: "100%",
              height: height * 0.15,
              marginBottom: height * 0.02,
            }}
            contentStyle={{ paddingHorizontal: 25, height: height * 0.15 }}
          />

          <Button label="filter" onPress={() => setShowModal(true)} />

          <ScrollView
            horizontal
            style={[styles.scrollViewContainer, styles.scrollView]}
            snapToAlignment="center"
            snapToInterval={width * 0.9}
            decelerationRate={0}
            showsHorizontalScrollIndicator={false}
          >
            <CarCard
              containerStyle={[styles.scrollView, styles.card]}
              imgUri="https://i.ytimg.com/vi/YUs7CabKBkg/hqdefault.jpg"
              contentStyle={styles.cardContent}
            />
            <CarCard
              containerStyle={[styles.scrollView, styles.card]}
              imgUri="https://i.ytimg.com/vi/YUs7CabKBkg/hqdefault.jpg"
              contentStyle={styles.cardContent}
            />
            <CarCard
              containerStyle={[styles.scrollView, styles.card]}
              imgUri="https://i.ytimg.com/vi/YUs7CabKBkg/hqdefault.jpg"
              contentStyle={styles.cardContent}
            />
            <CarCard
              containerStyle={[styles.scrollView, styles.card]}
              imgUri="https://i.ytimg.com/vi/YUs7CabKBkg/hqdefault.jpg"
              contentStyle={styles.cardContent}
            />
          </ScrollView>
        </View>
      </View>
    </DrawerLeftMenu>
  );
};

export default MyMatch;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  content: {
    paddingHorizontal: width * 0.05,
    paddingVertical: "2.5%",
  },

  scrollViewContainer: {},

  scrollView: {
    width: width * 0.9,
    height: height * 0.55,
  },

  card: {
    padding: 10,
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
