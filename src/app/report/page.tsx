'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { allQuestions } from '@/data'
import { calculateScores, calculatePathScores, determinePersonality, getDevelopmentAdvice } from '@/lib/calculator'

export default function ReportPage() {
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
          <p className="text-gray-600">正在生成完整报告...</p>
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

  const motivationalQuotes = [
    '你不是没有能力，而是在错误的方向上消耗自己。',
    '选择比努力更重要，但正确的选择需要正确的认知。',
    '每个人都有属于自己的时区，不必羡慕别人的成功。',
    '真正的稳定不是在一个地方待一辈子，而是走到哪里都有饭吃。',
    '人生最大的遗憾不是失败，而是我本可以。'
  ]

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

  return (
    <main className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="glass px-4 py-2 rounded-full text-sm font-medium text-purple-600">
              📊 完整报告
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            AI未来发展诊断报告
          </h1>
          <p className="text-gray-600">
            终将上岸导航 · 为你的人生保驾护航
          </p>
        </motion.div>

        {/* User Info Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold mb-4">个人信息</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-500">年级</p>
              <p className="font-medium">{result.userInfo.grade}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-500">专业</p>
              <p className="font-medium">{result.userInfo.major}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-500">学校层次</p>
              <p className="font-medium">{result.userInfo.school_level}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-500">意向城市</p>
              <p className="font-medium">{result.userInfo.ideal_city}</p>
            </div>
          </div>
        </motion.div>

        {/* Personality Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`glass rounded-2xl p-8 mb-8 bg-gradient-to-r ${result.personality.color} text-white`}
        >
          <h3 className="text-xl font-semibold mb-4">人格解析</h3>
          <div className="flex items-center mb-6">
            <div className="text-6xl mr-6">{result.personality.icon}</div>
            <div>
              <h4 className="text-2xl font-bold mb-2">{result.personality.name}</h4>
              <p className="opacity-90">{result.personality.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
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

        {/* Path Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 gradient-text">路径匹配度分析</h3>
          <div className="space-y-6">
            {sortedPaths.map(([path, score]: any, index) => (
              <div key={path}>
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{pathIcons[path]}</span>
                  <span className="font-medium">{pathNames[path]}</span>
                  <span className="ml-auto text-lg font-semibold">{score}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                    className={`h-3 rounded-full ${
                      index === 0
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                        : index === 1
                        ? 'bg-gradient-to-r from-purple-400 to-indigo-400'
                        : 'bg-gray-400'
                    }`}
                  />
                </div>
                {index === 0 && (
                  <p className="text-sm text-green-600 mt-2">✦ 最推荐方向</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Strength Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 gradient-text">优势分析</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(result.scores).map(([key, value]: any) => {
              const labels: { [key: string]: string } = {
                risk_preference: '风险偏好',
                learning_ability: '学习能力',
                long_term_investment: '长期投入能力',
                stability_need: '稳定需求',
                entrepreneurship: '创业倾向',
                social_preference: '社交偏好',
                city_preference: '城市发展偏好',
                competition: '竞争倾向'
              }
              
              return (
                <div key={key} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{labels[key]}</p>
                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div
                        className="h-2 bg-purple-500 rounded-full"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-4 font-semibold">{value}%</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Risk Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 gradient-text">风险分析</h3>
          <div className="space-y-4">
            {result.scores.risk_preference > 70 && (
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-yellow-800">⚠️ 你的风险偏好较高，建议在做重大决策前充分评估风险。</p>
              </div>
            )}
            {result.scores.stability_need < 30 && (
              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-blue-800">ℹ️ 你对稳定性的需求较低，适合挑战性强的工作。</p>
              </div>
            )}
            {result.scores.long_term_investment > 80 && (
              <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
                <p className="text-green-800">✅ 你的长期投入能力很强，适合需要长期坚持的目标。</p>
              </div>
            )}
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-gray-700">建议定期回顾自己的职业规划，根据实际情况调整方向。</p>
            </div>
          </div>
        </motion.div>

        {/* Development Advice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 gradient-text">未来五年行动建议</h3>
          <div className="space-y-6">
            {result.advice.map((advice: string, index: number) => (
              <div key={index} className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-gray-700">{advice}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="glass rounded-2xl p-8 mb-8 text-center bg-gradient-to-r from-purple-50 to-indigo-50"
        >
          <div className="text-4xl mb-4">💫</div>
          <h3 className="text-xl font-semibold mb-4 gradient-text">专属成长金句</h3>
          <p className="text-lg text-gray-700 italic">"{randomQuote}"</p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.print()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
          >
            📥 保存报告
          </motion.button>
          <div>
            <button
              onClick={() => {
                localStorage.removeItem('userInfo')
                localStorage.removeItem('testAnswers')
                router.push('/')
              }}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              重新测试
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© 2024 终将上岸导航 - AI未来发展诊断</p>
          <p className="mt-2">本测评结果仅供参考，不构成任何决策建议</p>
        </footer>
      </div>
    </main>
  )
}
