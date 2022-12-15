//  Product :Digi PerformanceManagement System 1.0 
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Code to get staff, Conducted Appraisal and counts
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Sindhu, Madhav
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hrratingnew',
  templateUrl: './hrratingnew.component.html',
  styleUrls: ['./hrratingnew.component.css']
})
export class HrratingnewComponent implements OnInit {
  ManagerAttachmentType: any;
  hrAttachmentType: any;
  SbuAttachmentType: any;
  SelfAttachmentType: any;


  constructor(private PerformanceManagementService: PerformancemanagementService, private router: Router, private route: ActivatedRoute, private datepipe: DatePipe) { }
  //Variable Declerations//
  stafflist: any;
  empcommnts: any;
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
  description: any;
  Staffkra: any;
  ParamID: any;
  EmployeeKradash: any
  StaffType: any;
  StaffTypeID: any;
  StaffID: any;
  ResultAreaList: any;
  PerformanceLists1: any;
  showbtn: any;
  Name: any;
  role: any;
  departmentName: any;
  HrSubmittedDate: any;
  hrattachment: any;
  appraislid: any;
  list: any;
  SelfComments: any;
  kpiid: any;
  Score: any;
  ResultAreaID: any;
  id: any;
  managerattachment: any;
  sbuattachment: any;
  files: File[] = [];
  attachmentsurl: any = []
  managercomments: any;
  sbucomments: any;
  photoid: any;
  show: any;
  selfattachment: any;
  sbuAttachment: any;
  StaffAppraisalList: any;
  currentUrl: any;
  AvgSelfScore: any;
  AvgGroupHeadScores: any;
  AvgDivisionScores: any;
  hrupdate: any;
  managerupdate: any;
  hrattachment1: any;
  hrcomments: any;
  hrrrating: any;
  hrresultAreaID: any;

  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//

    this.currentUrl = window.location.href
    this.Score = 0;
    this.showbtn = false;
    this.HighScore();
    this.GetConductAppraisal();

