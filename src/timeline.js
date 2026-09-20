const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function label(value) {
  const [year, month] = value.split('-')
  return `${MONTHS[Number(month) - 1]} ${year}`
}

const entries = [
  {
    company: 'Stony Brook University',
    role: 'M.S., AI Engineering',
    start: '2026-08',
    end: '2027-12',
    logo: '/logos/sbu.png',
  },
  {
    company: 'Outlier AI',
    role: 'AI Coding Evaluator (RLHF)',
    start: '2023-09',
    end: '2025-01',
    logo: '/logos/outlier.svg',
    note: 'Scored and corrected model outputs against accuracy criteria, reducing error rates.',
    stack: ['RLHF', 'Model evaluation'],
  },
  {
    company: 'Alfa Insurance',
    role: 'Software Engineer',
    start: '2023-04',
    end: '2025-01',
    logo: '/logos/alfa.png',
    note: 'Replaced a legacy batch process with a real-time streaming pipeline.',
    stack: ['Kafka Streams', 'Microservices', 'CI/CD'],
  },
  {
    company: 'Microsoft TEALS',
    role: 'Volunteer Teacher',
    start: '2022-08',
    end: '2023-02',
    logo: '/logos/microsoft.png',
    note: 'Taught intro computer science to 70+ high school students through project-based learning.',
    stack: ['Python', 'Snap'],
  },
  {
    company: 'FIS Global',
    role: 'Software Engineer',
    start: '2021-09',
    end: '2022-12',
    logo: '/logos/fis.png',
    note: 'Built REST APIs serving over a million users on banking platforms.',
    stack: ['Java', 'Spring Boot', 'Angular', 'OAuth/SAML'],
  },
  {
    company: 'HCLTech',
    role: 'Software Engineer Intern',
    start: '2021-01',
    end: '2021-05',
    logo: '/logos/hcltech.jpg',
    note: 'Built an internal tool that automated IBM mainframe EBCDIC-to-ASCII file conversion.',
    stack: ['Spring Boot', 'Angular', 'REST APIs'],
  },
  {
    company: 'Alabama State University',
    role: 'Student Research Assistant',
    start: '2019-10',
    end: '2021-05',
    logo: '/logos/asu.png',
    note: 'Analyzed three decades of AQI data for trends, and presented the findings as a conference poster.',
    stack: ['Machine learning', 'Tableau', 'R'],
  },
  {
    company: 'Alabama State University',
    role: 'B.S., Computer Science',
    start: '2018-01',
    end: '2021-05',
    logo: '/logos/asu.png',
  },
]

export const timeline = entries
  .slice()
  .sort((a, b) => b.start.localeCompare(a.start) || b.end.localeCompare(a.end))
  .map((entry) => ({
    ...entry,
    startLabel: label(entry.start),
    endLabel: label(entry.end),
  }))
