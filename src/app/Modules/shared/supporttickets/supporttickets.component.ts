import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-supporttickets',
  templateUrl: './supporttickets.component.html',
  styleUrls: ['./supporttickets.component.css']
})
export class SupportticketsComponent implements OnInit {

  constructor(public PerformanceManagementService:PerformancemanagementService,public ActivatedRoute: ActivatedRoute) { }
  todaydate:any
  date: any;
  time: any;
  typeofissue: any;
  prority: any;
  screenShot:any=[]
  comments: any;
  status: any;
  companyname: any;
  applicationName: any;
  id:any;
  staffID:any;
  ticketlist: any;
  ngOnInit(): void {
    this.staffID = sessionStorage.getItem('EmaployedID');
    this.typeofissue="0";
    this.prority="0"
    const format = 'yyyy-MM-dd';

    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetSupportTickets();
      }
    })
  }


  public GetSupportTickets() {
    this.PerformanceManagementService.GetSupportTickets().subscribe(
      data => {
        this.ticketlist = data.filter(x => x.applicationName == 'Performance Management' && x.id==this.id);
        this.date = this.ticketlist[0].date,
          this.time = this.ticketlist[0].time1,
          this.typeofissue = this.ticketlist[0].typeOfApplicationIssues,
          this.prority = this.ticketlist[0].priority,
          this.screenShot[0] = this.ticketlist[0].screenShot,
          this.comments = this.ticketlist[0].comment

      }
    )
  }


  files: File[] = [];
  files1: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.files1.push(event.addedFiles[0]);

    console.log("content", this.files);
    this.AttachmentsUpload()
  }


  AttachmentsUpload() {
    this.PerformanceManagementService.AttachmentsUploadsss(this.files).subscribe(data => {
      debugger
      this.screenShot.push(data);
      console.log( "data",this.screenShot);
      this.files.length=0;
    })
  }

  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  save() {
    debugger
    if(this.date==undefined||this.time==0||this.typeofissue==undefined||this.prority==null||this.screenShot==
      undefined||this.comments==undefined||this.staffID==undefined){
      Swal.fire("Please Enter the Mandatory Fields");
    }
    else{
    debugger
    var entity = {
      "Date": this.date,
      "Time": this.time,
      "TypeOfApplicationIssues": this.typeofissue,
      "Priority": this.prority,
      "ScreenShot": this.screenShot[0],
      "Comment": this.comments,
      "Status": 'Raised',
      "Companyname": 'Amazeinc.in',
      "ApplicationName": 'Performance Management',
      "StaffID":this.staffID
    }
    
    this.PerformanceManagementService.InsertSupportTickets(entity).subscribe(
      data => {
        this.ticketid = data;
        this.uploadmultipleimages()
        Swal.fire("Saved Sucessfully");
        location.href="#/SupportTicketDashboard";

        this.date='';
        this.time='';
        this.typeofissue='';
        this.prority='';
        this.comments='';

      }
    )
  }
  }

  ticketid: any
  public uploadmultipleimages() {
      debugger
    for (let i = 0; i<this.screenShot.length; i++) {
      var entity = {
        "Attachment": this.screenShot[i],
        "TicketID": this.ticketid,
      }
      this.PerformanceManagementService.InsertAttachment(entity).subscribe(
        data => {
          Swal.fire("Saved Successfully");

        }
      )
    }
  }

  public Update() {
    var entity = {
      "id": this.id,
      "Date": this.date,
      "Time": this.time,
      "TypeOfApplicationIssues": this.typeofissue,
      "Priority": this.prority,
      "ScreenShot": this.screenShot[0],
      "Comment": this.comments,
      "Status": 'Open',
      "Companyname": 'Amazeinc.in',
      "ApplicationName": 'Performance Management',
      "StaffID":this.staffID
    }
    this.PerformanceManagementService.UpdateSupportTickets(entity).subscribe(
      data => {
        this.ticketid = data;
        this.uploadmultipleimages()
        Swal.fire("Updated Sucessfully");
        location.href = "#/SupportTicketDashboard";

        this.date = '';
        this.time = '';
        this.typeofissue = '';
        this.prority = '';
        this.comments = '';

      }
    )
  }
  public cancel(){
    location.href="#/SupportTicketDashboard";
  }
}

