import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Modal,
  StyleSheet
} from 'react-native';

type Workout = {
  key: string;
  name: string;
};

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [exercise, setExercise] = useState('');
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const logWorkout = () => {
    if (exercise.trim()) {
      const newWorkout: Workout = {
        key: Date.now().toString(),
        name: exercise
      };
      setWorkouts(prev => [...prev, newWorkout]);
      setExercise('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏋️ Workout Quest</Text>

      <Button title="Log Workout" onPress={() => setModalVisible(true)} />

      <FlatList
        data={workouts}
        renderItem={({ item }) => <Text style={styles.workout}>{item.name}</Text>}
        keyExtractor={(item) => item.key}
        style={{ marginTop: 20, width: '80%' }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>What workout did you do?</Text>
            <TextInput
              value={exercise}
              onChangeText={setExercise}
              placeholder="e.g., Squats"
              style={styles.input}
            />
            <Button title="Add Workout" onPress={logWorkout} />
            <View style={{ height: 10 }} />
            <Button title="Cancel" color="gray" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000'
  },
  workout: {
    fontSize: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#000'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    color: '#000'
  }
});
