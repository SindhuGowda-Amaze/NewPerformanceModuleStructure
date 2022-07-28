import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-support-ticket-dashboard',
  templateUrl: './support-ticket-dashboard.component.html',
  styleUrls: ['./support-ticket-dashboard.component.css']
})
export class SupportTicketDashboardComponent implements OnInit {
  
  ticketlist:any;
  search:any;
  count:any;
  staffID:any;
  attachmentlist:any;
  currentUrl: any;

  constructor(public PerformanceManagementService:PerformancemanagementService) { }

 
  ngOnInit(): void {
    this.staffID = sessionStorage.getItem('EmaployedID');
    this.currentUrl = window.location.href;
    this.GetSupportTickets();
  }



  public GetSupportTickets(){
    debugger
    this.PerformanceManagementService.GetSupportTickets()
    
    
.subscribe({
  next: data => {
    this.ticketlist=data.filter(x=>x.applicationName=='Performance Management' && x.staffID==this.staffID );
    this.count=this.ticketlist.length;
  }, error: (err) => { 
    Swal.fire('Issue in Getting SupportTickets');
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


 
  image(id:any){
    debugger
    this.PerformanceManagementService.GetSupportAttachment()
    
.subscribe({
  next: data => {
    debugger
    this.attachmentlist=data.filter(x=>x.ticketID==id);
  }, error: (err) => {
    Swal.fire('Issue in Getting SupportAttachment');
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

  public DeleteSupportTickets(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.PerformanceManagementService.DeleteSupportTickets(ID)
        
        
.subscribe({
  next: data => {
    debugger
          Swal.fire('Deleted Successfully')
          location.reload();
  }, error: (err) => {
    Swal.fire('Issue in  DeleteSupportTickets');
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
    })
  }


}
