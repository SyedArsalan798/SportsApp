import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Icons for enhanced visuals
// import { format, parseISO } from 'date-fns'; // To format the date

export default function CricketDetails({ navigation, route }) {
    const { result } = route.params;

    const datePart = result.date.slice(0, 10); // YYYY-MM-DD
    const timePart = result.date.slice(11, 16); // HH:MM

    // Format the date to a more readable style (e.g., "2020-09-21" to "Sep 21, 2020")
    const [year, month, day] = datePart.split('-');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${monthNames[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;

    // Convert 24-hour time to 12-hour time with AM/PM
    const [hour, minute] = timePart.split(':');
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 || 12; // Converting to 12-hour format

    const formattedTime = `${formattedHour}:${minute} ${period}`;
    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black', paddingBottom: 10}}>Stage: {result.match_subtitle}</Text>

            <View style={styles.teamContainer}>
                <Text style={styles.team}>{result.home.name}</Text>
                <Text style={styles.vs}>VS</Text>
                <Text style={styles.team}>{result.away.name}</Text>
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>Match Title:</Text>
                <Text style={styles.value}>{result.match_title}</Text>
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{formattedDate} at {formattedTime}</Text>
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>Venue:</Text>
                <Text style={styles.value}>{result.venue}</Text>
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>Result:</Text>
                <Text style={styles.value}>{!result.result ? "Pending" : result.result}</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
            >
            <MaterialIcons name="arrow-back" size={20} color="#ffffff" />
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
        paddingTop: 10,
    },

    detailContainer: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#555',
    },
    value: {
        color: '#333',
        fontSize: 15,
        // marginTop: 5,
    },
    teamContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#dcdcdc',
        borderRadius: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    team: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    vs: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green', // Dark gray for "VS"
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 10,
    },
    buttonText: {
        color: '#ffffff',
        marginLeft: 5,
    },
});
