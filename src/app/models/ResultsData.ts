export interface ResultsData {
  data: ZScoreRow[]
}

export interface ZScoreRow {
  variable: string
  answer: string
  count: string
  base: string
  count2: string
  base2: string
  zscore: string
}
