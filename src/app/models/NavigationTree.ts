import { NavigationNode } from './NavigationNode'

export interface NavigationTree {
  tree: NavigationNode[]
}

export interface NavigationChild {
  tree: NavigationNode
}
