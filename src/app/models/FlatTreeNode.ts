export interface FlatTreeNode {
  label: string
  key?: string
  variable?: string
  source?: string
  navigationID: string
  parentNavigationID: string | null
  questionID?: string
  answerID?: string
  level: number
  expandable: boolean
  children: boolean
  hasChild: boolean
  isLoading: boolean
}
