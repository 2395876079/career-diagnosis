export interface Question {
  id: number
  category: string
  question: string
  options: {
    text: string
    scores: {
      risk_preference: number
      learning_ability: number
      long_term_investment: number
      stability_need: number
      entrepreneurship: number
      social_preference: number
      city_preference: number
      competition: number
    }
  }[]
}

export const questions: Question[] = [
  {
    id: 1,
    category: '风险偏好',
    question: '面对一个有较高失败风险但回报潜力大的机会，你会？',
    options: [
      {
        text: '毫不犹豫地抓住，大不了重来',
        scores: { risk_preference: 5, learning_ability: 4, long_term_investment: 3, stability_need: 1, entrepreneurship: 5, social_preference: 3, city_preference: 4, competition: 4 }
      },
      {
        text: '仔细评估后，如果值得就尝试',
        scores: { risk_preference: 4, learning_ability: 4, long_term_investment: 4, stability_need: 2, entrepreneurship: 4, social_preference: 3, city_preference: 4, competition: 4 }
      },
      {
        text: '先观望一段时间再决定',
        scores: { risk_preference: 3, learning_ability: 3, long_term_investment: 3, stability_need: 3, entrepreneurship: 3, social_preference: 3, city_preference: 3, competition: 3 }
      },
      {
        text: '倾向于选择更稳妥的方案',
        scores: { risk_preference: 2, learning_ability: 3, long_term_investment: 4, stability_need: 4, entrepreneurship: 2, social_preference: 3, city_preference: 3, competition: 2 }
      },
      {
        text: '完全不会考虑，稳定最重要',
        scores: { risk_preference: 1, learning_ability: 2, long_term_investment: 5, stability_need: 5, entrepreneurship: 1, social_preference: 3, city_preference: 2, competition: 1 }
      }
    ]
  },
  {
    id: 2,
    category: '学习能力',
    question: '学习一个全新领域的知识时，你通常会？',
    options: [
      {
        text: '快速掌握核心概念，然后深入研究',
        scores: { risk_preference: 3, learning_ability: 5, long_term_investment: 4, stability_need: 2, entrepreneurship: 3, social_preference: 3, city_preference: 4, competition: 4 }
      },
      {
        text: '制定系统学习计划，循序渐进',
        scores: { risk_preference: 2, learning_ability: 5, long_term_investment: 5, stability_need: 3, entrepreneurship: 2, social_preference: 2, city_preference: 3, competition: 3 }
      },
      {
        text: '边实践边学习，遇到问题再查',
        scores: { risk_preference: 4, learning_ability: 4, long_term_investment: 3, stability_need: 2, entrepreneurship: 4, social_preference: 4, city_preference: 4, competition: 3 }
      },
      {
        text: '找有经验的人请教',
        scores: { risk_preference: 3, learning_ability: 4, long_term_investment: 3, stability_need: 3, entrepreneurship: 3, social_preference: 5, city_preference: 3, competition: 3 }
      },
      {
        text: '觉得太难就换一个方向',
        scores: { risk_preference: 3, learning_ability: 2, long_term_investment: 1, stability_need: 4, entrepreneurship: 2, social_preference: 3, city_preference: 3, competition: 2 }
      }
    ]
  },
  {
    id: 3,
    category: '长期投入能力',
    question: '如果一个目标需要3-5年才能看到成果，你会？',
    options: [
      {
        text: '完全愿意，知道这是必要的过程',
        scores: { risk_preference: 3, learning_ability: 4, long_term_investment: 5, stability_need: 4, entrepreneurship: 3, social_preference: 2, city_preference: 3, competition: 4 }
      },
      {
        text: '愿意，但需要定期看到阶段成果',
        scores: { risk_preference: 3, learning_ability: 4, long_term_investment: 4, stability_need: 3, entrepreneurship: 3, social_preference: 3, city_preference: 3, competition: 3 }
      },
      {
        text: '取决于回报是否足够大',
        scores: { risk_preference: 4, learning_ability: 3, long_term_investment: 3, stability_need: 2, entrepreneurship: 4, social_preference: 3, city_preference: 4, competition: 4 }
      },
      {
        text: '更倾向于能快速见效的事情',
        scores: { risk_preference: 4, learning_ability: 3, long_term_investment: 2, stability_need: 2, entrepreneurship: 4, social_preference: 4, city_preference: 4, competition: 3 }
      },
      {
        text: '不太能坚持这么久',
        scores: { risk_preference: 3, learning_ability: 2, long_term_investment: 1, stability_need: 3, entrepreneurship: 2, social_preference: 4, city_preference: 3, competition: 2 }
      }
    ]
  },
  {
    id: 4,
    category: '稳定需求',
    question: '你理想中的工作状态是？',
    options: [
      {
        text: '朝九晚五，双休，工作生活平衡',
        scores: { risk_preference: 1, learning_ability: 3, long_term_investment: 4, stability_need: 5, entrepreneurship: 1, social_preference: 3, city_preference: 3, competition: 2 }
      },
      {
        text: '稳定为主，偶尔加班可以接受',
        scores: { risk_preference: 2, learning_ability: 3, long_term_investment: 4, stability_need: 4, entrepreneurship: 2, social_preference: 3, city_preference: 3, competition: 3 }
      },
      {
        text: '愿意为了成长牺牲一些稳定性',
        scores: { risk_preference: 4, learning_ability: 4, long_term_investment: 3, stability_need: 2, entrepreneurship: 4, social_preference: 3, city_preference: 4, competition: 4 }
      },
      {
        text: '不在乎稳定性，更看重发展空间',
        scores: { risk_preference: 5, learning_ability: 4, long_term_investment: 3, stability_need: 1, entrepreneurship: 5, social_preference: 3, city_preference: 5, competition: 4 }
      },
      {
        text: '自由安排时间，不受约束',
        scores: { risk_preference: 4, learning_ability: 3, long_term_investment: 2, stability_need: 1, entrepreneurship: 5, social_preference: 2, city_preference: 4, competition: 3 }
      }
    ]
  },
  {
    id: 5,
    category: '创业倾向',
    question: '如果有机会创业，你最担心的是？',
    options: [
      {
        text: '资金问题和生存压力',
        scores: { risk_preference: 2, learning_ability: 3, long_term_investment: 4, stability_need: 4, entrepreneurship: 2, social_preference: 3, city_preference: 3, competition: 3 }
      },
      {
        text: '找不到合适的合伙人',
        scores: { risk_preference: 3, learning_ability: 3, long_term_investment: 3, stability_need: 3, entrepreneurship: 3, social_preference: 5, city_preference: 3, competition: 3 }
      },
      {
        text: '市场竞争太激烈',
        scores: { risk_preference: 2, learning_ability: 4, long_term_investment: 4, stability_need: 3, entrepreneurship: 2, social_preference: 3, city_preference: 4, competition: 4 }
      },
      {
        text: '失败后难以重新就业',
        scores: { risk_preference: 1, learning_ability: 3, long_term_investment: 4, stability_need: 5, entrepreneurship: 1, social_preference: 3, city_preference: 3, competition: 2 }
      },
      {
        text: '其实不太担心，有机会就尝试',
        scores: { risk_preference: 5, learning_ability: 4, long_term_investment: 2, stability_need: 1, entrepreneurship: 5, social_preference: 3, city_preference: 4, competition: 4 }
      }
    ]
  }
]
