import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { getSisteSnustidspunkt, insertNySnustidspunkt } from '../sql'

const snusGrense = {
  timer: 0,
  minutter: 2,
  sekunder: 0,
}

const TaEnSnus = () => {
  const [sisteSnusTid, setSisteSnusTid] = useState('')

  useEffect(() => {
    getSisteSnustidspunkt(setSisteSnusTid)
  }, [])

  const onPressButton = () => {
    const tid = Date.now()
    const isostring = new Date(tid).toISOString()

    setSisteSnusTid(isostring)

    insertNySnustidspunkt(isostring)
  }

  const tidSidenForrigeSnus = () => {
    const nå = Date.now()
    const sisteSnus = new Date(sisteSnusTid).getTime()
    const differanse = nå - sisteSnus

    if (differanse / 1000 < 60) return `${Math.round(differanse / 1000)} sekunder`

    if (differanse / (1000 * 60) < 60) return `${Math.round(differanse / (1000 * 60))} minutter`

    if (differanse / (1000 * 60 * 60) < 24) return `${Math.round(differanse / (1000 * 60 * 60))} timer`

    if (differanse / (1000 * 60 * 60 * 24) < 7) return `${Math.round(differanse / (1000 * 60 * 60 * 24))} dager`
  }

  const tidsgrense = snusGrense.timer * 60 * 60 * 1000 + snusGrense.minutter * 60 * 1000 + snusGrense.sekunder * 1000
  const kanTaEnSnusTil = tidSidenForrigeSnus() ? Date.now() - new Date(sisteSnusTid).getTime() > tidsgrense : true

  return (
    <View>
      <Text style={styles.tidText}>
        {tidSidenForrigeSnus() ?
          `${tidSidenForrigeSnus()} siden forrige snus` :
          'Du har ikke tatt en snus enda!'
        }
      </Text>
      <Text style={styles.tidUnderText}>
        Du kan snuse en snus per
        {snusGrense.timer !== 0 ? ` ${snusGrense.timer} timer` : ''}
        {snusGrense.minutter !== 0 ? ` ${snusGrense.minutter} minutter` : ''}
        {snusGrense.sekunder !== 0 ? ` ${snusGrense.sekunder} sekunder` : ''}
      </Text>
      {kanTaEnSnusTil ?
        <TouchableOpacity
          onPress={onPressButton}
          style={styles.greenButton}
        >
          <Text style={styles.buttonText}>Ta deg en snus</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
          onPress={onPressButton}
          style={styles.redButton}
        >
          <Text style={styles.notAllowedText}>Må vente litt til før du kan ta en snus</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tidText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tidUnderText: {
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 30
  },
  greenButton: {
    backgroundColor: '#4a412a',
    height: 250,
    width: 250,
    borderRadius: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderWidth: 2,
    borderColor: '#262626'
  },

  redButton: {
    backgroundColor: '#faedcd',
    height: 250,
    width: 250,
    borderRadius: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderWidth: 2,
    borderColor: '#616161'
  },
  buttonText: {
    fontSize: 35,
    textAlign: 'center',
    color: '#e3ddcf'
  },
  notAllowedText: {
    fontSize: 35,
    textAlign: 'center',
    color: '#616161'
  }
});

export default TaEnSnus