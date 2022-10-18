import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moments';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

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

  constructor(private momentService: MomentService, private route: ActivatedRoute, private MessagesService: MessagesService, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.momentService
    .getMoment(id)
    .subscribe(item => this.moment = item.data)
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe()
    this.MessagesService.add("Momento excluido com sucesso")
    this.router.navigate(['/']);
  }

}
