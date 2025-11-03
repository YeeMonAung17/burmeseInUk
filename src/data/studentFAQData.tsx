export type StudentFAQItem = {
  id: string
  question: string
  answer: string
}

export const studentFAQData: StudentFAQItem[] = [
  {
    id: '1',
    question: 'How do I apply for a student visa in the UK?',
    answer:
      'You need to apply online, provide proof of acceptance from a UK university, financial evidence, and valid passport. Processing usually takes 3 weeks.',
  },
  {
    id: '2',
    question: 'What student discounts are available in the UK?',
    answer:
      'Students get discounts on transport (16-25 railcard), Amazon Prime, Apple Music, restaurants, and many retail stores with a valid student ID or NUS card.',
  },
  {
    id: '3',
    question: 'Can I work while studying in the UK?',
    answer:
      'Yes! Student visa holders can work up to 20 hours per week during term time and full-time during holidays.',
  },
  {
    id: '4',
    question: 'How much money do I need as a student in the UK?',
    answer:
      'Budget around £12,000-15,000 per year for living costs outside London, or £15,000-18,000 in London, plus tuition fees.',
  },
  {
    id: '5',
    question: 'What happens after I graduate?',
    answer:
      'You can apply for a Graduate visa (2 years for undergraduate/masters, 3 years for PhD) to work or look for work in the UK.',
  },
  {
    id: '6',
    question: 'How do I open a student bank account?',
    answer:
      'Bring your university confirmation letter, passport, proof of address, and visa to banks like Barclays, HSBC, or Lloyds. Most offer student accounts with overdrafts.',
  },
  {
    id: '7',
    question: 'Where can I find affordable student accommodation?',
    answer:
      'Check university halls, SpareRoom, Student.com, or Facebook groups. University accommodation is usually cheapest in first year.',
  },
  {
    id: '8',
    question: 'Do I need health insurance as an international student?',
    answer:
      'You pay the Immigration Health Surcharge (IHS) with your visa application, which gives you access to NHS healthcare.',
  },
]
