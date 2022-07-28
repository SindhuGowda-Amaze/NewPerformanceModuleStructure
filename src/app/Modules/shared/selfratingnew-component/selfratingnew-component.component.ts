import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-selfratingnew-component',
  templateUrl: './selfratingnew-component.component.html',
  styleUrls: ['./selfratingnew-component.component.css']
})
export class SelfratingnewComponentComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService, private router: Router, private route: ActivatedRoute, private datepipe: DatePipe) { }

  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 25;
  stafflistCopy: any;
  Departmentlist: any;
  RoleTypeList: any;
  RoleType: any;
  Department: any;
  count: any;
  attachment: any;
  Attachmentlist: any;
  photoid: any;
  ParamID: any;
  EmployeeKradash: any
  StaffType: any;
  StaffTypeID: any;
  StaffID: any;
  ResultAreaList: any;
  PerformanceLists1: any;
  showbtn: any;
  score: any;
  empcomments: any;
  selfrating: any;
  selfComments: any;
  EmployeeSubmittedDate: any;
  EmployeeId: any;
  ManagerID: any;
  StaffName: any;
  loader: any;
  appraislid: any;
  ngOnInit(): void {
    this.Score = 0;
    this.showbtn = false;
    this.HighScore();
    this.route.params.subscribe(params => {
      debugger;
      this.ParamID = params['id'];
      if (params['id'] != undefined) {
        debugger
        this.appraislid = params['StaffID'];
        this.StaffID = params['id'];
        this.StaffTypeID = this.StaffType;

        this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe(data => {
          debugger
          this.ResultAreaList = data.filter((x: { appraiselID: any; }) => x.appraiselID == this.appraislid);
          this.EmployeeSubmittedDate = this.ResultAreaList[0].employeeSubmittedDate
          this.ManagerID = this.ResultAreaList[0].approver1
          this.StaffName = this.ResultAreaList[0].name

          console.log("result",this.ResultAreaList);


          this.ResultAreaList.forEach((element: { empupdate: any; }) => {
            if (element.empupdate != 1) {
              this.showbtn = false
            } else {
              this.showbtn = true
            }
          });

          console.log("Result area", this.ResultAreaList);

        })
        // this.GetStaffAppraisalByID(this.ParamID);

      }
    }
    );
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
    });

  }

  list: any;
  SelfComments: any;
  public HighScore() {
    debugger
    this.PerformanceManagementService.GetHighScores().subscribe(data => {
      debugger
      this.list = data;
    })
  }
  kpiid: any;
  Score: any;
  ResultAreaID: any;
  id: any;
  public GetKPIID(details: any) {
    this.id = details.id;
    this.kpiid = details.kpiid;
    this.ResultAreaID = details.resultAreaID;
    this.Score = 0;
    this.SelfComments = '';

  }

  public SaveDetails() {
    debugger
    var entity = {
      'SatffID': this.StaffID,
      'StaffType': this.StaffID,
      'Supervisor': this.id,
      'ResultAreaID': this.ResultAreaID,
      'PerformaceIndicatorID': this.kpiid,
      'SelfScores': this.Score,
      'SelfComments': this.SelfComments,
      'Attachment': this.attachmentNew,
       'ApprisalID': this.appraislid
    }
    this.PerformanceManagementService.InsertStaffScores(entity).subscribe(data => {
      debugger
      Swal.fire("Saved Successfully");
      this.Score = 0;
      this.SelfComments = '';
      this.files.length = 0;
      this.attachmentNew = '';
      const element1 = document.getElementById('close');

      if (element1 !== null) {

        element1.click();

      }
      this.ngOnInit();

    })
  }

  public GetKPIIDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.id == details.id)
      this.Score = temp[0].emprating;
      this.SelfComments = temp[0].empcomments;

    })

    this.attachment = details.photo;
    // this.attachmentNew=details.selfattachment;
    this.photoid = details.id;
    // this.attachmentsurl[0] = details.selfattachment;

  }

  files: File[] = [];
  attachmentsurl: any = []
  attachmentNew: any;

  onSelect(event: any) {
    console.log(event);
    debugger
    this.files.push(...event.addedFiles);
    // this.attachmentsurl.length = 0;
    this.PerformanceManagementService.ProjectAttachments(this.files).subscribe(res => {
      this.loader = true;
      debugger
      if (res != undefined) {
        // this.attachmentsurl.push(res);
        this.attachmentNew = res;
        this.loader = false;
        // alert('Attachment uploaded')
        //  this.files.length = 0;
        Swal.fire("Attachment uploaded Successfully");
      }
      debugger;
    })

  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  public SubmitEmployeeAppraisal() {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Submit it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        debugger
        var entity = {
          'StaffID': this.StaffID,
        }
        this.PerformanceManagementService.SubmitEmployeeAppraisal(entity).subscribe(data => {
          debugger
          this.InsertNotification();
          Swal.fire("Appraisal Submitted Successfully");
          this.ngOnInit();
        })
      }
    })
  }

  public InsertNotification() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Apprisal Request',
      'FromUser': 'Admin',
      'ToUser': sessionStorage.getItem('username'),
      'Message': this.StaffName + ' ' + 'Submitted the Appraisal',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': this.ManagerID,
      'NotificationTypeID': 17,
      'VendorID': 0


    }
    this.PerformanceManagementService.InsertNotification(entity).subscribe(data => {
      if (data != 0) {


      }

    })
  }

  // showAttachments(photo: any) {
  //   debugger
  //   this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe(data => {
  //     debugger
  //     this.Attachmentlist = photo;
  //   })
  // }



  update() {
    debugger
    var entity = {
      'ID': this.photoid,
      'Attachment': this.attachmentNew
    }
    this.PerformanceManagementService.UpdateStaffScores(entity).subscribe(data => {
      debugger
      Swal.fire("Updated Successfully");
      this.attachmentsurl = 0;
      this.files.length = 0;
      this.attachmentNew = '';
      this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe(data => {
        debugger
        this.ResultAreaList = data;

        console.log("Result area", this.ResultAreaList);

      })
      Swal.fire("Updated Successfully");
      this.attachmentsurl = 0;
      this.files.length = 0;
      this.attachmentNew = "";
      this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe(data => {
        debugger
        this.ResultAreaList = data;
        console.log("Result area", this.ResultAreaList);
      })
    })
  }

  UpdateMain() {
    debugger
    var entity = {
      "StaffID": this.photoid,
      "emprating": this.Score,
      "empcomments": this.SelfComments
    }
    this.PerformanceManagementService.UpdateEmployeeSelfRating(entity).subscribe(
      data => {

        Swal.fire("Updated Sucessfully");
        this.ngOnInit();
      }
    )
  }


  ondelete() {
    debugger
    this.PerformanceManagementService.DeleteStaffScores(this.photoid).subscribe(
      data => {
        Swal.fire("Deleted Sucussfully");
        this.ngOnInit();
      }
    )
  }



  cancel() {
    location.href = "/Selfratingnew";
  }
}


