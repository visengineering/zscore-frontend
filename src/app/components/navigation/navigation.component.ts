import { Component, OnInit } from '@angular/core'
import { NavigationService } from 'src/app/services/navigation.service'
import { Subscription } from 'rxjs'
import { NavBarService } from 'src/app/services/nav-bar.service'
import { Router } from '@angular/router'
import { NavigationTree } from 'src/app/models/NavigationTree'
import { transformChildren } from 'src/helpers/utils'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  answersNavigationTree: NavigationTree | undefined
  questionsNavigationTree: NavigationTree | undefined
  showTGNav = false
  showCGNav = false
  showQuestionNav = false
  disabled = false
  opened = true
  diasbledSubscription: Subscription
  answerLoading = true
  questionLoading = true
  showError = false

  constructor(
    private navigationService: NavigationService,
    private navBarService: NavBarService,
    private router: Router,
  ) {
    this.diasbledSubscription = this.navBarService
      .onDisableNavigationBar()
      .subscribe((result) => {
        this.disabled = result[0]
        this.opened = result[1]
      })
  }

  ngOnInit(): void {
    this.navigationService.getAnswersNavigationNodes().subscribe(
      (navigationTree) => {
        this.answersNavigationTree = navigationTree
        transformChildren(navigationTree.tree)
        this.answerLoading = false
      },
      (error) => {
        this.showError = true
        this.answerLoading = false
        console.log(`Error: while fetching results:: `, error);
      },
    )
    this.navigationService.getQuestionsNavigationNodes().subscribe(
      (navigationTree) => {
        this.questionsNavigationTree = navigationTree
        transformChildren(navigationTree.tree)
        this.questionLoading = false
      },
      (error) => {
        this.questionLoading = false
        this.showError = true
        console.log(`Error: while fetching results:: `, error);
      },
    )
  }

  navigateToDashboard() {
    this.navBarService.enableNavigationBar()
    this.router.navigateByUrl('')
  }
}
