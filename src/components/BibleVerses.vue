<script setup>
import { onMounted } from 'vue'
import { useVersesStore } from '../stores/verses' 

const store = useVersesStore()

// Fetch a verse on component mount
onMounted(() => {
  if (!store.currentVerse && store.history.length === 0) {
    store.fetchRandomVerse()
  }
})
</script>

<template>
  <div class="bible-verses-container">
    <section class="current-verse-section">
      <h2>Versetul de Astăzi</h2>
      <div v-if="store.loading && !store.currentVerse" class="loading">
        Se încarcă versetul...
      </div>
      <div
        v-else-if="
          store.error && !store.currentVerse && store.history.length === 0
        "
        class="error"
      >
        {{ store.error }}
      </div>
      <div v-else class="verse-card" v-if="store.currentVerse">
        <p class="verse-text">"{{ store.currentVerse.text }}"</p>
        <p class="verse-reference">- {{ store.currentVerse.reference }}</p>
      </div>
      <div
        v-if="store.error && store.currentVerse"
        class="error subsequent-error"
      >
        {{ store.error }}
      </div>
      <button
        @click="store.fetchRandomVerse"
        :disabled="store.loading"
        class="fetch-button"
      >
        {{ store.loading ? 'Se încarcă...' : 'Obține un Verset Nou' }}
      </button>
    </section>

    <section class="history-section">
      <h2>Istoric (Ultimele 5)</h2>
      <template v-if="store.history">
        <div v-if="store.history.length > 0" class="history-list">
          <div
            v-for="(verse, index) in store.history"
            :key="`${verse.reference}-${index}`"
            class="history-item"
          >
            <p class="verse-text">"{{ verse.text }}"</p>
            <p class="verse-meta">
              {{ verse.reference }} - {{ verse.timestamp }}
            </p>
          </div>
        </div>
        <p v-else class="empty-history">Niciun verset în istoric.</p>
      </template>
      <p v-else>Istoricul nu este disponibil.</p>
    </section>
  </div>
</template>

<style scoped>
.bible-verses-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background: #f8f9fa;
  min-height: 100vh;
  color: #333;
}

.current-verse-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  width: 80%;
  max-width: 600px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.verse-card {
  background: #f1f3f5;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.verse-text {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 10px;
}

.verse-reference {
  font-style: italic;
  font-size: 0.9rem;
  color: #555;
}

.fetch-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.fetch-button:hover {
  background: #0056b3;
}

.fetch-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.history-section {
  width: 80%;
  max-width: 600px;
  margin-top: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.history-list {
  margin-top: 15px;
}

.history-item {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: left;
}

.history-item .verse-text {
  font-size: 0.9rem;
  color: #333;
}

.history-item .verse-meta {
  font-size: 0.8rem;
  color: #555;
  text-align: right;
}
</style>
