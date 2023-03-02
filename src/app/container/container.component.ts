import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  winner!: string
  tiles = ['', '', '', '', '', '', '', '', '']
  currentPlayer = "Player X"
  draw!:string
  pause:boolean= false
  winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  constructor(public dialog: MatDialog){}
  openDialog(){
    this.pause = true
    let dialogRef= this.dialog.open(CourseDialogComponent,{
      width:"300px",
      data:{
        name:this.winner
      }
    })
      dialogRef.afterClosed().subscribe(e=>{
        this.tiles = ['', '', '', '', '', '', '', '', ''];
        this.pause = false
      })
    }
  
  tick(index: number) {
    if (this.tiles[index] === "X" || this.tiles[index] === "O" || this.pause===true) {
      return
    }
    if (this.currentPlayer == "Player X") {
      this.tiles[index] = "X"
      this.handleResultValidation()
      this.currentPlayer = "Player O"

    } else {
      this.tiles[index] = "O"
      this.handleResultValidation()
      this.currentPlayer = "Player X"

    }
  }
  handleResultValidation(){
    let roundWon=false
    for(let i=0; i<=7 ; i++){
      const winCondition=this.winningConditions[i]
      let a = this.tiles[winCondition[0]]
      let b =this.tiles[winCondition[1]]
      let c = this.tiles[winCondition[2]]
      if( a ==='' || b==='' || c===''){
        continue
      }
      if(a ===b && b ===c){
        roundWon=true
        break
      }
    }
    if(roundWon){
      this.winner = `The winner is ${this.currentPlayer}`
      this.openDialog()
    }
    let roundDraw= !this.tiles.includes('')
    if(roundDraw){
      this.winner="The game ended with draw"
      this.openDialog()
  }
}
}
