import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import  {MypopmodalComponent} from '../mypopmodal/mypopmodal.component'

@Component({
  selector: 'app-myhomepage',
  templateUrl: './myhomepage.component.html',
  styleUrls: ['./myhomepage.component.css']
})
export class MyhomepageComponent implements OnInit {

  constructor(  public dialog: MatDialog ) {
  }

  ngOnInit() {
  }

  clicked(){
    console.log(this.dialog)
    const dialogRef = this.dialog.open(MypopmodalComponent, {
      width: '40%',

    });
  }

}
