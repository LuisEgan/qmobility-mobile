import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { TextWithUnit, TriCard } from "../../../components";
import theme from "../../../config/Theme";
import { IMyStats } from "../../../gql/User/queries";

interface IStats {
  stats?: IMyStats;
}

const Stats = (props: IStats) => {
  const { stats } = props;

  return (
    <ScrollView style={styles.container}>
      <TriCard
        col1={{
          icon: "Bubble",
          title: (
            <TextWithUnit
              text={`${stats?.anualTotalMilles}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
          subTitle: "Total miles",
        }}
        col2={{
          icon: "ArrowUpLight",
          title: (
            <TextWithUnit
              text={`${stats?.averageTripLength}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
          subTitle: "Avg trip length",
        }}
        col3={{
          icon: "Clock",
          title: (
            <TextWithUnit
              text={`${stats?.maxTripLength}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
          subTitle: "Max. trip length",
        }}
      />

      <TriCard
        col1={{
          icon: "Apple",
          subTitle: "Min. trip length",
          title: (
            <TextWithUnit
              text={`${stats?.minTripLength}`}
              textVariant="heading1"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
        col2={{
          icon: "Apple",
          subTitle: "Min Range req.",
          title: (
            <TextWithUnit
              text={`${stats?.minRangeRequirement}`}
              textVariant="heading1"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
        col3={{
          icon: "Apple",
          subTitle: "Max Range req.",
          title: (
            <TextWithUnit
              text={`${stats?.maxRangeRequirement}`}
              textVariant="heading1"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
      />

      <TriCard
        col1={{
          icon: "Flash",
          title: (
            <TextWithUnit
              text={`${stats?.totalTimeInCar}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
              unit="h"
            />
          ),
          subTitle: "Time in car",
        }}
        col2={{
          icon: "Bubble",
          title: (
            <TextWithUnit
              text={`${stats?.idleTimeOfCar}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
              unit="h"
            />
          ),
          subTitle: "Idle time in car",
        }}
        col3={{
          icon: "Speed",
          title: (
            <TextWithUnit
              text={`${stats?.idlePercentageOfCar}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
              unit="%"
            />
          ),
          subTitle: "Idle %",
        }}
      />

      <TriCard
        col1={{
          icon: "Apple",
          subTitle: "Weekly Avg.",
          title: (
            <TextWithUnit
              text={`${stats?.weeklyAverageMiles}`}
              textVariant="heading1"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
        col2={{
          icon: "Apple",
          subTitle: "Daily Avg.",
          title: (
            <TextWithUnit
              text={`${stats?.dailyAverageMiles}`}
              textVariant="heading1"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
      />
    </ScrollView>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
});
