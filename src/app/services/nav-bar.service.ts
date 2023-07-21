import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  private disableNavBar = false
  private disableNavBarSubject = new Subject<[boolean, boolean]>()
  private showNavBar = true

  disableNavigationBar() {
    this.disableNavBar = true
    this.showNavBar = false
    this.disableNavBarSubject.next([this.disableNavBar, this.showNavBar])
  }

  onDisableNavigationBar() {
    return this.disableNavBarSubject.asObservable()
  }

  enableNavigationBar() {
    this.disableNavBar = false
    this.showNavBar = true
    this.disableNavBarSubject.next([this.disableNavBar, this.showNavBar])
  }
}
