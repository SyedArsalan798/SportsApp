import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Football_Details({ navigation, route }) {
    const { match } = route.params;

    // Determine who is leading
    const isAwayLeading = match['Away Score'] > match['Home Score'];
    const isDraw = match['Away Score'] === match['Home Score'];
    const leadingTeam = isAwayLeading ? match['Away Team'] : match['Home Team'];
    const leadingScore = isAwayLeading ? match['Away Score'] : match['Home Score'];
    const trailingScore = isAwayLeading ? match['Home Score'] : match['Away Score'];

    const impliedHomeProb = match['Live Home Odd'] ? 1 / match['Live Home Odd'] : 0;
    const impliedDrawProb = match['Live Draw Odd'] ? 1 / match['Live Draw Odd'] : 0;
    const impliedAwayProb = match['Live Away Odd']  ? 1 / match['Live Away Odd']  : 0;

    // Normalize probabilities so they add up to 1 (or 100%)
    const totalImpliedProb = impliedHomeProb + impliedDrawProb + impliedAwayProb;

    const normalizedHomeProb = totalImpliedProb ? impliedHomeProb / totalImpliedProb : '';
    const normalizedDrawProb = totalImpliedProb ? impliedDrawProb / totalImpliedProb : 0;
    const normalizedAwayProb = totalImpliedProb ? impliedAwayProb / totalImpliedProb : 0;



    return (
        <View style={styles.container}>
            <Text style={styles.header}>League: {match['League']}</Text>

            <View style={styles.wholeTeamContainer}>
            
            <View style={styles.teamContainer}>
                <Text style={styles.leading}>Home Team</Text>
                <Text style={styles.leading}>Away Team</Text>
            </View>

            <View style={styles.teamContainer}>
                
                <Text style={styles.team}>{match['Home Team']}</Text>
                <Text style={styles.vs}>VS</Text>
                <Text style={styles.team}>{match['Away Team']}</Text>
            </View>
            
            </View>

            <View style={styles.scoreContainer}>
                <Text style={styles.scores}>
                    {match['Home Score']} - {match['Away Score']}
                </Text>
                <Text style={styles.leading}>
                    {!isDraw ? <Text>Leading: {leadingTeam}</Text> : "Draw"} ({leadingScore} - {trailingScore})
                </Text>
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>Match Status:</Text>
                <Text style={styles.value}>{match['Status']}</Text>
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>Live Odds:</Text>
                <View style={styles.liveOdds}>
                    {/* Home: {(normalizedHomeProb * 100).toFixed(2)!=0 ? <>{(normalizedHomeProb * 100).toFixed(2)}%</> : '-'}, */}
                    <Text>Home: {(normalizedHomeProb * 100).toFixed(2)!=0 ? <>{(normalizedHomeProb * 100).toFixed(2)}%</> : '-'}</Text>
                    {/* Draw: {(normalizedDrawProb * 100).toFixed(2)!=0 ? <>{(normalizedDrawProb * 100).toFixed(2)}%</> : '-'}, */}
                    <Text>Draw: {(normalizedDrawProb * 100).toFixed(2)!=0 ? <>{(normalizedDrawProb * 100).toFixed(2)}%</> : '-'}</Text>
                    <Text>Away: {(normalizedAwayProb * 100).toFixed(2)!=0 ? <>{(normalizedAwayProb * 100).toFixed(2)}%</> : '-'}</Text>
                    {/* Away: {(normalizedAwayProb * 100).toFixed(2)!=0 ? <>{(normalizedAwayProb * 100).toFixed(2)}%</> : '-'} */}
                </View>
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
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        paddingBottom: 10,
    },
    teamContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 10,
        // backgroundColor: '#dcdcdc',
        borderRadius: 10,
        // marginBottom: 5,
    },
    wholeTeamContainer: {

        padding: 10,
        backgroundColor: '#dcdcdc',
        borderRadius: 10,
        marginBottom: 10,
    },
    team: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    vs: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green',
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#dcdcdc',
        borderRadius: 10,
        marginBottom: 10,
    },
    scores: {
        fontSize: 18,
        color: '#333',
    },
    leading: {
        fontSize: 16,
        color: '#555',
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
        fontSize: 15,
        color: '#333',
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
    liveOdds: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        // padding: 10,
        // backgroundColor: '#dcdcdc',
        // borderRadius: 10,
        // marginBottom: 10,
    }
});
