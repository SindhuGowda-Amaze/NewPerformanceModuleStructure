import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-employee-kra-mapping',
  templateUrl: './employee-kra-mapping.component.html',
  styleUrls: ['./employee-kra-mapping.component.css']
})
export class EmployeeKraMappingComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService, private ActivatedRoute: ActivatedRoute) { }


  Departmentlist: any;
  RoleTypeList: any;
  RoleID: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  dropdownList1: any = [];
  selectedItems1: any = [];
  selectedItems2: any = [];
  selectedItems4: any = [];

  dropdownSettings1: any = {};

  dropdownList2: any = [];
  selectedItems3: any = [];
  departmentName: any;
  dropdownSettings2: any = {};
  Apprisalcyclelist: any;
  Departmentid: any;
  kratypeid: any;
  kratypelist: any;
  loginName: any;
  todaydate: any;
  staffName: any;
  ngOnInit(): void {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    var curr = new Date;
    this.todaydate = formatDate(myDate, format, locale);

    this.RoleID = "";
    this.departmentName = "";
    this.Apprisalcycle = "";
    this.kratypeid = "";
    this.selectedItems3.length = 0;

    this.loginName = sessionStorage.getItem('loginName');


    this.PerformanceManagementService.GetAppraisalCycle().subscribe(data => {
      debugger
      this.Apprisalcyclelist = data.filter(x => x.appraisalClose == 0);
      let temp: any = data.filter(x => x.appraisalClose == 0);
      this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;
      this.sDate = temp[0].cycleStartDate;
      this.eDate = temp[0].cycleEndDate;
      this.goalSettingDate = temp[0].goalSettingDate;

    });
    this.PerformanceManagementService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.dropdownList = data.filter(x => x.supervisor == sessionStorage.getItem('EmaployedID'));
      this.staffName == this.dropdownList[0].name;
      let temp: any = data.filter(x => x.id == sessionStorage.getItem('EmaployedID'));

      this.Departmentid = temp[0].department;
      this.PerformanceManagementService.GetDepartmentMaster().subscribe(data => {
        debugger
        this.Departmentlist = data.filter(x => x.id == this.Departmentid);
        // .filter(x => x.id == this.Departmentid);
      });
    });


    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'id',
      textField: 'kpiName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,

    };
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'id',
      textField: 'kraName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.GetEmployeeKraMap()
  }
  EmployeeId: any;
  selectedstaff: any = [];
  selectedstaffapprover1: any = [];
  onItemSelect(item: any) {
    debugger
    console.log(item);

    this.selectedstaff.push(item.id)
    //this.EmployeeId = item.id;





  }
  onItemSelect2(item1: any) {
    debugger
    this.selectedItems4.push(item1);
    console.log("selecteditems", this.selectedItems3)


  }
  onItemSelect1(item: any) {
    debugger;
    this.selectedItems2.push(item);
    this.PerformanceManagementService.GetKPI().subscribe(data => {
      debugger
      this.dropdownList2 = data.filter(x => x.kraID == item.id);


    });
  }
  onItemDeSelect1(item: any) {
    debugger;
    var index = this.selectedItems2.findIndex((x: { id: any; }) => x.id == item.id)
    this.selectedItems2.splice(index, 1);

  }
  Apprisalcycle: any;
  appraisalid: any;
  goalSettingDate: any;

  public GetApprisalcycle(event: any) {
    debugger
    this.PerformanceManagementService.GetAppraisalCycle().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.id == event.target.value);
      this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;
      this.sDate = temp[0].cycleStartDate;
      this.eDate = temp[0].cycleEndDate;
      this.goalSettingDate = temp[0].goalSettingDate;
      this.appraisalid = event.target.value;
    });
  }

  public GetRoleID() {
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.dropdownList = data.filter(x => x.type == this.RoleID && x.department == this.Departmentid && x.supervisor == sessionStorage.getItem('EmaployedID'));


    });
  }
  public Cancel() {
    debugger
    location.href = "#/manager/EmployeeKraMappingdashboard";
  }
  Approver1: any;
  Approver2: any;
  AppraisalSubmitionDate: any;
  sDate: any;
  eDate: any;
  tablecount: any;
  Approver3: any;

  public InsertDetails() {
    debugger
    // if( this.goalSettingDate< this.todaydate ){
    //   Swal.fire('Sorry, You cannot set the goal since last date is over')
    // }
    // else{

    for (let j = 0; j < this.selectedstaff.length; j++) {
      debugger
      for (let i = 0; i < this.keyresultArray.length; i++) {
        if (this.keyresultArray.length == 0) {
          Swal.fire('Please Select Goals For Staff')
        }
        else {
          var Entity = {
            'StaffTypeID': 1,
            'StaffName': this.selectedstaff[j],
            'Approver1': this.selectedstaffapprover1[j],
            'Approver2': this.Approver2,
            'Approver3': this.Approver3,
            'AppraisalSubmitionDate': this.AppraisalSubmitionDate,
            'CycleStartDate': this.sDate,
            'CycleEndDate': this.eDate,
            'KraID': this.keyresultArray[i].kraid,
            'kpiid': this.keyresultArray[i].kpiid,
            'AppraiselID': this.appraisalid
          }
          this.PerformanceManagementService.InsertEmployeeKraMap(Entity).subscribe(
            data => {

              if (data != undefined) {

              }

            }, error => {
            }
          )
        }
        // }
      }

      this.InsertNotification();
      Swal.fire('Goal Setting Done Successfully.');
      location.href = "#/manager/EmployeeKraMappingdashboard";
      this.ngOnInit();
    }



  }


  public InsertNotification() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Apprisal Request',
      'FromUser': 'Admin',
      'ToUser': sessionStorage.getItem('EmaployedID'),
      'Message': 'Dear,  Your Manager ' + this.loginName + ' has set your goal for Appraisal Cycle ',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': this.EmployeeId,
      'NotificationTypeID': 17,
      'VendorID': 0
    }
    this.PerformanceManagementService.InsertNotification(entity).subscribe(data => {
      if (data != 0) {
      }
    })
  }
  public keyresultArray: any = [];
  public SaveDetails() {
    debugger
    if (this.selectedstaff.length == 0 || this.selectedItems2.length == 0 || this.selectedItems4.length == 0) {
      Swal.fire("Please Enter Mandatory Fields")
    }
    else {
      this.tablecount = 1;
      for (let i = 0; i < this.selectedItems4.length; i++) {
        var json = {
          "kraid": this.selectedItems2[0].id,
          "kpiid": this.selectedItems4[i].id,
          "kraname": this.selectedItems2[0].kraName,
          "kpiname": this.selectedItems4[i].kpiName,
          'KraTypeID': this.kratypeid
        };
        debugger
        this.keyresultArray.push(json)
      }
      this.selectedItems1.length = 0;

      this.selectedItems2 = [];
      this.selectedItems3.length = 0;
    }
  }


  getkratypeid(event: any) {
    debugger
    this.kratypeid = event.target.value;
    for (let i = 0; i <= this.selectedstaff.length; i++) {
      this.PerformanceManagementService.GetMyDetails().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.id == this.selectedstaff[i]);
        this.selectedstaffapprover1.push(temp[0].supervisor);
        //this.Approver1 = temp[0].supervisor;

        this.Approver2 = 10422;
        this.Approver3 = 10477;


      });
    }

    this.PerformanceManagementService.GetKeyResultArea().subscribe(data => {
      debugger
      this.dropdownList1 = data.filter(x => x.kraTypeID == this.kratypeid);
    });
  }


  public GetEmployeeKraMap() {
    this.PerformanceManagementService.GetKraMaster().subscribe(
      data => {
        this.kratypelist = data;
      }
    )
  }
}
