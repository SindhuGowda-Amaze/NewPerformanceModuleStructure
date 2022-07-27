import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

 
  constructor(private PerformanceManagementService: PerformancemanagementService) { }
  StaffID: any;
  countList: any;
  EmployeeKradash: any;
  count: any;
  employeSubmissionDate: any;
  managerSubmittedCount: any;
  hrSubmittedCount: any;
  totalAppraisalCount: any;
  hrSubmittedlist:any;
  totalAppraisallist:any;
  dumpstafflist:any;
  employeCount:any;
  sbuSubmittedlist:any;
  sbuSubmittedCount:any;
  ngOnInit(): void {

    this.StaffID = sessionStorage.getItem('EmaployedID');

    this.GetAllCounts();
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.EmployeeKradash = data.filter(x=>x.approver1 == this.StaffID);
      this.count = this.EmployeeKradash.length;
      debugger
      var list = data.filter(x => x.employeeSubmittedDate != null && x.approver1 == this.StaffID)
      this.employeSubmissionDate = list.length;

      var list1 = data.filter(x => x.managerSubmittedDate != null && x.approver1 == this.StaffID);
      this.managerSubmittedCount = list1.length;

      this.sbuSubmittedlist = data.filter(x => x.sbuSubmittedDate != null && x.approver1 == this.StaffID);
      console.log("dsf",this.sbuSubmittedlist)
      this.sbuSubmittedCount = this.sbuSubmittedlist.length;

      this.hrSubmittedlist = data.filter(x => x.SubmittedDate != null && x.approver1 == this.StaffID);
      console.log("dsfh",this.hrSubmittedlist)
      this.hrSubmittedCount = this.hrSubmittedlist.length;

      
      debugger
     this.totalAppraisallist = data.filter(x => x.hrSubmittedDate != null  && x.managerSubmittedDate != null && x.employeeSubmittedDate != null && x.approver1 == this.StaffID)
      this.totalAppraisalCount = this.totalAppraisallist.length;
    });



    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
   
   
      var list4=data.filter((x: {department: any; supervisor:any})=>x.supervisor==this.StaffID);
      this.employeCount=list4.length
   
    });

  }



  public GetAllCounts() {
    debugger
    if (this.StaffID == undefined) {
      debugger
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
