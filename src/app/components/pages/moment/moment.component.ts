import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moments';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';
import { Comment } from 'src/app/Comment';
import { ComentService } from 'src/app/services/coment.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})

export class MomentComponent implements OnInit {
  baseApiUrl = environment.baseApiUrl;
  moment?: Moment;
  faTimes = faTimes;
  faEdit = faEdit;


  commentForm!: FormGroup;

  constructor(private momentService: MomentService, private route: ActivatedRoute, private MessagesService: MessagesService, private router: Router, private comentService: ComentService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.momentService
    .getMoment(id)
    .subscribe(item => this.moment = item.data)

    this.commentForm = new FormGroup({
      text: new FormControl("",[Validators.required]),
      username: new FormControl("",[Validators.required])
    })
  }

  get text() {
    return this.commentForm.get('text')!
  }

  get username() {
    return this.commentForm.get('username')!
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe()
    this.MessagesService.add("Momento excluido com sucesso")
    this.router.navigate(['/']);
  }


  async onSubmit(formDirective: FormGroupDirective) {

    if(this.commentForm.invalid) {
      return
    }

    const data: Comment = this.commentForm.value

    data.momentId = Number(this.moment!.id)

    await this.comentService
    .createComment(data)
    .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.MessagesService.add("Comentario Adicionado")

    this.commentForm.reset()

    formDirective.resetForm()
  }

}
