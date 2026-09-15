import { useState } from 'react'
import characterCoder from '../assets/character-coder.webp'
import { quizQuestions } from '../data/quizQuestions'

// Sayfanın sonundaki küçük mülakat quizine giriş bileşeni.
function CharacterGame() {

  const [isOpen, setIsOpen] = useState(false)
  const [activeQuestions, setActiveQuestions] = useState([])
  const [hasStarted, setHasStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) // Ziyaretçinin şu an kaçıncı soruda olduğunu tutar.
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null) // Seçilen cevabı ve rengini göstermek için tutar.

  function toggleQuiz() {
    if (isOpen) {
      setIsOpen(false)
      return
    }

    setHasStarted(false)   // Yeni açılışta başlangıç ekranını gösterir.
    setActiveQuestions([]) // Önceki testin sorularını temizler.
    setIsOpen(true) // Tanıtım balonunu açar.
  }

  function startQuiz() {
    const newQuestions = getRandomQuestions(5)
    setActiveQuestions(newQuestions) // Seçilen soruları ekranda kullanmak üzere state'e kaydeder.
    setCurrentQuestionIndex(0) // Yeni quiz her zaman ilk sorudan başlar.
    setScore(0) // Yeni quizde önceki doğru cevap sayısı sıfırlanır.
    setSelectedAnswer(null)
    setHasStarted(true)   // Tanıtım ekranı yerine soru ekranını göstereceğimizi belirtir.
  }

  // Seçilen cevabı kontrol eder ve bir sonraki soruya geçer.
  function handleAnswer(selectedOption) {

    const currentQuestion = activeQuestions[currentQuestionIndex] // Ekranda olan mevcut soruyu bulur.

    // Herhangi bir soru yoksa ya da zaten bir cevap seçiliyse işlemi durdurur.
    if (!currentQuestion || selectedAnswer) {
      return
    }

    setSelectedAnswer(selectedOption) // Rengi gösterebilmek için seçilen cevabı saklar.

    // Seçilen metin doğru cevap metniyle aynıysa puanı artırır.
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((currentScore) => currentScore + 1)
    }

    // Renkleri kısa süre gösterdikten sonra sonraki soruya geçer.
    setTimeout(() => {
      setSelectedAnswer(null)
      setCurrentQuestionIndex((currentIndex) => currentIndex + 1)
    }, 900)
  }

  // Verilen sayı kadar soru seçer ve her sorunun cevaplarını da karıştırır.
  function getRandomQuestions(questionCount) {
    // Tüm soruları önce karıştırır.
    const shuffledQuestions = shuffleItems(quizQuestions)

    // Karışık havuzdan istenen sayı kadar soru alır.
    const selectedQuestions = shuffledQuestions.slice(0, questionCount)

    // Seçilen her soru için yeni bir soru nesnesi oluşturur.
    return selectedQuestions.map((question) => {
      // Sadece seçeneklerin sırası değişmiş yeni soruyu döndürür.
      return {
        id: question.id, // Sorunun kimliğini korur.
        question: question.question, // Soru metnini korur.
        options: shuffleItems(question.options),   // Seçenekleri ayrıca karıştırır.
        correctAnswer: question.correctAnswer, // Doğru cevabı metin olarak korur.
      }
    })
  }

  return (

    <aside className="character-game" aria-label="Mini mülakat quizi">
      {/* Karaktere tıklanınca görünen quiz daveti. */}
      {isOpen ? (
        <section id="quiz-panel" className="quiz-bubble" aria-label="Mini mülakat quizi">
          {/* Tüm sorular bittiğinde sonuç ekranını gösterir. */}
          {hasStarted && currentQuestionIndex >= activeQuestions.length ? (
            <>
              <p className="quiz-question">Quiz tamamlandı! 🎉</p>

              {/* Doğru cevap sayısını gösterir. */}
              <p className="quiz-progress">
                {score} / {activeQuestions.length} doğru cevap
              </p>

              {/* Başarı yüzdesini hesaplar. */}
              <p className="quiz-progress">
                Başarı oranın: %{Math.round((score / activeQuestions.length) * 100)}
              </p>

              {/* Yeni rastgele sorularla testi tekrar başlatır. */}
              <button type="button" className="quiz-start-button" onClick={startQuiz}>
                Tekrar Başla
              </button>
            </>
          ) : hasStarted && activeQuestions.length > 0 ? (
            <>
              {/* Kaçıncı soruda olduğumuzu gösterir. */}
              <p className="quiz-progress">
                Soru {currentQuestionIndex + 1} / {activeQuestions.length}
              </p>

              {/* Sıra numarasına göre güncel soruyu gösterir. */}
              <p className="quiz-question">
                {activeQuestions[currentQuestionIndex].question}
              </p>

              {/* Güncel sorunun karıştırılmış seçeneklerini listeler. */}
              <div className="quiz-options">
                {activeQuestions[currentQuestionIndex].options.map((option) => {
                  const isCorrectOption = option === activeQuestions[currentQuestionIndex].correctAnswer
                  const isSelectedWrong = selectedAnswer === option && !isCorrectOption

                  let optionClass = 'quiz-option'
                  if (selectedAnswer && isCorrectOption) {
                    optionClass += ' quiz-option--correct' // Doğru seçenek her zaman yeşil yanar.
                  } else if (isSelectedWrong) {
                    optionClass += ' quiz-option--incorrect' // Yanlış seçilen kırmızı yanar.
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      className={optionClass}
                      onClick={() => handleAnswer(option)}
                      disabled={Boolean(selectedAnswer)}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <>
              {/* Quiz başlamadan önce gösterilen açıklamadır. */}
              <p id="quiz-introduction">
                Mülakatlarda yardımcı olabilmesi için mini bir quiz hazırladım!
              </p>

              {/* Yeni rastgele soru turunu başlatır. */}
              <button type="button" className="quiz-start-button" onClick={startQuiz}>
                Başla
              </button>
            </>
          )}
        </section>
      ) : (
        <p className='character-welcome'>Birlikte keşfedelim!</p>
      )}

      {/* Pixel karakter quiz balonunu açıp kapatır. */}
      <button
        type="button"
        className="character-trigger"
        onClick={toggleQuiz}
        aria-expanded={isOpen}
        aria-controls="quiz-panel"
        aria-label="Mini mülakat quizini aç"
      >
        {/* Karakter sticker görseli */}
        <img src={characterCoder} alt="" className="character-avatar" />
      </button>
    </aside>
  )
}

function shuffleItems(items) {
  // Orijinal diziyi bozmamak için önce kopya oluşturur.
  const itemsCopy = [...items]

  // Kopyadaki elemanları rastgele sıralar.
  itemsCopy.sort(() => Math.random() - 0.5)

  // Karıştırılmış kopyayı geri verir.
  return itemsCopy
}


export default CharacterGame
