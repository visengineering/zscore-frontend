export interface NavigationNode {
  childNavigation?: NavigationNode
  navigation_id?: string
  parent_navigation_id?: string | null
  label?: string
  question_id?: string
  answer_id?: string
  key?: string
  source?: string
  variable?: string
  children?: NavigationNode[]
}
