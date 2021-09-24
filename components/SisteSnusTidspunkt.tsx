import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { getAlleSisteSnustidspunkt } from '../sql'

const SisteSnusTidspunkt = () => {
  const [sisteSnusTidspunkt, setSisteSnusTidspunkt] = useState([])

  useEffect(() => {
    getAlleSisteSnustidspunkt(setSisteSnusTidspunkt)
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