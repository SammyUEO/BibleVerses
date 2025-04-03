// stores/verses.js
import { defineStore } from 'pinia'

const bibleBooks = [
  { number: 1, name: 'Genesis', chapters: 50 },
  { number: 2, name: 'Exodus', chapters: 40 },
  { number: 3, name: 'Leviticus', chapters: 27 },
  { number: 4, name: 'Numbers', chapters: 36 },
  { number: 5, name: 'Deuteronomy', chapters: 34 },
  { number: 6, name: 'Joshua', chapters: 24 },
  { number: 7, name: 'Judges', chapters: 21 },
  { number: 8, name: 'Ruth', chapters: 4 },
  { number: 9, name: '1 Samuel', chapters: 31 },
  { number: 10, name: '2 Samuel', chapters: 24 },
  { number: 11, name: '1 Kings', chapters: 22 },
  { number: 12, name: '2 Kings', chapters: 25 },
  { number: 13, name: '1 Chronicles', chapters: 29 },
  { number: 14, name: '2 Chronicles', chapters: 36 },
  { number: 15, name: 'Ezra', chapters: 10 },
  { number: 16, name: 'Nehemiah', chapters: 13 },
  { number: 17, name: 'Esther', chapters: 10 },
  { number: 18, name: 'Job', chapters: 42 },
  { number: 19, name: 'Psalms', chapters: 150 },
  { number: 20, name: 'Proverbs', chapters: 31 },
  { number: 21, name: 'Ecclesiastes', chapters: 12 },
  { number: 22, name: 'Song of Solomon', chapters: 8 },
  { number: 23, name: 'Isaiah', chapters: 66 },
  { number: 24, name: 'Jeremiah', chapters: 52 },
  { number: 25, name: 'Lamentations', chapters: 5 },
  { number: 26, name: 'Ezekiel', chapters: 48 },
  { number: 27, name: 'Daniel', chapters: 12 },
  { number: 28, name: 'Hosea', chapters: 14 },
  { number: 29, name: 'Joel', chapters: 3 },
  { number: 30, name: 'Amos', chapters: 9 },
  { number: 31, name: 'Obadiah', chapters: 1 },
  { number: 32, name: 'Jonah', chapters: 4 },
  { number: 33, name: 'Micah', chapters: 7 },
  { number: 34, name: 'Nahum', chapters: 3 },
  { number: 35, name: 'Habakkuk', chapters: 3 },
  { number: 36, name: 'Zephaniah', chapters: 3 },
  { number: 37, name: 'Haggai', chapters: 2 },
  { number: 38, name: 'Zechariah', chapters: 14 },
  { number: 39, name: 'Malachi', chapters: 4 },
  { number: 40, name: 'Matthew', chapters: 28 },
  { number: 41, name: 'Mark', chapters: 16 },
  { number: 42, name: 'Luke', chapters: 24 },
  { number: 43, name: 'John', chapters: 21 },
  { number: 44, name: 'Acts', chapters: 28 },
  { number: 45, name: 'Romans', chapters: 16 },
  { number: 46, name: '1 Corinthians', chapters: 16 },
  { number: 47, name: '2 Corinthians', chapters: 13 },
  { number: 48, name: 'Galatians', chapters: 6 },
  { number: 49, name: 'Ephesians', chapters: 6 },
  { number: 50, name: 'Philippians', chapters: 4 },
  { number: 51, name: 'Colossians', chapters: 4 },
  { number: 52, name: '1 Thessalonians', chapters: 5 },
  { number: 53, name: '2 Thessalonians', chapters: 3 },
  { number: 54, name: '1 Timothy', chapters: 6 },
  { number: 55, name: '2 Timothy', chapters: 4 },
  { number: 56, name: 'Titus', chapters: 3 },
  { number: 57, name: 'Philemon', chapters: 1 },
  { number: 58, name: 'Hebrews', chapters: 13 },
  { number: 59, name: 'James', chapters: 5 },
  { number: 60, name: '1 Peter', chapters: 5 },
  { number: 61, name: '2 Peter', chapters: 3 },
  { number: 62, name: '1 John', chapters: 5 },
  { number: 63, name: '2 John', chapters: 1 },
  { number: 64, name: '3 John', chapters: 1 },
  { number: 65, name: 'Jude', chapters: 1 },
  { number: 66, name: 'Revelation', chapters: 22 },
]

export const useVersesStore = defineStore('verses', {
  state: () => ({
    currentVerse: null,
    history: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchRandomVerse() {
      try {
        this.loading = true
        this.error = null

        // Alege o carte aleatorie
        const randomIndexBook = Math.floor(Math.random() * bibleBooks.length)
        const randomBook = bibleBooks[randomIndexBook]
        const bookNumber = randomBook.number
        const bookName = randomBook.name
        const totalChapters = randomBook.chapters

        // Alege un capitol aleatoriu din cartea aleasă
        const randomChapter = Math.floor(Math.random() * totalChapters) + 1

        const apiUrl = `https://api.getbible.net/v2/kjv/${bookNumber}/${randomChapter}.json`

        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(
            `Network response was not ok (status: ${response.status})`
          )
        }

        const data = await response.json()

        if (!data || !data.verses) {
          console.error('API Response Data:', data)
          throw new Error('Unexpected API response format.')
        }

        const verses = data.verses
        if (!Array.isArray(verses) || verses.length === 0) {
          this.currentVerse = null
          return
        }

        // Alege un verset aleatoriu din capitolul ales
        const randomIndexVerse = Math.floor(Math.random() * verses.length)
        const randomVerseData = verses[randomIndexVerse]

        if (randomVerseData && randomVerseData.text && randomVerseData.verse) {
          const newVerse = {
            text: randomVerseData.text,
            reference: `${bookName} ${randomChapter}:${randomVerseData.verse}`,
            timestamp: new Date().toLocaleString(),
          }

          this.currentVerse = newVerse

          // Adaugă la istoric (limitează la 5)
          this.history.unshift(newVerse)
          this.history = this.history.slice(0, 5)
        } else {
          console.error('Verse Data Structure:', randomVerseData)
          throw new Error('Unexpected verse data structure in API response.')
        }
      } catch (error) {
        this.error = `Failed to fetch verse: ${error.message}`
        console.error('Error fetching/processing verse:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
