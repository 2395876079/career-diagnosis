'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { allQuestions } from '@/data'
import { calculateScores, calculatePathScores, determinePersonality, getDevelopmentAdvice } from '@/lib/calculator'
import { personalities } from '@/data/personality'

export default function ResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userInfoStr = localStorage.getItem('userInfo')
    const testAnswersStr = localStorage.getItem('testAnswers')

    if (!userInfoStr || !testAnswersStr) {
      router.push('/')
      return
    }

    const userInfo = JSON.parse(userInfoStr)
    const testAnswers = JSON.parse(testAnswersStr)

    const scores = calculateScores(testAnswers, allQuestions)
    const pathScores = calculatePathScores(scores, userInfo)
    const personality = determinePersonality(scores)
    const advice = getDevelopmentAdvice(pathScores, personality)

    setResult({
      userInfo,
      scores,
      pathScores,
      personality,
      advice
    })
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在生成你的专属报告...</p>
        </div>
      </main>
    )
  }

  const pathNames: { [key: string]: string } = {
    postgrad: '考研',
    civil_service: '考公',
    employment: '就业',
    entrepreneurship: '创业',
    phd: '读博'
  }

  const pathIcons: { [key: string]: string } = {
    postgrad: '📚',
    civil_service: '🏛️',
    employment: '💼',
    entrepreneurship: '🚀',
    phd: '🎓'
  }

  const sortedPaths = Object.entries(result.pathScores)
    .sort(([, a]: any, [, b]: any) => b - a)

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="glass px-4 py-2 rounded-full text-sm font-medium text-purple-600">
              ✨ 测评完成
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            你的专属发展报告
          </h1>
          <p className="text-gray-600">
            基于多维度测评，为你量身定制
          </p>
        </motion.div>

        {/* Personality Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`glass rounded-2xl p-8 mb-8 bg-gradient-to-r ${result.personality.color} text-white`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-2">你的人格类型</p>
              <h2 className="text-3xl font-bold mb-2">{result.personality.icon} {result.personality.name}</h2>
              <p className="opacity-90">{result.personality.description}</p>
            </div>
            <div className="text-6xl">{result.personality.icon}</div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {result.personality.traits.map((trait: string, index: number) => (
              <span
                key={index}
                className="bg-white/20 px-3 py-1 rounded-full text-sm"
              >
                {trait}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Path Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 gradient-text">路径匹配度分析</h3>
          <div className="space-y-6">
            {sortedPaths.map(([path, score]: any, index) => (
              <div key={path} className="flex items-center">
                <div className="w-20 text-center">
                  <span className="text-2xl">{pathIcons[path]}</span>
                  <p className="text-sm mt-1">{pathNames[path]}</p>
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-gray-200 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`h-4 rounded-full ${
                        index === 0
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                          : index === 1
                          ? 'bg-gradient-to-r from-purple-400 to-indigo-400'
                          : 'bg-gray-400'
                      }`}
                    />
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className="text-lg font-semibold">{score}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Development Advice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 gradient-text">发展建议</h3>
          <div className="space-y-4">
            {result.advice.map((advice: string, index: number) => (
              <div key={index} className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700">{advice}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Report Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/report')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
          >
            查看完整报告
          </motion.button>
          <button
            onClick={() => {
              localStorage.removeItem('userInfo')
              localStorage.removeItem('testAnswers')
              router.push('/')
            }}
            className="block mx-auto mt-4 text-gray-500 hover:text-gray-700 text-sm"
          >
            重新测试
          </button>
        </motion.div>
      </div>
    </main>
  )
}
