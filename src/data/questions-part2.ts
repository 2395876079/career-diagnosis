import { Question } from './questions'

export const additionalQuestions: Question[] = [
  {
    id: 6,
    category: '社交偏好',
    question: '在团队合作中，你更喜欢？',
    options: [
      {
        text: '主导项目，带领团队',
        scores: { risk_preference: 4, learning_ability: 4, long_term_investment: 3, stability_need: 2, entrepreneurship: 5, social_preference: 4, city_preference: 4, competition: 5 }
      },
      {
        text: '深度参与核心工作',
        scores: { risk_preference: 3, learning_ability: 5, long_term_investment: 4, stability_need: 3, entrepreneurship: 3, social_preference: 3, city_preference: 3, competition: 4 }
      },
      {
        text: '独立完成分配的任务',
        scores: { risk_preference: 2, learning_ability: 4, long_term_investment: 4, stability_need: 4, entrepreneurship: 2, social_preference: 1, city_preference: 3, competition: 3 }
      },
      {
        text: '协调各方，促进合作',
        scores: { risk_preference: 3, learning_ability: 3, long_term_investment: 3, stability_need: 3, entrepreneurship: 3, social_preference: 5, city_preference: 3, competition: 3 }
      },
      {
        text: '提供创意和想法',
        scores: { risk_preference: 4, learning_ability: 4, long_term_investment: 2, stability_need: 2, entrepreneurship: 4, social_preference: 3, city_preference: 4, competition: 3 }
      }
    ]
  },
  {
    id: 7,
    category: '城市发展偏好',
    question: '你更倾向于在什么样的城市发展？',
    options: [
      {
        text: '北上广深，机会多',
        scores: { risk_preference: 4, learning_ability: 4, long_term_investment: 3, stability_need: 2, entrepreneurship: 4, social_preference: 3, city_preference: 5, competition: 5 }
      },
      {
        text: '新一线城市，性价比高',
        scores: { risk_preference: 3, learning_ability: 3, long_term_investment: 3, stability_need: 3, entrepreneurship: 3, social_preference: 3, city_preference: 4, competition: 3 }
      },
      {
        text: '省会城市，离家近',
        scores: { risk_preference: 2, learning_ability: 3, long_term_investment: 4, stability_need: 4, entrepreneurship: 2, social_preference: 4, city_preference: 3, competition: 2 }
      },
      {
        text: '二三线城市，生活舒适',
        scores: { risk_preference: 1, learning_ability: 3, long_term_investment: 4, stability_need: 5, entrepreneurship: 1, social_preference: 3, city_preference: 2, competition: 1 }
      },
      {
        text: '不限城市，哪里有机会去哪里',
        scores: { risk_preference: 5, learning_ability: 4, long_term_investment: 2, stability_need: 1, entrepreneurship: 5, social_preference: 3, city_preference: 4, competition: 4 }
      }
    ]
  },
  {
    id: 8,
    category: '竞争倾向',
    question: '面对激烈竞争时，你通常会？',
    options: [
      {
        text: '全力以赴，一定要赢',
        scores: { risk_preference: 4, learning_ability: 4, long_term_investment: 3, stability_need: 2, entrepreneurship: 4, social_preference: 3, city_preference: 4, competition: 5 }
      },
      {
        text: '尽力而为，接受任何结果',
        scores: { risk_preference: 3, learning_ability: 4, long_term_investment: 4, stability_need: 3, entrepreneurship: 3, social_preference: 3, city_preference: 3, competition: 4 }
      },
      {
        text: '寻找差异化竞争策略',
        scores: { risk_preference: 4, learning_ability: 5, long_term_investment: 3, stability_need: 2, entrepreneurship: 5, social_preference: 3, city_preference: 4, competition: 4 }
      },
      {
        text: '避开红海，寻找蓝海',
        scores: { risk_preference: 3, learning_ability: 4, long_term_investment: 3, stability_need: 3, entrepreneurship: 5, social_preference: 2, city_preference: 4, competition: 2 }
      },
      {
        text: '竞争压力太大，会考虑换个方向',
        scores: { risk_preference: 2, learning_ability: 3, long_term_investment: 3, stability_need: 4, entrepreneurship: 2, social_preference: 3, city_preference: 3, competition: 1 }
      }
    ]
  },
  {
    id: 9,
    category: '风险偏好',
    question: '你如何看待失败？',
    options: [
      {
        text: '失败是成功之母，越挫越勇',
        scores: { risk_preference: 5, learning_ability: 4, long_term_investment: 3, stability_need: 1, entrepreneurship: 5, social_preference: 3, city_preference: 4, competition: 4 }
      },
      {
        text: '失败可以接受，但要快速调整',
        scores: { risk_preference: 4, learning_ability: 4, long_term_investment: 3, stability_need: 2, entrepreneurship: 4, social_preference: 3, city_preference: 4, competition: 4 }
      },
      {
        text: '尽量避免失败，做好充分准备',
        scores: { risk_preference: 2, learning_ability: 5, long_term_investment: 4, stability_need: 4, entrepreneurship: 2, social_preference: 2, city_preference: 3, competition: 3 }
      },
      {
        text: '失败会让我很长时间无法释怀',
        scores: { risk_preference: 2, learning_ability: 3, long_term_investment: 4, stability_need: 4, entrepreneurship: 1, social_preference: 3, city_preference: 3, competition: 3 }
      },
      {
        text: '会提前做好Plan B',
        scores: { risk_preference: 3, learning_ability: 4, long_term_investment: 4, stability_need: 3, entrepreneurship: 3, social_preference: 3, city_preference: 3, competition: 3 }
      }
    ]
  },
  {
    id: 10,
    category: '学习能力',
    question: '你更喜欢哪种学习方式？',
    options: [
      {
        text: '系统阅读书籍和论文',
        scores: { risk_preference: 2, learning_ability: 5, long_term_investment: 5, stability_need: 4, entrepreneurship: 2, social_preference: 2, city_preference: 3, competition: 3 }
      },
      {
        text: '通过实际项目学习',
        scores: { risk_preference: 4, learning_ability: 4, long_term_investment: 3, stability_need: 2, entrepreneurship: 4, social_preference: 4, city_preference: 4, competition: 3 }
      },
      {
        text: '参加培训和课程',
        scores: { risk_preference: 2, learning_ability: 4, long_term_investment: 4, stability_need: 3, entrepreneurship: 2, social_preference: 4, city_preference: 3, competition: 3 }
      },
      {
        text: '和高手交流切磋',
        scores: { risk_preference: 3, learning_ability: 4, long_term_investment: 3, stability_need: 2, entrepreneurship: 3, social_preference: 5, city_preference: 4, competition: 4 }
      },
      {
        text: '自学，按自己的节奏来',
        scores: { risk_preference: 3, learning_ability: 4, long_term_investment: 4, stability_need: 3, entrepreneurship: 3, social_preference: 1, city_preference: 3, competition: 3 }
      }
    ]
  }
]
