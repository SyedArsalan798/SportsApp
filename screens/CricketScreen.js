import axios from "axios";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

export default function CricketScreen({ navigation }) {
  const [cricketData, setCricketData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchCricketData = async () => {
    const options = {
      method: "GET",
      url: "https://cricket-live-data.p.rapidapi.com/fixtures",
      headers: {
        "X-RapidAPI-Key": "YOUR_API_KEY",
        "X-RapidAPI-Host": "cricket-live-data.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setCricketData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchCricketData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCricketData();
    setRefreshing(false);
  };

  const results = cricketData?.results?.map((result) => {
    const datePart = result.date.slice(0, 10); // YYYY-MM-DD
    const timePart = result.date.slice(11, 16); // HH:MM

    // Format the date to a more readable style (e.g., "2020-09-21" to "Sep 21, 2020")
    const [year, month, day] = datePart.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${monthNames[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;

    // Convert 24-hour time to 12-hour time with AM/PM
    const [hour, minute] = timePart.split(":");
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? "PM" : "AM";
    const formattedHour = hourInt % 12 || 12; // Converting to 12-hour format

    const formattedTime = `${formattedHour}:${minute} ${period}`;
    const betweenTeams = result.match_title.slice(0, result.match_title.indexOf(" at "));
    const [firstTeam, secondTeam] = betweenTeams.split(" v ");

    return (
      <TouchableOpacity
        key={result.id}
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("cricket_details", { result })}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
          <Text style={styles.cardTexts}>{result.match_subtitle}</Text>
          <Text style={styles.cardTexts}>
            {formattedDate} • {formattedTime}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          <Text style={styles.matchBetween}>{firstTeam}</Text>
          <Text style={styles.vs}>VS</Text>
          <Text style={styles.matchBetween}>{secondTeam}</Text>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#000"]} />
      }
    >
      {loading ? (
        <View>
          <ActivityIndicator size={50} color="black" />
        </View>
      ) : (
        results
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#ddd",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardTexts: {
    fontSize: 14,
    color: "#777",
  },
  matchBetween: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  vs: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
});

