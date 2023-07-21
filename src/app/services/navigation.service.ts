import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, throwError } from 'rxjs'
import { BASE_API_URL } from './index.service'
import { NavigationChild, NavigationTree } from '../models/NavigationTree'

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private http: HttpClient) {}

  private answersApiUrl = BASE_API_URL + '/navigation-tree'
  private questionsApiURL = this.answersApiUrl + '/questions'

  private handleError<T>() {
    return (error: string): Observable<T> => {
      return throwError(() => new Error(error))
    }
  }

  getAnswersNavigationNodes(): Observable<NavigationTree> {
    return this.http
      .get<NavigationTree>(this.answersApiUrl)
      .pipe(catchError(this.handleError<NavigationTree>()))
  }

  getAnswersChildNodes(navigation_id: string): Observable<NavigationChild> {
    const requestURL = this.answersApiUrl + `/${navigation_id}`
    return this.http
      .get<NavigationChild>(requestURL)
      .pipe(catchError(this.handleError<NavigationChild>()))
  }

  getQuestionsNavigationNodes(): Observable<NavigationTree> {
    return this.http
      .get<NavigationTree>(this.questionsApiURL)
      .pipe(catchError(this.handleError<NavigationTree>()))
  }

  getQuestionsChildNodes(navigation_id: string): Observable<NavigationChild> {
    return this.http
      .get<NavigationChild>(this.questionsApiURL + `/${navigation_id}`)
      .pipe(catchError(this.handleError<NavigationChild>()))
  }
}
