import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Answer } from 'src/app/models/Answer'
import { Question } from 'src/app/models/Question'
import { UiService } from 'src/app/services/ui.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-query-dashboard',
  templateUrl: './query-dashboard.component.html',
  styleUrls: ['./query-dashboard.component.css'],
})
export class QueryDashboardComponent implements OnDestroy {
  tgAnswers: Answer[] = []
  tgAnswerSubscription: Subscription
  cgAnswers: Answer[] = []
  cgAnswerSubscription: Subscription
  questions: Question[] = []
  questionsSubscription: Subscription
  targetGroup: string[] = []
  controlGroup: string[] = []
  variables: string[] = []
  constructor(
    private uiService: UiService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.tgAnswerSubscription = this.uiService
      .onAddTGAnswer()
      .subscribe((result) => (this.tgAnswers = result))

    this.cgAnswerSubscription = this.uiService
      .onAddCGAnswer()
      .subscribe((result) => (this.cgAnswers = result))

    this.questionsSubscription = this.uiService
      .onAddQuestion()
      .subscribe((result) => (this.questions = result))
  }

  removeTGAnswer(index: number) {
    this.uiService.removeTGAnswer(index)
  }

  removeCGAnswer(index: number) {
    this.uiService.removeCGAnswer(index)
  }

  removeQuestion(index: number) {
    this.uiService.removeQuestion(index)
  }

  routeToResults() {
    this.getIDs()
    if (this.validateSelections()) {
      this.uiService.clearSelections()
      this.router.navigateByUrl('/result', {
        state: {
          targetGroup: this.targetGroup,
          controlGroup: this.controlGroup,
          variables: this.variables,
        },
      })
    } else {
      this._snackBar.open(
        'Selection at least one Target Group, Control Group and Variable',
        'Dismiss',
        {
          duration: 2000,
        },
      )
      this.resetIDs()
    }
  }

  getIDs() {
    this.tgAnswers.forEach((element) => {
      this.targetGroup.push(element.answerID)
    })
    this.cgAnswers.forEach((element) => {
      this.controlGroup.push(element.answerID)
    })
    this.questions.forEach((element) => {
      this.variables.push(element.questionID)
    })
  }

  resetIDs() {
    this.targetGroup = []
    this.controlGroup = []
    this.variables = []
  }

  validateSelections() {
    if (
      this.targetGroup.length &&
      this.controlGroup.length &&
      this.variables.length
    ) {
      return true
    }
    return false
  }

  ngOnDestroy() {
    this.tgAnswerSubscription.unsubscribe()
    this.cgAnswerSubscription.unsubscribe()
    this.questionsSubscription.unsubscribe()
  }
}
