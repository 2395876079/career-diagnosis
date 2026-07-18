import { Question } from '../data/questions'
import { Personality, personalities } from '../data/personality'

export interface Scores {
  risk_preference: number
  learning_ability: number
  long_term_investment: number
  stability_need: number
  entrepreneurship: number
  social_preference: number
  city_preference: number
  competition: number
}

export interface PathScores {
  postgrad: number
  civil_service: number
  employment: number
  entrepreneurship: number
  phd: number
}

export interface TestResult {
  scores: Scores
  pathScores: PathScores
  personality: Personality
}

export function calculateScores(answers: { questionId: number; optionIndex: number }[], questions: Question[]): Scores {
  const totalScores: Scores = {
    risk_preference: 0,
    learning_ability: 0,
    long_term_investment: 0,
    stability_need: 0,
    entrepreneurship: 0,
    social_preference: 0,
    city_preference: 0,
    competition: 0
  }

  let validAnswers = 0

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (question && question.options[answer.optionIndex]) {
      const scores = question.options[answer.optionIndex].scores
      Object.keys(scores).forEach(key => {
        totalScores[key as keyof Scores] += scores[key as keyof Scores]
      })
      validAnswers++
    }
  })

  if (validAnswers > 0) {
    Object.keys(totalScores).forEach(key => {
      totalScores[key as keyof Scores] = Math.round((totalScores[key as keyof Scores] / validAnswers) * 20)
    })
  }

  return totalScores
}

export function calculatePathScores(scores: Scores, userInfo?: {
  preparing_postgrad?: boolean
  preparing_civil?: boolean
  family_support?: boolean
}): PathScores {
  const { risk_preference, learning_ability, long_term_investment, stability_need, entrepreneurship, social_preference, city_preference, competition } = scores

  let postgrad = Math.round(
    (learning_ability * 0.3 + long_term_investment * 0.3 + stability_need * 0.2 + (100 - risk_preference) * 0.2)
  )
  
  let civil_service = Math.round(
    (stability_need * 0.3 + (100 - risk_preference) * 0.25 + social_preference * 0.2 + (100 - competition) * 0.25)
  )
  
  let employment = Math.round(
    (competition * 0.25 + city_preference * 0.2 + learning_ability * 0.2 + social_preference * 0.15 + (100 - entrepreneurship) * 0.2)
  )
  
  let entrepreneurshipPath = Math.round(
    (risk_preference * 0.25 + entrepreneurship * 0.3 + competition * 0.15 + (100 - stability_need) * 0.2 + social_preference * 0.1)
  )
  
  let phd = Math.round(
    (learning_ability * 0.3 + long_term_investment * 0.35 + (100 - risk_preference) * 0.15 + stability_need * 0.2)
  )

  if (userInfo?.preparing_postgrad) {
    postgrad = Math.min(100, postgrad + 10)
  }
  if (userInfo?.preparing_civil) {
    civil_service = Math.min(100, civil_service + 10)
  }
  if (userInfo?.family_support) {
    postgrad = Math.min(100, postgrad + 5)
    phd = Math.min(100, phd + 5)
  }

  return {
    postgrad: Math.min(100, Math.max(0, postgrad)),
    civil_service: Math.min(100, Math.max(0, civil_service)),
    employment: Math.min(100, Math.max(0, employment)),
    entrepreneurship: Math.min(100, Math.max(0, entrepreneurshipPath)),
    phd: Math.min(100, Math.max(0, phd))
  }
}

export function determinePersonality(scores: Scores): Personality {
  const { risk_preference, learning_ability, long_term_investment, stability_need, entrepreneurship, social_preference, city_preference, competition } = scores

  const personalityScores = [
    {
      id: 'long-term',
      score: long_term_investment * 0.4 + learning_ability * 0.3 + (100 - risk_preference) * 0.3
    },
    {
      id: 'stable',
      score: stability_need * 0.4 + (100 - risk_preference) * 0.3 + long_term_investment * 0.3
    },
    {
      id: 'growth',
      score: competition * 0.3 + learning_ability * 0.3 + risk_preference * 0.2 + city_preference * 0.2
    },
    {
      id: 'business',
      score: entrepreneurship * 0.35 + risk_preference * 0.25 + competition * 0.2 + social_preference * 0.2
    },
    {
      id: 'free',
      score: (100 - stability_need) * 0.3 + entrepreneurship * 0.3 + (100 - social_preference) * 0.2 + risk_preference * 0.2
    },
    {
      id: 'global',
      score: city_preference * 0.3 + social_preference * 0.2 + (100 - stability_need) * 0.2 + risk_preference * 0.3
    },
    {
      id: 'tech',
      score: learning_ability * 0.4 + long_term_investment * 0.3 + (100 - social_preference) * 0.3
    }
  ]

  const maxPersonality = personalityScores.reduce((max, curr) => curr.score > max.score ? curr : max)
  
  return personalities.find(p => p.id === maxPersonality.id) || personalities[0]
}

export function getDevelopmentAdvice(pathScores: PathScores, personality: Personality): string[] {
  const advice: string[] = []
  
  const sortedPaths = Object.entries(pathScores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2)
  
  const pathNames: { [key: string]: string } = {
    postgrad: '考研',
    civil_service: '考公',
    employment: '就业',
    entrepreneurship: '创业',
    phd: '读博'
  }

  advice.push(`根据测评结果，你最适合的发展方向是：${pathNames[sortedPaths[0][0]]}（匹配度${sortedPaths[0][1]}%）`)
  advice.push(`第二推荐方向是：${pathNames[sortedPaths[1][0]]}（匹配度${sortedPaths[1][1]}%）`)
  advice.push(`你的核心特质是：${personality.traits.join('、')}`)
  
  if (sortedPaths[0][0] === 'postgrad') {
    advice.push('建议你尽早开始准备，制定系统的复习计划')
    advice.push('注重基础知识的积累，保持学习的连续性')
  } else if (sortedPaths[0][0] === 'civil_service') {
    advice.push('建议你了解公务员考试的题型和要求')
    advice.push('注重申论和行测的系统训练')
  } else if (sortedPaths[0][0] === 'employment') {
    advice.push('建议你多参加实习，积累工作经验')
    advice.push('注重专业技能的提升和软实力的培养')
  } else if (sortedPaths[0][0] === 'entrepreneurship') {
    advice.push('建议你先积累行业经验和人脉资源')
    advice.push('从小项目开始，逐步验证商业模式')
  } else if (sortedPaths[0][0] === 'phd') {
    advice.push('建议你尽早接触科研，了解学术圈')
    advice.push('注重论文发表和学术成果的积累')
  }

  return advice
}
