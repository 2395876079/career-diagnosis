'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface UserInfo {
  grade: string
  major: string
  school_level: string
  preparing_postgrad: boolean
  preparing_civil: boolean
  family_support: boolean
  ideal_city: string
}

export default function UserInfoPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo>({
    grade: '',
    major: '',
    school_level: '',
    preparing_postgrad: false,
    preparing_civil: false,
    family_support: false,
    ideal_city: ''
  })

  const [currentStep, setCurrentStep] = useState(0)

  const grades = ['大一', '大二', '大三', '大四', '研一', '研二', '研三', '已毕业']
  const schoolLevels = ['985/211', '普通一本', '二本', '三本/民办', '专科']
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京', '其他']

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      router.push('/test')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return userInfo.grade && userInfo.major && userInfo.school_level
      case 1:
        return true
      case 2:
        return userInfo.ideal_city
      default:
        return false
    }
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {['基本信息', '个人情况', '意向城市'].map((step, index) => (
              <span
                key={index}
                className={`text-sm ${currentStep >= index ? 'text-purple-600 font-medium' : 'text-gray-400'}`}
              >
                {step}
              </span>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass rounded-2xl p-8"
        >
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold gradient-text mb-6">基本信息</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">年级</label>
                <div className="grid grid-cols-4 gap-2">
                  {grades.map(grade => (
                    <button
                      key={grade}
                      onClick={() => setUserInfo({ ...userInfo, grade })}
                      className={`py-2 px-3 rounded-lg text-sm transition-all ${
                        userInfo.grade === grade
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">专业</label>
                <input
                  type="text"
                  value={userInfo.major}
                  onChange={(e) => setUserInfo({ ...userInfo, major: e.target.value })}
                  placeholder="请输入你的专业"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">学校层次</label>
                <div className="grid grid-cols-3 gap-2">
                  {schoolLevels.map(level => (
                    <button
                      key={level}
                      onClick={() => setUserInfo({ ...userInfo, school_level: level })}
                      className={`py-2 px-3 rounded-lg text-sm transition-all ${
                        userInfo.school_level === level
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold gradient-text mb-6">个人情况</h2>
              
              <div className="space-y-4">
                <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={userInfo.preparing_postgrad}
                    onChange={(e) => setUserInfo({ ...userInfo, preparing_postgrad: e.target.checked })}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="ml-3 text-gray-700">正在准备考研</span>
                </label>

                <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={userInfo.preparing_civil}
                    onChange={(e) => setUserInfo({ ...userInfo, preparing_civil: e.target.checked })}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="ml-3 text-gray-700">正在准备考公</span>
                </label>

                <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={userInfo.family_support}
                    onChange={(e) => setUserInfo({ ...userInfo, family_support: e.target.checked })}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="ml-3 text-gray-700">家庭支持继续深造</span>
                </label>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold gradient-text mb-6">意向城市</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">你理想的工作城市</label>
                <div className="grid grid-cols-3 gap-2">
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => setUserInfo({ ...userInfo, ideal_city: city })}
                      className={`py-3 px-4 rounded-lg text-sm transition-all ${
                        userInfo.ideal_city === city
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            上一步
          </button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
              isStepValid()
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStep === 2 ? '开始测评' : '下一步'}
          </motion.button>
        </div>
      </div>
    </main>
  )
}
