import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-employeeto-pip',
  templateUrl: './add-employeeto-pip.component.html',
  styleUrls: ['./add-employeeto-pip.component.css']
})
export class AddEmployeetoPipComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService, private ActivatedRoute: ActivatedRoute) { }

  department: any;
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
  PIPAction: any;
  dropdownSettings1: any = {};
  exitcriteria: any;

  departmentName: any;
  dropdownSettings2: any = {};
  Apprisalcyclelist: any;
  Departmentid: any;
  kratypeid: any;
  kratypelist: any;
  Attachment: any;
  coursedetails: any;
  trainingID: any;

  Approver1: any;
  Approver2: any;
  AppraisalSubmitionDate: any;
  sDate: any;
  eDate: any;
  tablecount: any;
  Approver3: any;
  comments: any;
  lastdateofsubmission: any;
  kratype: any;
  staffid: any;

  ngOnInit(): void {
    this.RoleID = "";
    this.departmentName = "";
    this.Apprisalcycle = "";

    this.ActivatedRoute.params.subscribe(params => {
      this.staffid = params['staffid']
    })

    this.trainingID = "";



    this.PerformanceManagementService.GetCourse().subscribe(data => {
      debugger
      this.coursedetails = data;
    });

    this.PerformanceManagementService.GetAppraisalCycle().subscribe(data => {
      debugger
      this.Apprisalcyclelist = data.filter(x => x.appraisalClose == 0);
    });

    this.PerformanceManagementService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });

    this.PerformanceManagementService.GetConductappraisalStaffListforpip().subscribe(
      res => {
        debugger;
        let temp: any = res.filter(x => x.id != sessionStorage.getItem('EmaployedID'));
        this.dropdownList = temp
      });


    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      // this.dropdownList = data.filter(x => x.id != sessionStorage.getItem('EmaployedID'));
      let temp: any = data.filter(x => x.id == sessionStorage.getItem('EmaployedID'));
      this.Departmentid = temp[0].department;


      this.PerformanceManagementService.GetDepartmentMaster().subscribe(data => {
        debugger
        this.Departmentlist = data
      });
    });


    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,

    };
  }




  EmployeeId: any;
  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.EmployeeId = item.id;

    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      let temp: any = data
      this.Approver1 = temp[0].supervisor;
      this.Approver2 = 10422;
    });

  }

  onItemDeSelect1(item: any) {
    debugger;
    var index = this.selectedItems2.findIndex((x: { id: any; }) => x.id == item.id)
    this.selectedItems2.splice(index, 1);

  }
  Apprisalcycle: any;
  appraisalid: any;

  public GetApprisalcycle(event: any) {
    debugger
    this.PerformanceManagementService.GetAppraisalCycle().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.id == event.target.value);
      this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;
      this.sDate = temp[0].cycleStartDate;
      this.eDate = temp[0].cycleEndDate;
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
    location.href = "#/manager/Pip";
  }



  public keyresultArray: any = [];
  public SaveDetails() {
    debugger
    if (this.PIPAction == undefined) {
      Swal.fire("Please Enter Mandatory Fields")
    }
    else {
      this.tablecount = 1;
      var json = {
        "StaffID": this.staffid,
        "PIPActionItem": this.PIPAction,
        "Attachment": this.Attachment,
        "ExitCriteria": this.exitcriteria,
        'TrainingID': this.trainingID,
        'LastDateOfSubmission': this.lastdateofsubmission,
        // 'Status': 'PIP Assigned'
      };
      debugger
      this.keyresultArray.push(json)
      this.selectedItems.length = 0;
      this.PIPAction = null;
      this.Attachment = 0;
      this.exitcriteria = null;
      this.lastdateofsubmission = 0;
      this.trainingID = 0;


      this.selectedItems2 = [];

    }
  }


  public UpdatePipDetails() {
    debugger
    for (let i = 0; i < this.keyresultArray.length; i++) {
      if (this.keyresultArray.length == 0) {
        Swal.fire('Please Select Actions For Staff')
      }
      else {
        var Entity = {

          "StaffID": this.keyresultArray[i].StaffID,
          "PIPActionItem": this.keyresultArray[i].PIPActionItem,
          "Attachment": this.keyresultArray[i].Attachment,
          "ExitCriteria": this.keyresultArray[i].ExitCriteria,
          'TrainingID': this.keyresultArray[i].TrainingID,
          'LastDateOfSubmission': this.keyresultArray[i].LastDateOfSubmission,
          // 'Status': this.keyresultArray[i].Status,

        }

        this.PerformanceManagementService.InsertPiPActionItemsForStaff(Entity).subscribe(
          data => {

            if (data != undefined) {

            }

          }, error => {
          }
        )
      }
    }
    this.InsertNotification();
    Swal.fire('PIP Action Items Addedd Successfully!!');
    location.href = "#/manager/Pip";

  }


  public InsertNotification() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Apprisal Request',
      'FromUser': 'Admin',
      'ToUser': sessionStorage.getItem('EmaployedID'),
      'Message': 'You are Added to PIP List!!',
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







  files: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.uploadattachments();
    console.log("content", this.files);
  }


  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  public uploadattachments() {
    debugger
    this.PerformanceManagementService.ProjectAttachments(this.files).subscribe(res => {
      debugger
      this.Attachment = res;
      alert("ATTACHMENT UPLOADED");
    })
  }
}
