import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider'; //haven't actually installed

const SKILLS = ['Frontend', 'Backend', 'Mobile', 'Database'];
const MIN = 0;
const MAX = 5;

export default function App() {

  const [value, setValue] = useState(0);
  const [values, setValues] =useState(new Array(SKILLS.length).fill(0));
  const [average, setAverage] = useState(0);

  useEffect(() => {
    calculateAverageSkill();
  }, [values]);

  // this kind of practice in assignment(?)
  const items = [];
  for (let i = 0; i < SKILLS.length; i++) {
    items.push(
      <View key={"item" + i} style={styles.skills}>
        <Text style={styles.skill}>{SKILLS[i]}</Text>
        <Text style={styles.value}>Skill: {values[i]}</Text>
        <Container fluid>
          <Row>
            <Col><Text style={styles.min}>{MIN}</Text></Col>
            <Col xs="9">
              <Slider
                minimumValue={MIN}
                maximumValue={MAX}
                step={1}
                value={values[i]}
                minimumTrackTintColor="#006666"
                maximumTrackTintColor="#ff9900"
                onValueChange={(val) => setSkillValue(val, i)}/>
            </Col>
            <Col><Text>{MAX}</Text></Col>
          </Row>
        </Container>
      </View>
    );
  }

  const setSkillValue = (val, i) => {
    let skillValues = [...values];
    skillValues[i] = val;
    setValues(skillValues)
  }

  const calculateAverageSkill = () => {
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = (sum / values.length) || 0;
    setAverage(avg);
  }

  return (
    <View style={sytles.container}>
      <Text>Value: {value}</Text>
      <Slider 
        style={{width: 200, height: 40}}
        minimumvalue={0}
        maximumValue={10}
        step={1}
        value={value}
        minumunTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={(val) => setValue(val)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'cetner',
    marginTop: 40
  },
  header: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold'
  },
  skills: {
    alignItems: 'center',
  },
  skill: {
    marginTop: 30,
    fontSize: 25
  },
  min: {
    marginLeft: 10
  },
  value: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 25
  },
  averageHeader: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25
  },
  averageValue: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 40
  }
  
});

//2 codes in one js-file by accident
return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={styles.header}>Skill set</Text>
      <View>{items}</View>
      <Text style={styles.averageHeader}>Average</Text>
      <Text style={styles.averageValue}>{average}</Text>
    </ScrollView>
  </SafeAreaView>
);


