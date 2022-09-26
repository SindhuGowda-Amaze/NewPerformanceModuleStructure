import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-succession-planning-report',
  templateUrl: './succession-planning-report.component.html',
  styleUrls: ['./succession-planning-report.component.css']
})
export class SuccessionPlanningReportComponent implements OnInit {

  EmployeeKradash: any;
  currentUrl:any;
  roleid: any;
  count: any;
  count1: any = 10;
  p: any = 1;
  search:any;

  constructor(private PerformanceManagementService: PerformancemanagementService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.GetConductappraisalStaffList();

  }

  public GetConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: (data) => {
        debugger;
        if (this.roleid == 4) {

          this.EmployeeKradash = data.filter(
            (x) =>
              x.approver1 == sessionStorage.getItem('EmaployedID') &&
              x.selfScores != null &&
              x.employeeSubmittedDate != null&&x.sbuSubmittedDate!=null
          );
          this.count = this.EmployeeKradash.length;
        } else if (this.roleid == 5) {
          this.EmployeeKradash = data.filter(
            (x) =>
              x.approver3 == sessionStorage.getItem('EmaployedID') &&
              x.selfScores != null &&
              x.employeeSubmittedDate != null&&x.managerSubmittedDate!=null
          );
          this.count = this.EmployeeKradash.length;
        }
        else{
          this.EmployeeKradash = data;
        }
      },
      error: (err) => {
        Swal.fire('Issue in Getting ConductappraisalStaffList');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

}
