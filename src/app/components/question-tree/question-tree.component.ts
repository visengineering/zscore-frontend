import { Component, Input, OnInit } from '@angular/core'
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree'
import { FlatTreeControl } from '@angular/cdk/tree'
import { UiService } from 'src/app/services/ui.service'
import { NavigationNode } from 'src/app/models/NavigationNode'
import { NavigationTree } from 'src/app/models/NavigationTree'
import { NavigationService } from 'src/app/services/navigation.service'
import { FlatTreeNode } from 'src/app/models/FlatTreeNode'
import { appendChildren } from 'src/helpers/utils'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-question-tree',
  templateUrl: './question-tree.component.html',
  styleUrls: ['./question-tree.component.css'],
})
export class QuestionTreeComponent implements OnInit {
  treeControl: FlatTreeControl<FlatTreeNode>
  treeFlattener: MatTreeFlattener<NavigationNode, FlatTreeNode>
  dataSource: MatTreeFlatDataSource<NavigationNode, FlatTreeNode>
  @Input() navigationTree: NavigationTree | undefined
  expandedNodes: FlatTreeNode[] = []
  @Input() showError: boolean | undefined

  constructor(
    private navigationService: NavigationService,
    private uiService: UiService,
    private _snackBar: MatSnackBar,
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    )

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable)
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener,
    )
  }

  ngOnInit() {
    if (this.navigationTree) {
      this.dataSource.data = this.navigationTree.tree
    }
  }

  transformer(node: NavigationNode, level: number): FlatTreeNode {
    const flatNode: FlatTreeNode = {
      label: node.label || '',
      navigationID: node.navigation_id || '',
      level,
      parentNavigationID: node.parent_navigation_id || '',
      expandable: !node.question_id,
      children: !!node.children,
      hasChild: level > 0,
      isLoading: false,
    }
    if (node.question_id) {
      flatNode.questionID = node.question_id
      flatNode.key = node.key
      flatNode.source = node.source
      flatNode.variable = node.variable
    }

    return flatNode
  }

  getLevel(node: FlatTreeNode): number {
    return node.level
  }

  isExpandable(node: FlatTreeNode): boolean {
    return node.expandable
  }

  hasChild(index: number, node: FlatTreeNode): boolean {
    return node.expandable
  }

  getChildren(node: NavigationNode): NavigationNode[] | null | undefined {
    return node.children
  }

  addQuestion(node: FlatTreeNode) {
    this.uiService.addQuestion(node)
  }

  getChildNodes(node: FlatTreeNode) {
    if (
      node.hasChild &&
      !node.questionID &&
      this.treeControl.isExpanded(node)
    ) {
      node.isLoading = true
      this.navigationService.getAnswersChildNodes(node.navigationID).subscribe(
        (newNodes) => {
          appendChildren(newNodes.tree, this.dataSource.data)
          node.hasChild = false
          this.saveExpandedNodes()
          const data = this.dataSource.data
          this.dataSource.data = []
          this.dataSource.data = data
          node.isLoading = false
          this.restoreExpandedNodes()
        },
        (error) => {
          console.log(`Error: while fetching results:: `, error);
          node.isLoading = false
        },
      )
    }
  }

  saveExpandedNodes() {
    this.expandedNodes = new Array<FlatTreeNode>()
    this.treeControl.dataNodes.forEach((node) => {
      if (node.expandable && this.treeControl.isExpanded(node)) {
        this.expandedNodes.push(node)
      }
    })
  }

  restoreExpandedNodes() {
    this.expandedNodes.forEach((node) => {
      const expandNode = this.treeControl.dataNodes.find(
        (n) => n.navigationID === node.navigationID,
      )
      if (expandNode) this.treeControl.expand(expandNode)
    })
  }
}
