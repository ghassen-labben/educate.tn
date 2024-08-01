import { Component } from '@angular/core';
import Quill from 'quill'

import {FormControl, FormGroup} from '@angular/forms'
import BlotFormatter from 'quill-blot-formatter'
Quill.register('modules/blotFormatter', BlotFormatter)

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent   {
  templateForm: FormGroup;
  quillEditorModules = {};
  testEditorContent(){
    console.log(this.templateForm.get('textEditor')!.value);
    alert(this.templateForm.get('textEditor')!.value);
  }
constructor(){
    this.templateForm = new FormGroup({
      textEditor: new FormControl(""),
    });
    this.quillEditorModules = {
      blotFormatter: {}
    }
  }
}