//  Product :Digi PerformanceManagement System 1.0
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Displaying the Data from GetMyDetails & GetDepartment,Displaying the Data from GetRoleType, Displaying the Count.
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Manikanta, Sindhu, Madhav
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-supporttickets',
  templateUrl: './supporttickets.component.html',
  styleUrls: ['./supporttickets.component.css'],
})
export class SupportticketsComponent implements OnInit {
  // variables decleartions//

  todaydate: any;
  date: any;
  time: any;
  typeofissue: any;
  prority: any;
  screenShot: any = [];
  comments: any;
  status: any;
  companyname: any;
  applicationName: any;
  id: any;
  staffID: any;
  ticketlist: any;
  files: File[] = [];
  files1: File[] = [];
  ticketid: any;
  currentUrl: any;

  constructor(
    public PerformanceManagementService: PerformancemanagementService,
    public ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//

    this.currentUrl = window.location.href;
    this.staffID = sessionStorage.getItem('EmaployedID');
    this.typeofissue = '0';
    this.prority = '0';
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.date=this.todaydate
    this.ActivatedRoute.params.subscribe((params) => {
      debugger;
      this.id = params['id'];
      if (this.id != null && this.id != undefined) {
        this.GetSupportTickets();
      }
    });
  }


     //Method to Displaying the Data from GetSupportTickets Table//

  public GetSupportTickets() {
    this.PerformanceManagementService.GetSupportTickets()
    .subscribe({
      next: (data) => {
        debugger;
        this.ticketlist = data.filter(
          (x) =>
            x.applicationName == 'Performance Management' && x.id == this.id
        );
        (this.date = this.ticketlist[0].date),
          (this.time = this.ticketlist[0].time1),
          (this.typeofissue = this.ticketlist[0].typeOfApplicationIssues),
          (this.prority = this.ticketlist[0].priority),
          (this.screenShot[0] = this.ticketlist[0].screenShot),
          (this.comments = this.ticketlist[0].comment);
      },
      error: (err) => {
        Swal.fire('Issue in Getting SupportTickets');
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

  //Method to attch the files//

  onSelect(event: { addedFiles: any }) {
    debugger;
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.files1.push(event.addedFiles[0]);

    console.log('content', this.files);
    this.AttachmentsUpload();
  }

  AttachmentsUpload() {
    this.PerformanceManagementService.AttachmentsUploadsss(this.files)
    .subscribe({
      next: (data) => {
        debugger;
        this.screenShot.push(data);
        console.log('data', this.screenShot);
        this.files.length = 0;
      },
      error: (err) => {
        Swal.fire('Issue in Getting AttachmentsUploadsss');
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

  onRemove(event: any) {
    debugger;
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

   //Method to Insert the Data from InsertSupportTickets Table//

  save() {
    debugger;
    if (
      this.date == undefined ||
      this.time == 0 ||
      this.typeofissue == undefined ||
      this.prority == null ||
      this.screenShot == undefined ||
      this.comments == undefined ||
      this.staffID == undefined
    ) {
      Swal.fire('Please Enter the Mandatory Fields');
    } else {
      debugger;
      var entity = {
        Date: this.date,
        Time: this.time,
        TypeOfApplicationIssues: this.typeofissue,
        Priority: this.prority,
        ScreenShot: this.screenShot[0],
        Comment: this.comments,
        Status: 'Raised',
        Companyname: 'Amazeinc.in',
        ApplicationName: 'Performance Management',
        StaffID: this.staffID,
      };

      this.PerformanceManagementService.InsertSupportTickets(entity)
      .subscribe({
        next: (data) => {
          this.ticketid = data;
          this.uploadmultipleimages();
          Swal.fire('Saved Sucessfully');
          location.href = '#/SupportTicketDashboard';

          this.date = '';
          this.time = '';
          this.typeofissue = '';
          this.prority = '';
          this.comments = '';
        },
        error: (err) => {
          Swal.fire('Issue in InsertSupportTickets');
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

   //Method to Insert the Data from InsertAttachment Table//

  public uploadmultipleimages() {
    debugger;
    for (let i = 0; i < this.screenShot.length; i++) {
      var entity = {
        Attachment: this.screenShot[i],
        TicketID: this.ticketid,
      };
      this.PerformanceManagementService.InsertAttachment(entity)
      .subscribe({
        next: (data) => {
          debugger;
          Swal.fire('Saved Successfully');
        },
        error: (err) => {
          Swal.fire('Issue in InsertAttachment');
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

  
   //Method to Update the Data from UpdateSupportTickets Table//

  public Update() {
    var entity = {
      id: this.id,
      Date: this.date,
      Time: this.time,
      TypeOfApplicationIssues: this.typeofissue,
      Priority: this.prority,
      ScreenShot: this.screenShot[0],
      Comment: this.comments,
      Status: 'Open',
      Companyname: 'Amazeinc.in',
      ApplicationName: 'Performance Management',
      StaffID: this.staffID,
    };
    this.PerformanceManagementService.UpdateSupportTickets(entity)
    .subscribe({
      next: (data) => {
        this.ticketid = data;
        this.uploadmultipleimages();
        Swal.fire('Updated Sucessfully');
        location.href = '#/SupportTicketDashboard';

        this.date = '';
        this.time = '';
        this.typeofissue = '';
        this.prority = '';
        this.comments = '';
      },
      error: (err) => {
        Swal.fire('Issue in UpdateSupportTickets');
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
//Method to Route With Respect to URL//
  public cancel() {
    location.href = '#/SupportTicketDashboard';
  }
}
