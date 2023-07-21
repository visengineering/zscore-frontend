import { NavigationNode } from 'src/app/models/NavigationNode'

export const transformChildren = (navNodes: NavigationNode[]) => {
  navNodes.forEach((element) => {
    if (element.children && element.children[0] == null) {
      delete element.children
    }
    if (element.children?.length) {
      for (let i = 0; i < element.children.length; i++) {
        if (element.children[i].childNavigation) {
          element.children[i] = {
            ...element.children[i].childNavigation,
          }
        }
      }
      transformChildren(element.children)
    }
  })
}

export const transformNewChildren = (navNodes: NavigationNode) => {
  if (navNodes.children?.length) {
    for (let i = 0; i < navNodes.children.length; i++) {
      if (navNodes.children[i].childNavigation) {
        navNodes.children[i] = {
          ...navNodes.children[i].childNavigation,
        }
      }
    }
    transformChildren(navNodes.children)
  }
}

export const appendChildren = (
  newNavNodes: NavigationNode,
  navNodes: NavigationNode[],
) => {
  const parentNode = newNavNodes.navigation_id
  let found = false
  navNodes.forEach((element) => {
    element.childNavigation ? (element = element.childNavigation) : null
    if (found) return
    if (
      !element.question_id && element.navigation_id
        ? element.navigation_id.toString() === parentNode
        : false
    ) {
      if (newNavNodes.children) {
        found = true
        transformNewChildren(newNavNodes)
        element.children = newNavNodes.children
      }
    }
    if (element.children && !found) {
      appendChildren(newNavNodes, element.children)
    }
  })
}
