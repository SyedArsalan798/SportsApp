import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "axios";

export default function FootballScreen({ navigation }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFootballData = async () => {
    const options = {
      method: "GET",
      url: "https://sports-live-scores.p.rapidapi.com/football/live",
      headers: {
        "X-RapidAPI-Key": "YOUR_API_KEY",
        "X-RapidAPI-Host": "sports-live-scores.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setMatches(response.data.matches);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFootballData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFootballData();
    setRefreshing(false);
  };

  const matchCards = matches.map((match) => {
    return (
      <TouchableOpacity
        key={match["Match ID"]}
        style={styles.card}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("football_details", { match })
        }
      >
        <View style={styles.cardHeader}>
          <Text style={styles.leagueText}>{match["League"]}</Text>
          <Text style={styles.matchStatus}>{match["Status"]}</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.teams}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "black" }}
            >
              {match["Home Team"]}
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "green" }}
            >
              VS
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "black" }}
            >
              {match["Away Team"]}
            </Text>
          </View>
          <View style={styles.teams}>
            <Text style={styles.leagueText}>{match["Home Score"]}</Text>
            <Text style={styles.leagueText}>{match["Away Score"]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });


  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#000"]} // Color of the loading spinner during refresh
        />
      }
    >
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={50} color="black" />
        </View>
      ) : (
        
        matchCards.length != 0 ? matchCards : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>No Live matches available</Text></View>
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leagueText: {
    fontSize: 14,
    color: "#777",
  },
  matchStatus: {
    fontSize: 14,
    color: "#777",
  },
  cardBody: {
    marginTop: 5,
  },
  teams: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

