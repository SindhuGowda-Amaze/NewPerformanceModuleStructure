import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hr-dash',
  templateUrl: './hr-dash.component.html',
  styleUrls: ['./hr-dash.component.css']
})
export class HrDashComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService) { }

  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;
  departmentList: any;
  RoleTypeList: any;
  RoleType: any;
  Department: any;
  count: any;
  search: any;
  Apprisalcyclelist: any;
  AppraisalSubmitionDate: any;
  sDate: any;
  eDate: any;
  appraisalCycleName: any
  departmentid: any
  roleTypeid: any;
  roleTypeList: any;
  EmployeeKradash: any
  status:any;

  ngOnInit(): void {

    this.departmentid = 0;
    this.roleTypeid = "";
    this.status=0;
    this.appraisalCycleName = 0;
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data;
      this.stafflistCopy = this.stafflist

    });

    this.PerformanceManagementService.GetDepartmentMaster().subscribe(
      data => {
        this.departmentList = data;
        console.log("departmentName", this.departmentList);
        // this.roleTypeid = 0;
      }
    )

    this.PerformanceManagementService.GetRoleType().subscribe(
      data => {
        this.roleTypeList = data;
        console.log("type", this.roleTypeList);
        this.roleTypeid = 0;
      }
    )

    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.EmployeeKradash = data.filter(x => x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
        && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null);

      this.count = this.EmployeeKradash.length;

    });

    this.PerformanceManagementService.GetAppraisalCycle().subscribe(data => {
      debugger
      this.Apprisalcyclelist = data;
    });


  }

  getRoleID(even: any) {
    this.roleTypeid = even.target.value;
  }
  public GetFilteredRoleType() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.EmployeeKradash = data.filter(x => x.type == this.roleTypeid && x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
      && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null)
    })
  }

  getdepartmentID(even: any) {
    this.departmentid = even.target.value;
    this.GetFilteredDepartment();
  }

  public GetFilteredDepartment() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.EmployeeKradash = data.filter(x => x.department == this.departmentid && x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
      && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null)
    })
  }
  Staffkra: any;
  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe(data => {
      debugger
      this.Staffkra = data.filter(x => x.staffName == details.staffid);
    });

  }

  public GetApprisalcycle(event: any) {
    debugger
    this.PerformanceManagementService.GetAppraisalCycle().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.id == event.target.value);
      this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;
      this.appraisalCycleName = temp[0].appraisalCycleName
      this.sDate = temp[0].cycleStartDate;
      this.eDate = temp[0].cycleEndDate;

    });
  }


  public statuschange(event:any){
    if(event.target.value == 'Open'){
      debugger
      this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      
        this.EmployeeKradash = data.filter(x => x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
          && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null && x.hrSubmittedDate==null);
        this.count = this.EmployeeKradash.length;
  
      });
    }
    else {
      debugger
      this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      
        this.EmployeeKradash = data.filter(x => x.approver2 == sessionStorage.getItem('EmaployedID')  && x.selfScores != null
          && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null );
        this.count = this.EmployeeKradash.length;
  
      });
    }
 
    
  }

  public GetFilteredAppraisalCycle() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.EmployeeKradash = data.filter(x => x.appraisalCycleName == this.appraisalCycleName && x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
      && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null)
    })
  }
}
