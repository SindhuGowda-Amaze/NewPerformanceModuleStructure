import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-appraisal',
  templateUrl: './manager-appraisal.component.html',
  styleUrls: ['./manager-appraisal.component.css']
})
export class ManagerAppraisalComponent implements OnInit {

 
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


  ParamID: any;
  EmployeeKradash: any
  StaffType: any;
  StaffTypeID: any;
  StaffID: any;
  ResultAreaList: any;
  PerformanceLists1: any;
  showbtn: any;
  showbtn1:any;
  Name:any;
  role:any;
  departmentName:any;
  managerSubmittedDate:any
  selfAttachment:any;
  EmployeeId: any;
  appraislid:any;
  managerrating:any;
  ngOnInit(): void {
    this.Score = 0;
    this.showbtn = false;
    this.showbtn1 = false;
    this.HighScore();
    this.route.params.subscribe(params => {
      debugger;
      this.ParamID = params['id'];
      if (params['id'] != undefined) {
        // this.StaffType = params['StaffID'];
        this.appraislid = params['StaffID'];
        this.StaffID = params['id'];
        this.StaffTypeID = this.StaffType;

        this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe(data => {
          debugger
          this.ResultAreaList = data.filter((x: { emplosubmitdate: any; appraiselID: any;})=>x.emplosubmitdate!=null && x.appraiselID == this.appraislid);
          console.log(this.ResultAreaList);
          
          this.Name=this.ResultAreaList[0].name
          this.role=this.ResultAreaList[0].role
          this.departmentName=this.ResultAreaList[0].departmentName
          this.managerSubmittedDate=this.ResultAreaList[0].managerSubmittedDate
          this.selfAttachment=this.ResultAreaList[0].Photo
          this.ResultAreaList.forEach((element: { managerupdate: any; }) => {
            if (element.managerupdate != 1 ) {
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
  ManagerSubmittedDate:any;
  managerattachment:any
    id: any;
  public GetKPIID(details: any) {
    this.id = details.id;
    this.kpiid = details.kpiid;
    this.ResultAreaID = details.resultAreaID;
    this.Score = "";
    this.SelfComments = '';

  }

  public SaveDetails() {
    debugger
    if(this.Score==undefined||this.Score==0||this.SelfComments==undefined||this.SelfComments==null){
      Swal.fire("Please Enter the Mandatory Fields");
    }
    else{
      debugger
      var entity = {
        
        'SatffID': this.StaffID,
        'StaffType': this.StaffID,
        'Supervisor': this.id,
        'ResultAreaID': this.ResultAreaID,
        'PerformaceIndicatorID': this.kpiid,
        'SelfScores': this.Score,
        'SelfComments': this.SelfComments,
        'Attachment': this.attchmentss
      }
      this.PerformanceManagementService.InsertStaffScoresByManager(entity).subscribe(data => {
        debugger
        Swal.fire("Saved Successfully");
        // var entity1 = {
        //   'SatffID': this.StaffID,
        //   'StaffType': this.StaffID,
        //   // 'Supervisor': this.appraisalList[this.q].Supervisor,
        //   'ResultAreaID': this.ResultAreaID,
        //   'PerformaceIndicatorID': this.kpiid,
        //   'GroupHeadScores': this.Score,
        //   'GroupHeadComments': this.SelfComments,
        // }
        // this.PerformanceManagementService.UpdateGroupHeadStaffScores(entity1).subscribe(data => {
        //   debugger
  
        // })
        this.Score = "";
        this.SelfComments = "";
        this.attchmentss='';
        this.files.length = 0;
        const element1 = document.getElementById('close');
  
        if (element1 !== null) {
  
          element1.click();
  
        }
        this.ngOnInit();
  
      })
    }
   

  }



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
       'Attachment': this.attchmentss
    }
    this.PerformanceManagementService.InsertStaffScoresByManager(entity).subscribe(data => {
      debugger
      Swal.fire("Updated Successfully");
      this.attchmentss = "";
      const element1 = document.getElementById('close');
      this.files.length = 0;
      if (element1 !== null) {

        element1.click();

      }
      this.ngOnInit();

    })
  }


  public GetKPIIDetails(details: any) {
    debugger
    this.managerattachment='';
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.id == details.id)
      this.Score = temp[0].managerrating;
      this.SelfComments = temp[0].managercomments;
      // this.attachment=details.photo;
      this.managerattachment=details.mPhoto;
      this.id = temp[0].id;
      this.kpiid = temp[0].kpiid;
      this.ResultAreaID = temp[0].resultAreaID; 
      this.attachment=details.managerattachment
    
    })

    this.photoid=details.id;
  }

  files: File[] = [];
  attachmentsurl: any = []
  attchmentss:any;
  onSelect(event: any) {
    console.log(event);
    debugger
    this.files.push(...event.addedFiles);
    this.PerformanceManagementService.ProjectAttachments(this.files).subscribe(res => {
      debugger
      if (res != undefined) {
        this.attchmentss=res;
        // this.attachmentsurl.push(res);
     
        alert('Attachment uploaded')
       


      }
      debugger
    })

  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  empcomments: any;
  public GEtemployeecomments(detials: any) {
    this.empcomments = detials.empcomments
  }

  
  public SubmitManagerAppraisal() {
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
        this.PerformanceManagementService.SubmitManagerAppraisal(entity).subscribe(data => {
          debugger
          Swal.fire("Submitted Appraisal Successfully");
          this.ngOnInit();
          //  this.showbtn=false;
          //  this.showbtn1=true
          this.InsertNotificationHR();
          this.InsertNotificationEmployeeAppraisalSubmit();
        })
      }
    })
  }
  attachment:any;
  photoid:any;
  getattachment(details:any){
    debugger
      this.selfAttachment=details.photo;
      this.photoid=details.id;
      this.attachmentsurl[0]=details.selfattachment
    }

    update(){
      debugger
      var entity = {
        'ID':this.photoid,
        'Attachment': this.attchmentss
      }
      this.PerformanceManagementService.UpdateManagerSelfAttachment(entity).subscribe(data => {
        debugger
        Swal.fire("Updated Successfully");
        this.attachmentsurl=0;
        this.attchmentss="";
        this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe(data => {
          debugger
          this.ResultAreaList = data;

          console.log("Result area", this.ResultAreaList);

        })

      })
    
    }
  cancel(){
    location.href="/Selfratingnew";
  }

  

  public InsertNotification() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Apprisal Request',
      'FromUser': 'Admin',
      'ToUser': sessionStorage.getItem('EmaployedID'),
      'Message': 'Your Manager Assigned a New Goal Setting to you!!',
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

  public InsertNotificationHR() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Apprisal Request',
      'FromUser': 'Admin',
      'ToUser': sessionStorage.getItem('EmaployedID'),
      'Message': 'Your Manager has submitted the Appraisal',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': 10422,
      'NotificationTypeID': 17,
      'VendorID': 0


    }
    this.PerformanceManagementService.InsertNotification(entity).subscribe(data => {
      if (data != 0) {

      }

    })
  }


  public InsertNotificationEmployeeAppraisalSubmit() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Apprisal Request',
      'FromUser': 'Admin',
      'ToUser': sessionStorage.getItem('EmaployedID'),
      'Message': 'Manager has Completed your Appraisal',
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





  

}
