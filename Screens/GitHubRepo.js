import {
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';

const GitHubRepo = () => {

    const [username, setUsername] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRepositories = async () => {
        setLoading(true);
        setError(null);

        try {
            if (!username.trim()) {
                throw new Error("Please enter a valid GitHub Username");
            }

            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            const data = await response.json();

            if (response.ok) {
                setRepositories(data);
            } else {
                setError("Failed to fetch repositories");
            }
        } catch (error) {
            setError("An error occurred");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: "center", marginTop: 100 }}>
                <Image source={require('./../assets/github.jpg')} style={{ width: 160, height: 160 }} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center", marginTop: 80 }}>
                    <TextInput placeholder='Enter your GitHub Username' placeholderTextColor={"white"} value={username} onChangeText={setUsername} style={styles.input} />
                    <TouchableOpacity style={styles.button}>
                        <Text style={{
                            color: "black",
                            textAlign: "center",
                            fontWeight: "bold"
                        }} onPress={fetchRepositories} >Get Repositories</Text>
                    </TouchableOpacity>
                    {loading && <ActivityIndicator size={'large'} color={"#0000ff"} />}
                    {error && <Text style={styles.errorText}>Error: {error}</Text>}
                    <Text style={{
                        opacity: 0.6,
                        fontSize: 12,
                        textAlign: "center",
                        paddingTop: 10,
                        color: "#d0d0d0"
                    }} >*Get your repositories here</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={repositories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Text style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "white"
                        }}>{item.name}</Text>} showsVerticalScrollIndicator={true} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default GitHubRepo;

const styles = StyleSheet.create({
    button: {
        padding: 15,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        marginTop: 10,
    },
    input: {
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderColor: "rgba(255,255,255,0.4)",
        borderWidth: 0.7,
        borderRadius: 6,
        marginBottom: 10,
        lineHeight: 14,
        color: "white"
    },

    container: {
        flex: 1,
        backgroundColor: "black",
    },

    errorText: {
        color: "red",
        marginTop: 10,
    },

    repositoryText: {
        color: "white",
        marginTop: 10,
        textAlign: "center",
        fontWeight: "bold"
    },

    infoText: {
        opacity: 0.6,
        fontSize: 12,
        textAlign: "center",
        paddingTop: 10,
        color: "white"
    }
});
