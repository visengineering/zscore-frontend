import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, throwError } from 'rxjs'
import { ResultsData } from '../models/ResultsData'
import { BASE_API_URL } from './index.service'

@Injectable({
  providedIn: 'root',
})
export class ZScoreService {
  constructor(private http: HttpClient) {}

  private zScoreApiUrl = BASE_API_URL + '/z-score'

  private handleError<T>() {
    return (error: string): Observable<T> => {
      return throwError(() => new Error(error))
    }
  }

  getZScore(
    targetGroup: string[],
    controlGroup: string[],
    variables: string[],
  ): Observable<ResultsData> {
    const data = {
      controlGroup: controlGroup,
      targetGroup: targetGroup,
      variables: variables,
    }

    return this.http
      .post<ResultsData>(this.zScoreApiUrl, data)
      .pipe(catchError(this.handleError<ResultsData>()))
  }
}
