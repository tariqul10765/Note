import {Component, OnInit, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Note} from '../interfaces/note';
import {NoteService} from '../services/note.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.scss']
})
export class NoteAddComponent implements OnInit {

  @ViewChild('myForm') myForm: NgForm;
  constructor(private noteservice: NoteService, private toastr: ToastrService) { }

  user = {
    _id: null,
    title: '',
    description: ''
  };
  data = [];

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm){
    // console.log(value);
      // this.user.position = this.noteservice.ELEMENT_DATA.length + 1;
      this.user.title = form.value.title;
      this.user.description = form.value.description;

      this.addNoteToDB(this.user);
      // form.reset();

    // console.log(this.user);
        // @ts-ignore
    // this.data.push(this.user);

    // console.log(this.user);

  }

  // tslint:disable-next-line:typedef
  private addNoteToDB(data: any){
    this.noteservice.sendPostRequest(data).subscribe(res => {
        this.toastr.success('Your note successfully added!', 'Success');
        this.myForm.resetForm();
    });
  }
}
