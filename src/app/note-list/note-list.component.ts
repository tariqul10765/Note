import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Note} from '../interfaces/note';
import {NoteService} from '../services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private noteService: NoteService) {}

  displayedColumns: string[] = ['position', 'title', 'des', 'action'];
  dataSource = [];
  // dataSource = new MatTableDataSource<any>(this.dataSources);

  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.noteService.refreshNeeded$.subscribe(() => {
      this.getData();
    });
    this.getData();
  }

  private getData(): void{
    this.noteService.sendGetRequest().subscribe((data: any[]) => {
      console.log(data);
      this.dataSource = data;
    });
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  //
  // // tslint:disable-next-line:typedef
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  // tslint:disable-next-line:typedef
  deleteColumn(element: any) {
    this.noteService.sendDeleteRequest(element._id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(item => item._id !== element._id);
      });
  }

  // tslint:disable-next-line:typedef
  updateColumn(element: any) {
    const name = window.prompt('Update your title: ');

    console.log(name);

    if (name === '' || name === null) { return; }

    this.noteService.sendPatchRequest(element._id, name).subscribe(respose => {
      this.noteService.setRefreshNeeded$();
      console.log(respose);
    });

    // this.noteService.sendGetRequest().subscribe((data: any[]) => {
    //   // console.log(data);
    //   this.dataSource = data;
    // });
  }
}
