import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import TaEnSnus from './components/TaEnSnus'
import SisteSnusTidspunkt from './components/SisteSnusTidspunkt'
import { initDb } from './sql'
import * as SQLite from 'expo-sqlite'

const pages = {
  taEnSnus: 'TaEnSnus',
  sisteSnusTidspunkt: 'SisteSnusTidspunk'
}

export default function App() {
  const [activePage, setActivePage] = useState(pages.taEnSnus)

  useEffect(() => {
    initDb()
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <StatusBar style="auto" />
      </View>
      <View style={styles.content}>
        {activePage === pages.taEnSnus ?
          <TaEnSnus /> : <SisteSnusTidspunkt />
        }

      </View>
      <View style={styles.topmeny}>
        {activePage !== pages.taEnSnus &&
          <Button
            onPress={() => setActivePage(pages.taEnSnus)}
            title="Ta en snus"
          />}
        {activePage !== pages.sisteSnusTidspunkt &&
          <Button
            onPress={() => setActivePage(pages.sisteSnusTidspunkt)}
            title="Se dagens snusings"
          />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topmeny: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
});
