import { View, Text } from 'react-native'
import React from 'react'
import { Recipe } from '../components/recipes'

export default function TestScreen() {
    const test = {
        "strMeal": "Baked salmon with fennel & tomatoes",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/1548772327.jpg",
        "idMeal": "52959",
    }
  return (
    <Recipe recipe={test} />
  )
}