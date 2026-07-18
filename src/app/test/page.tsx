'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { allQuestions } from '@/data'
import { Question } from '@/data/questions'

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ questionId: number; optionIndex: number }[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    setQuestions(allQuestions)
  }, [])

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNext = () => {
    if (selectedOption === null) return

    const newAnswers = [...answers, { questionId: questions[currentQuestion].id, optionIndex: selectedOption }]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
    } else {
      // Test completed, save answers and go to results
      localStorage.setItem('testAnswers', JSON.stringify(newAnswers))
      router.push('/result')
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[currentQuestion - 1]?.optionIndex ?? null)
      setAnswers(answers.slice(0, -1))
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (questions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载题目中...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              题目 {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm text-purple-600 font-medium">
              {questions[currentQuestion].category}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8">
            {questions[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-5 rounded-xl transition-all duration-300 ${
                  selectedOption === index
                    ? 'bg-purple-50 border-2 border-purple-500 shadow-md'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    selectedOption === index
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={`text-base ${
                    selectedOption === index ? 'text-purple-700 font-medium' : 'text-gray-700'
                  }`}>
                    {option.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              currentQuestion === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            上一题
          </button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
              selectedOption !== null
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? '查看结果' : '下一题'}
          </motion.button>
        </div>

        {/* Tips */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>请根据你的第一直觉选择最符合的选项</p>
        </div>
      </div>
    </main>
  )
}
