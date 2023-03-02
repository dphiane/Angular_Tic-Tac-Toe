import { Component,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContainerComponent } from '../container.component';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent {

  constructor(public dialogRef:MatDialogRef<ContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){
      console.log(data)
    }
newGame(){
  this.dialogRef.close();
}
}
