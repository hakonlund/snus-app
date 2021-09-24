import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, Text, View, TextComponent } from 'react-native';
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('snusdb.db')

const SisteSnusTidspunkt = () => {
  const [sisteSnusTidspunkt, setSisteSnusTidspunkt] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql("SELECT Tidspunkt FROM SnusTidspunkt", [],
        (_, resultset) => {
          setSisteSnusTidspunkt(resultset.rows._array)
        })
    })
  }, [])

  const getDagensSnus = () => {
    return sisteSnusTidspunkt.filter(snus => new Date(snus.Tidspunkt).getDate() === new Date().getDate())
  }

  return (
    <View>
      {getDagensSnus().length === 0 ?
        <View>
          <Text style={styles.tittel}>
            Ingen snusing enda!
          </Text>
        </View>
        :
        <View>
          <Text style={styles.tittel}>
            {getDagensSnus().length} snus i dag!
          </Text>
          <View style={styles.snusListe}>
            {getDagensSnus().map((snus, id) => {
              const snusdato = new Date(snus.Tidspunkt)

              const snustidspunkt = `${snusdato.getHours()}:${snusdato.getMinutes()}:${snusdato.getSeconds()}`

              return <Text style={styles.snus} key={id}>Kl {snustidspunkt}</Text>
            })}
          </View>
        </View>
      }

    </View>)
}

const styles = StyleSheet.create({
  tittel: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  snusListe: {
    display: 'flex',
    alignItems: 'center',
  },
  snus: {
    fontSize: 18,
  }
});

export default SisteSnusTidspunkt