    this.route.params.subscribe(params => {
      debugger;
      this.ParamID = params['id'];
      if (params['id'] != undefined) {
        // this.StaffType = params['StaffID'];
        this.appraislid = params['appraiselID'];
        this.StaffID = params['id'];
        this.StaffTypeID = this.StaffType;

        this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe(data => {
          debugger
          this.ResultAreaList = data.filter((x: { managerSubmittedDate: any; employeeSubmittedDate: any; appraiselID: any; }) => x.managerSubmittedDate != null && x.employeeSubmittedDate != null && x.appraiselID == this.appraislid);

          this.Name = this.ResultAreaList[0].name
          this.role = this.ResultAreaList[0].role
          this.departmentName = this.ResultAreaList[0].departmentName
          this.HrSubmittedDate = this.ResultAreaList[0].hrSubmittedDate
          this.managerattachment = this.ResultAreaList[0].mPhoto
          this.sbuAttachment = this.ResultAreaList[0].sbuPhoto
          this.hrupdate = this.ResultAreaList[0].hrupdate
          this.managerupdate = this.ResultAreaList[0].managerupdate
          this.hrattachment1 = this.ResultAreaList[0].hrattachment
          // this.hrcomments = this.ResultAreaList[0].hrcomments
          // this.hrrrating = this.ResultAreaList[0].hrrrating
          this.hrresultAreaID = this.ResultAreaList[0].resultAreaID
          this.Score = this.ResultAreaList[0].hrrrating
          this.SelfComments = this.ResultAreaList[0].hrcomments


          console.log("resultarea", this.ResultAreaList)

          this.ResultAreaList.forEach((element: { hrupdate: any; }) => {
            if (element.hrupdate != 1) {
              this.showbtn = false
            } else {
              this.showbtn = true
            }
          });
        })
        // this.GetStaffAppraisalByID(this.ParamID);

      }
    }
    );
  }


  public GetConductAppraisal() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        // this.FilteredStaffAppraisalList = data.filter(x => x.appraisalCycleName == this.appraisalCycleName && x.finalize == 1)
        this.StaffAppraisalList = data.filter(x => x.appraiselID == this.appraislid && x.staffid == this.StaffID)

        this.AvgSelfScore = this.StaffAppraisalList[0].avgSelfScore
        this.AvgGroupHeadScores = this.StaffAppraisalList[0].avgGroupHeadScores
        this.AvgDivisionScores = this.StaffAppraisalList[0].avgDivisionScores



      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting ConductappraisalStaffList');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }


  //Method to get Role//
  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  //Method to filter by role//
  public FilterRoleType() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.roleType == this.RoleType);
      this.count = this.stafflist.length;
    });
  }


  //Method to filter by Department//
  public filterByDepartment() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.department == this.Department);
      this.count = this.stafflist.length;
    });
  }



  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe(data => {
      debugger
      this.Staffkra = data.filter(x => x.staffName == details.staffid);
    });
  }


  public HighScore() {
    debugger
    this.PerformanceManagementService.GetHighScores().subscribe(data => {
      debugger
      this.list = data;
    })
  }


  public GetKPIID(details: any) {
    debugger
    this.id = details.id;
    this.kpiid = details.kpiid;
    this.ResultAreaID = details.resultAreaID;
    this.Score = 0;
    this.SelfComments = '';
  }

  //Method to Save HR Rating//
  public SaveDetails() {
    if (this.Score == undefined || this.SelfComments == undefined || this.Score == 0 || this.SelfComments == null) {
      Swal.fire("Please Enter the Mandatory Fields");
    }
    else {
      debugger
      var entity = {
        'SatffID': this.StaffID,
        'StaffType': this.StaffID,
        // 'Supervisor': this.id,
        Supervisor: 1,
        // 'ResultAreaID': this.ResultAreaID,  (One time HR Rating for One goal)
        'ResultAreaID': this.hrresultAreaID,
        'PerformaceIndicatorID': this.kpiid,
        'SelfScores': this.Score,
        'SelfComments': this.SelfComments,
        'Attachment': this.attachment
      }
      this.PerformanceManagementService.InsertStaffScoresByHR(entity).subscribe(data => {
        debugger
        Swal.fire("Saved Successfully");
        var entity1 = {
          'SatffID': this.StaffID,
          'StaffType': this.StaffID,
          // 'Supervisor': this.appraisalList[this.q].Supervisor,
          'ResultAreaID': this.ResultAreaID,
          'PerformaceIndicatorID': this.kpiid,
          'GroupHeadScores': this.Score,
          'GroupHeadComments': this.SelfComments,
        }
        // this.PerformanceManagementService.UpdateCIOStaffScores(entity1).subscribe(data => {
        //   debugger

        // })
        this.Score = 0;
        this.SelfComments = '';
        this.attachment = '';
        const element1 = document.getElementById('close');
        this.files.length = 0;
        if (element1 !== null) {
          element1.click();
        }
        this.ngOnInit();
      })
    }
  }


  public GetKPIIDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.id == details.id)
      this.Score = temp[0].hrrrating;
      this.SelfComments = temp[0].hrcomments;
      this.hrattachment = details.hPhoto;
      this.managerattachment = details.mPhoto;
      this.sbuattachment = details.sbuPhoto;
      this.attachment = details.hrattachment
      this.attachment = details.photo;

      this.SbuAttachmentType = details.sbuAttachmentType;
      this.hrAttachmentType = details.hrAttachmentType;
      this.ManagerAttachmentType = details.managerAttachmentType;
      this.SelfAttachmentType = details.selfAttachmentType
    })
    this.photoid = details.id;
    this.id = details.id;
  }

  //Method to upload Attachment//
  onSelect(event: any) {
    console.log(event);
    this.attachmentsurl.length = 0
    debugger
    this.files.push(...event.addedFiles);
    this.PerformanceManagementService.ProjectAttachments(this.files).subscribe(res => {
      debugger
      if (res != undefined) {
        this.attachment = res;
        // this.loader = false;
        // alert('Attachment uploaded')
        // this.attachmentsurl.push(res);
        Swal.fire("Attachment uploaded Successfully");
      }
      debugger
    })
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  //Methods to get Comments

  public GetEmpComments(detials: any) {
    this.empcommnts = detials.empcomments
  }

  public GEtmanagercomments(detials: any) {
    this.managercomments = detials.managercomments
  }

  public GEtsbucomments(detials: any) {
    this.sbucomments = detials.sbuComments
  }


  //Method to Update HR Rating //
  public UpdateDetails() {
    debugger
    var entity = {
      'SatffID': this.StaffID,
      'StaffType': this.StaffID,
      'Supervisor': this.id,
      'ResultAreaID': this.ResultAreaID,
      'PerformaceIndicatorID': this.kpiid,
      'SelfScores': this.Score,
      'SelfComments': this.SelfComments,
      'Attachment': this.attachment
    }
    this.PerformanceManagementService.InsertStaffScoresByHR(entity).subscribe(data => {
      debugger
      Swal.fire("Updated Successfully");
      this.attachment = "";
      const element1 = document.getElementById('close');
      this.files.length = 0;

      if (element1 !== null) {
        element1.click();
      }
      this.ngOnInit();
    })
  }


  //Method to Submit Apprasal By HR//
  public SubmitHrAppraisal() {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not able to make changes once submitted',
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
        this.PerformanceManagementService.SubmitHrAppraisal(entity).subscribe(data => {
          debugger
          Swal.fire("Submitted Appraisal Successfully");
          this.ngOnInit();
        })
      }
    })
  }

  //method to get Attachements//
  getattachment(details: any) {
    debugger
    this.attachment = details.photo;
    this.managerattachment = details.mPhoto;
    // this.selfattachment = details.photo;
    this.sbuAttachment = details.sbuPhoto;
    this.hrattachment = details.hPhoto;
  }

  //method to update Attachment//
  update() {
    debugger
    var entity = {
      'ID': this.photoid,
      // 'Attachment': this.attachmentsurl[0]
      'Attachment': this.attachment
    }
    this.PerformanceManagementService.UpdateHrSelfAttachment(entity).subscribe(data => {
      debugger
      Swal.fire("Updated Successfully");
      this.attachment = 0;
      this.attachment = "";

      this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe(data => {
        debugger
        this.ResultAreaList = data.filter((x: { managerSubmittedDate: any; employeeSubmittedDate: any; appraiselID: any; }) => x.managerSubmittedDate != null && x.employeeSubmittedDate != null && x.appraiselID == this.appraislid);
        console.log("Result area", this.ResultAreaList);
      })
    })
  }

  //method to cancel rating//
  cancel() {
    location.href = "/shared/Selfratingnew";
  }

  //method to get description//
  view(desc: any) {
    this.description = desc;
  }

}