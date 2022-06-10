import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';

@Component({
  selector: 'app-my-apprasail',
  templateUrl: './my-apprasail.component.html',
  styleUrls: ['./my-apprasail.component.css']
})
export class MyApprasailComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService) { }

  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;
  Departmentlist: any;
  RoleTypeList: any;
  RoleType: any;
  Department: any;
  count: any;
  search:any;
  EmployeeKradash: any
  roleid:any; 

  ngOnInit(): void {

    this.Department = "";
    this.RoleType = "";
    this.roleid = sessionStorage.getItem('roleid');
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data;
      this.stafflistCopy = this.stafflist
      this.count = this.stafflist.length;
    });

    this.PerformanceManagementService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.EmployeeKradash = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID'));
    });
  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.roleType == this.RoleType);
      this.count = this.stafflist.length;
    });

  }

  public filterByDepartment() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.department == this.Department);
      this.count = this.stafflist.length;
    });

  }
  Staffkra: any;
  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe(data => {
      debugger
      this.Staffkra = data.filter(x => x.staffName == details.staffid);
      this.count = this.Staffkra.length;
    });

  }


}


