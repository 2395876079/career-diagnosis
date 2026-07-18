'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { personalities } from '@/data/personality'

export default function Home() {
  const router = useRouter()
  const [hoveredPersonality, setHoveredPersonality] = useState<string | null>(null)

  const startTest = () => {
    router.push('/userinfo')
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <span className="glass px-4 py-2 rounded-full text-sm font-medium text-purple-600">
                ✨ AI 智能诊断
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              AI未来发展诊断
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10">
              3分钟，看见更适合你的未来
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startTest}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              立即开始测试
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Personality Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              七种人格，你是哪一种？
            </h2>
            <p className="text-gray-600 text-lg">
              每种人格都有独特的优势和发展路径
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalities.map((personality, index) => (
              <motion.div
                key={personality.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPersonality(personality.id)}
                onMouseLeave={() => setHoveredPersonality(null)}
                className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  hoveredPersonality === personality.id ? 'transform -translate-y-2 shadow-xl' : ''
                }`}
              >
                <div className="text-4xl mb-4">{personality.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{personality.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {personality.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {personality.traits.slice(0, 2).map((trait, i) => (
                    <span
                      key={i}
                      className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              为什么选择我们？
            </h2>
            <p className="text-gray-600 text-lg">
              科学测评，精准分析，为你指明方向
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: '精准匹配',
                description: '基于多维度测评，精准匹配最适合你的发展路径'
              },
              {
                icon: '📊',
                title: '科学分析',
                description: '结合心理学和职业发展理论，提供科学的发展建议'
              },
              {
                icon: '🚀',
                title: '行动指南',
                description: '不仅告诉你是什么，更告诉你怎么做'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              准备好发现你的未来了吗？
            </h2>
            <p className="text-purple-100 text-lg mb-10">
              只需3分钟，开启你的人生新篇章
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startTest}
              className="bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              立即开始测试
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 终将上岸导航 - AI未来发展诊断</p>
          <p className="mt-2">本测评仅供参考，不构成任何决策建议</p>
        </div>
      </footer>
    </main>
  )
}
