import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module'
import { ReportPathComponent } from './report-path.component';
import { RouterModule, Routes } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
  { path: "", component: ReportPathComponent }
]

@NgModule({
  declarations: [
    ReportPathComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ReportPathComponent
  ]
})
export class ReportPathModule { }
