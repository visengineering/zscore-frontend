import { Component, OnInit } from '@angular/core'
import { ZScoreRow } from 'src/app/models/ResultsData'
import { NavBarService } from 'src/app/services/nav-bar.service'
import { ZScoreService } from 'src/app/services/z-score.service'

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css'],
})
export class ResultsTableComponent implements OnInit {
  dataSource!: ZScoreRow[]
  targetGroup: string[]
  controlGroup: string[]
  variables: string[]
  noResult = false

  displayedColumns = [
    'variable',
    'answer',
    'count',
    'base',
    'count2',
    'base2',
    'zscore',
  ]

  constructor(
    private zScoreService: ZScoreService,
    private navBarService: NavBarService,
  ) {
    this.targetGroup = history.state.targetGroup
    this.controlGroup = history.state.controlGroup
    this.variables = history.state.variables
  }

  ngOnInit(): void {
    this.navBarService.disableNavigationBar()
    this.zScoreService
      .getZScore(this.targetGroup, this.controlGroup, this.variables)
      .subscribe(
        (result) => {
          const zScoreData =
            result.data?.map((element) => {
              return {
                ...element,
                base: element.base || '-',
                base2: element.base2 || '-',
                count: element.count || '-',
                count2: element.count2 || '-',
                zscore: element.zscore || '-',
              }
            }) || []

          this.dataSource = zScoreData
          if (!this.dataSource.length) {
            this.noResult = true
          }
        },
        (error) => {
          this.noResult = true
          this.dataSource = []
          console.log(`Error: while fetching results:: `, error)
        },
      )
  }
}
