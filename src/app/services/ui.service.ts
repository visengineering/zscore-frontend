import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { Answer } from '../models/Answer'
import { FlatTreeNode } from '../models/FlatTreeNode'
import { Question } from '../models/Question'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private tgAnswers: Answer[] = []
  private tgAnswersSubject = new Subject<Answer[]>()
  private cgAnswers: Answer[] = []
  private cgAnswersSubject = new Subject<Answer[]>()
  private questions: Question[] = []
  private questionsSubject = new Subject<Question[]>()

  constructor(private _snackBar: MatSnackBar) {}

  addTGAnswer(node: FlatTreeNode) {
    if (this.tgAnswers.length < 3) {
      const answer: Answer = {
        label: node.label,
        answerID: node.answerID || '',
        key: node.key || '',
        questionID: node.questionID || '',
        variable: node.variable || '',
      }
      if (
        this.tgAnswers.filter((element) => answer.answerID === element.answerID)
          .length > 0
      ) {
        this._snackBar.open(
          'This answer has already been added. Please choose different answer',
          'Dismiss',
          {
            duration: 2000,
          },
        )
      } else {
        this.tgAnswers.push(answer)
        this.tgAnswers.sort((a, b) => {
          return a.variable.localeCompare(b.variable)
        })
        this.tgAnswersSubject.next(this.tgAnswers)
      }
    } else {
      this._snackBar.open("You can't select more than 3 answers", 'Dismiss', {
        duration: 2000,
      })
    }
  }

  onAddTGAnswer(): Observable<Answer[]> {
    return this.tgAnswersSubject.asObservable()
  }

  removeTGAnswer(index: number) {
    this.tgAnswers.splice(index, 1)
    this.tgAnswersSubject.next(this.tgAnswers)
  }

  addCGAnswer(node: FlatTreeNode) {
    if (this.cgAnswers.length < 3) {
      const answer: Answer = {
        label: node.label,
        answerID: node.answerID || '',
        key: node.key || '',
        questionID: node.questionID || '',
        variable: node.variable || '',
      }
      if (
        this.cgAnswers.filter((element) => answer.answerID === element.answerID)
          .length
      ) {
        this._snackBar.open(
          'This answer has already been added. Please choose different answer',
          'Dismiss',
          {
            duration: 2000,
          },
        )
      } else {
        this.cgAnswers.push(answer)
        this.cgAnswers.sort((a, b) => {
          return a.variable.localeCompare(b.variable)
        })
        this.cgAnswersSubject.next(this.cgAnswers)
      }
    } else {
      this._snackBar.open("You can't select more than 3 answers", 'Dismiss', {
        duration: 2000,
      })
    }
  }

  onAddCGAnswer(): Observable<Answer[]> {
    return this.cgAnswersSubject.asObservable()
  }

  removeCGAnswer(index: number) {
    this.cgAnswers.splice(index, 1)
    this.cgAnswersSubject.next(this.cgAnswers)
  }

  addQuestion(node: FlatTreeNode) {
    if (this.questions.length < 10) {
      const question: Question = {
        label: node.label,
        key: node.key || '',
        navigationID: node.navigationID,
        questionID: node.questionID || '',
        source: node.source || '',
        variable: node.variable || '',
      }
      if (
        this.questions.filter(
          (element) => question.questionID === element.questionID,
        ).length > 0
      ) {
        this._snackBar.open(
          'This question has already been added. Please choose different question',
          'Dismiss',
        )
      } else {
        this.questions.push(question)
        this.questions.sort((a, b) => {
          return a.variable.localeCompare(b.variable)
        })
        this.questionsSubject.next(this.questions)
      }
    } else {
      this._snackBar.open(
        "You can't select more than 10 questions",
        'Dismiss',
        { duration: 2000 },
      )
    }
  }

  onAddQuestion(): Observable<Question[]> {
    return this.questionsSubject.asObservable()
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1)
    this.questionsSubject.next(this.questions)
  }

  clearSelections() {
    this.tgAnswers = []
    this.cgAnswers = []
    this.questions = []
    this.tgAnswersSubject.next(this.tgAnswers)
    this.cgAnswersSubject.next(this.cgAnswers)
    this.questionsSubject.next(this.questions)
  }
}
