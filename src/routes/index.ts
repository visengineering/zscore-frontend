import { Routes } from '@angular/router'
import { QueryDashboardComponent } from 'src/app/components/query-dashboard/query-dashboard.component'
import { ResultsTableComponent } from 'src/app/components/results-table/results-table.component'

export const routes: Routes = [
  { path: 'dashboard', component: QueryDashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'result', component: ResultsTableComponent },
]
