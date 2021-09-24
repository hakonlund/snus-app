import React from 'react'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('snusdb.db')

export const initDb = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS SnusTidspunkt (Id integer PRIMARY KEY AUTOINCREMENT, Tidspunkt DateTime)",
      [], () => { },
      (_, error) => {
        console.log(error)
        return false
      }
    )
  })
}

export const getSisteSnustidspunkt = (callback: Function) => {
  db.transaction(tx => {
    tx.executeSql("SELECT Tidspunkt FROM SnusTidspunkt ORDER BY Tidspunkt DESC", [],
      (_, resultset) => {
        callback(resultset.rows._array[0]?.Tidspunkt)
      })
  })
}

export const getAlleSisteSnustidspunkt = (callback: Function) => {
  db.transaction(tx => {
    tx.executeSql("SELECT Tidspunkt FROM SnusTidspunkt", [],
      (_, resultset) => {
        callback(resultset.rows._array)
      })
  })
}

export const insertNySnustidspunkt = (snusTidspunkt: string) => {
  db.transaction(tx => {
    tx.executeSql("INSERT INTO SnusTidspunkt (Tidspunkt) VALUES (?)",
      [snusTidspunkt],
      () => { },
      (_, error) => {
        console.log(error)
        return true
      })
  })
}