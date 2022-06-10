import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import Swal from 'sweetalert2';
import { PerformancemanagementService } from '../../Services/performancemanagement.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  temp: any;
  userName: any;
  time: any;
  hh: any;
  mm: any;
  ampm: any;
  page: any;
  notificationslist: any;
  unseen: any;
  constructor(public PerformanceManagementService: PerformancemanagementService) { }

  ngOnInit(): void {
    this.temp = sessionStorage.getItem('temp');
    this.userName = sessionStorage.getItem('loginName');

    setInterval(() => {
      var time = new Date();
      this.time = time.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
      let temp: any = this.time.split(':');
      this.hh = temp[0];
      let temp1: any = this.time.split(':')[1].split(" ");
      this.mm = temp1[0];
      this.ampm = temp1[1];
    }, 1000);

    interval(1000).subscribe((x => {

      this.page = sessionStorage.getItem('clickname')
    }));

    this.GetNotification(); 


  }

  logout() {
    sessionStorage.clear();
    location.href = "#/Login";
    location.reload();

  }
  notificationCount: any;
  public GetNotification() {
    debugger
    this.unseen = 0;
    this.PerformanceManagementService.GetNotification(sessionStorage.getItem('EmaployedID')).subscribe(data => {
      debugger
      this.notificationslist = data.filter(x => x.notificationTypeID == 17);
      this.notificationCount = this.notificationslist.length;
    })
  }


  public ClearNotification() {
    debugger
    this.PerformanceManagementService.ClearNotificationByID(sessionStorage.getItem('EmaployedID')).subscribe(data => {
      debugger

    })

    Swal.fire('Cleared Successfully');
    this.GetNotification();

  }

  public seen() {
    this.unseen = 1;
  }

  seennotification(id: any) {
    debugger
    var entity = {
      'ID': id,
      "Seen": 1
    }
    this.PerformanceManagementService.UpdateNotificationSeen(entity).subscribe(data => {
      debugger
      this.GetNotification();
    })
  }

}
