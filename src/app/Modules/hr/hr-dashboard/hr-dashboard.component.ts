import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css']
})
export class HrDashboardComponent implements OnInit {
  constructor(private PerformanceManagementService: PerformancemanagementService) { }

  countList: any;
  StaffID: any;
  EmployeeKradash: any;
  count: any;
  employeSubmissionDate: any;
  managerSubmittedCount: any;
  sbuSubmittedCount: any;
  hrSubmittedCount: any;
  totalAppraisalCount: any;
  hrSubmittedlist: any;
  totalAppraisalList: any;
  employeCount:any;
  managagerScore:any;
  ngOnInit(): void {

    this.GetAllCounts();
    this.StaffID = sessionStorage.getItem('EmaployedID');


    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.EmployeeKradash = data;
      this.count = this.EmployeeKradash.length;
      debugger
      var list = data.filter(x => x.employeeSubmittedDate != null && x.selfScores != null && 
       x.cycleStartDate !=null && x.cycleEndDate != null && x.appraisalSubmitionDate != null  && x.employeeSubmittedDate !=null )
      this.employeSubmissionDate = list.length;

      var list1 = data.filter(x => x.managerSubmittedDate != null );
      this.managerSubmittedCount = list1.length;

      var sbuSubmittedlist = data.filter(x => x.sbuSubmittedDate != null  && x.employeeSubmittedDate !=null  && x.managerSubmittedDate !=null );
      this.sbuSubmittedCount = sbuSubmittedlist.length;

      this.hrSubmittedlist = data.filter(x => x.hrSubmittedDate == null &&  x.cycleStartDate !=null && x.cycleEndDate != null && x.appraisalSubmitionDate != null  && x.employeeSubmittedDate !=null && x.managerSubmittedDate!= null );
      console.log("data",data)
      console.log("hr", this.hrSubmittedlist)
      this.hrSubmittedCount = this.hrSubmittedlist.length;
    });

    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(
      res => {
        debugger;
        let temp: any = res
        this.totalAppraisalList = res.filter((x: { cioScores: any;managerSubmittedDate:any;employeeSubmittedDate:any }) => x.cioScores != null && x.managerSubmittedDate!=null &&  x.employeeSubmittedDate != null)
        this.totalAppraisalCount = this.totalAppraisalList.length;
        // this.managerList = this.dumpmanagerList.filter((x: { manager: any; })=>x.manager==this.manager);
      }
    )

    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
   
   
      var list4=data;
      this.employeCount=list4.length
   
    });




  }

  public GetAllCounts() {
    debugger
    if (this.StaffID == undefined) {
      this.PerformanceManagementService.GetAllCounts(1, 1).subscribe(
        data => {
          this.countList = data[0];
        }
      )
    }
    else {
      this.PerformanceManagementService.GetAllCounts(2, this.StaffID).subscribe(
        data => {
          this.countList = data[0];
        }
      )
    }
  }

}
