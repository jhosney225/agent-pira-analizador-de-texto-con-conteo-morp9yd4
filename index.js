```javascript
const fs = require('fs');
const readline = require('readline');

class TextAnalyzer {
  constructor(text) {
    this.text = text;
    this.words = [];
    this.analyze();
  }

  analyze() {
    // Limpiar y dividir el texto en palabras
    this.words = this.text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 0);
  }

  getWordCount() {
    return this.words.length;
  }

  getUniqueWords() {
    return new Set(this.words).size;
  }

  getCharacterCount() {
    return this.text.length;
  }

  getCharacterCountWithoutSpaces() {
    return this.text.replace(/\s/g, '').length;
  }

  getSentenceCount() {
    const sentences = this.text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.length;
  }

  getAveragWordLength() {
    if (this.words.length === 0) return 0;
    const totalLength = this.words.reduce((sum, word) => sum + word.length, 0);
    return (totalLength / this.words.length).toFixed(2);
  }

  getAveragSentenceLength() {
    const sentenceCount = this.getSentenceCount();
    if (sentenceCount === 0) return 0;
    return (this.getWordCount() / sentenceCount).toFixed(2);
  }

  getWordFrequency(limit = 10) {
    const frequency = {};
    
    this.words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([word, count]) => ({ word, count }));
  }

  getLongestWords(limit = 10) {
    const uniqueWords = [...new Set(this.words)];
    return uniqueWords
      .sort((a, b) => b.length - a.length)
      .slice(0, limit)
      .map(word => ({ word, length: word.length }));
  }

  getFullStatistics() {
    return {
      totalWords: this.getWordCount(),
      uniqueWords: this.getUniqueWords(),
      totalCharacters: this.getCharacterCount(),
      charactersWithoutSpaces: this.getCharacterCountWithoutSpaces(),
      sentences: this.getSentenceCount(),
      averageWordLength: this.getAveragWordLength(),
      averageSentenceLength: this.getAveragSentenceLength(),
      topWords: this.getWordFrequency(10),
      longestWords: this.getLongestWords(10)
    };
  }

  printReport() {
    console.log('\n' + '='.repeat(60));
    console.log('          ANÁLISIS COMPLETO DE TEXTO');
    console.log('='.repeat(60) + '\n');

    const stats = this.getFullStatistics();

    console.log('📊 ESTADÍSTICAS GENERALES:');
    console.log(`   Total de palabras: ${stats.totalWords}`);
    console.log(`   Palabras únicas: ${stats.uniqueWords}`);
    console.log(`   Diversidad léxica: ${(stats.uniqueWords / stats.totalWords * 100).toFixed(2)}%`);
    console.log(`   Total de caracteres: ${stats.totalCharacters}`);
    console.log(`   Caracteres (sin espacios): ${stats.charactersWithoutSpaces}`);
    console.log(`   Oraciones: ${stats.sentences}`);
    console.log(`   Promedio de caracteres por palabra: ${stats.averageWordLength}`);
    console.log(`   Promedio de palabras por oración: ${stats.averageSentenceLength}`);

    console.log('\n📈 TOP 10 PALABRAS MÁS FRECUENTES:');
    stats.topWords.forEach((item, index) => {
      console.log(`   ${index + 1}. "${item.word}" → ${item.count} veces`);
    });

    console.log('\n🔤 PALABRAS MÁS LARGAS:');
    stats.longestWords.forEach((item, index) => {
      console.log(`   ${index + 1}. "${item.word}" → ${item.length} caracteres`);
    });

    console.log('\n' + '='.repeat(60) + '\n');
  }
}

function getDemoTexts() {
  return [
    {
      name: 'Texto Corto',
      content: 'JavaScript es un lenguaje de programación versátil. Es utilizado en desarrollo web, mobile y backend. JavaScript permite crear aplicaciones interactivas y dinámicas. Los desarrolladores aman JavaScript por su flexibilidad y potencia.'
    },
    {
      name: 'Párrafo Medio',
      content: 'La inteligencia artificial está transformando el mundo. Los algoritmos de machine learning pueden analizar grandes volúmenes de datos en segundos. Las empresas utilizan IA para mejorar su eficiencia operativa. La IA también está revolucionando la medicina, permitiendo diagnósticos más precisos. Sin embargo, existen preocupaciones sobre la privacidad y el sesgo en los sistemas de IA. Es importante desarrollar IA de manera responsable y ética. La IA no reemplazará a los humanos, sino que trabajará junto a ellos para crear soluciones innovadoras.'
    },
    {
      name: 'Archivo Personalizado',
      content: null
    }
  ];
}

async function getCustomInput() {
  const 