import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() route: string;
  @Input() paginator: any;

  pages: number[];
  since: number;
  until: number;
  paras = new HttpParams();
  number;

  constructor(private activRoute: ActivatedRoute) {
    this.paras = this.activRoute.snapshot.params.para;
  }

  ngOnInit() {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    const paginatorAct = changes.paginator;

    if (paginatorAct.previousValue) {
      this.initPaginator();
    }
  }

  private initPaginator(): void {
    this.since = Math.min(
      Math.max(1, this.paginator.number - 4),
      this.paginator.totalPages - 5,
    );
    this.until = Math.max(
      Math.min(this.paginator.totalPages, this.paginator.number + 4),
      6,
    );

    if (this.paginator.totalPages > 5) {
      // tslint:disable-next-line: variable-name
      this.pages = new Array(this.until - this.since + 1)
        .fill(0)
        .map((_valor, indice) => indice + this.since);
    } else {
      // tslint:disable-next-line: variable-name
      this.pages = new Array(this.paginator.totalPages)
        .fill(0)
        .map((_valor, indice) => indice + 1);
    }
  }
}
