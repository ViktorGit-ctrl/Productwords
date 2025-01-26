const fs = require('fs')

;(async () => {
        const reviews = await fs.promises.readFile('reviews.txt', 'utf-8')
        const words = reviews.toLowerCase().split(/\s+/)
        const wordCount = new Map()

        for (const word of words) {
            if (word.length === 0) continue
            if (wordCount.has(word)) {
                wordCount.set(word, wordCount.get(word) + 1)
            } else {
                wordCount.set(word, 1)
            }
        }

        const sortedWords = [...wordCount.entries()]
            .sort((a, b) => b[1] - a[1]) 
        const topWords = sortedWords.slice(0, 100) // Prendre les x premiers mots
        console.log(topWords)

})()
