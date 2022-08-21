import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ILocation } from 'src/app/models/ILocation.model';
import { CoronaAppService } from '../corona-app.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { IUser } from 'src/app/models/IUser.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-report-path',
  templateUrl: './report-path.component.html',
  styleUrls: ['./report-path.component.css']
})
export class ReportPathComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns: string[] = ['startDate', 'endDate', 'city', 'address', 'delete'];
  dataSource: MatTableDataSource<ILocation>;

  locations: ILocation[] = [];

  NewReportForm!: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  user: IUser;
  constructor(private _coronaAppService: CoronaAppService, private _formBuilder: FormBuilder, public dialog: MatDialog) { }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  async ngOnInit() {
    const stringUser = sessionStorage.getItem('user')
    if (stringUser == null) {
      this.openDialog();
      return;
    }

    this.user = JSON.parse(stringUser ? stringUser : "{'name':'','password':''}")
    this.NewReportForm = new FormGroup({
      "startDate": new FormControl(Validators.required),
      "endDate": new FormControl([Validators.required]),
      "city": new FormControl("", [Validators.required]),
      "address": new FormControl("", [Validators.required]),
      "patientId": new FormControl("", [Validators.required])
    });
  }
  openDialog(): void {

    this.dialog.open(DialogAnimationsDialog)
  }
  ngAfterViewInit() {
    this.buildForm();
  }
  buildForm() {
    this._coronaAppService.getAllLocations(this.user.token).subscribe(data => {
      this.locations = data
      this.dataSource = new MatTableDataSource(this.locations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = function (record, filter) {
        return record.patientId.startsWith(filter);
      }
      var filteredValue = (<HTMLInputElement>document.getElementById("patientIdFilterInput"))?.value;
      if (filteredValue)
        this.filtering(filteredValue);
      this.table.renderRows();
    })

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtering(filterValue);
  }
  filtering(patientId: string) {
    this.dataSource.filter = patientId.trim().toLowerCase();
  }
  addReport() {
    const newReport = {
      "startDate": this.NewReportForm?.value.startDate, "endDate": this.NewReportForm?.value.endDate,
      "city": this.NewReportForm?.value.city, "address": this.NewReportForm?.value.address, "patientId": this.NewReportForm?.value.patientId
    }
    this._coronaAppService.addReport(newReport, this.user.token, this.user.id).subscribe(
      () => this.buildForm()
    );
  }
  deleteReport(reportId: number) {
    this._coronaAppService.removeReport(reportId, this.user.id, this.user.token).subscribe(
      () => {
        this.buildForm()
      }
    );
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogAnimationsDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsDialog>, private _router: Router) { }
  navigateToLogin() {
    this._router.navigate(['login'])
  }
}
