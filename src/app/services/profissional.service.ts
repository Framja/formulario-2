import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService extends BaseService {

 constructor(
    public override http: HttpClient,
    public override utilService: UtilService
  ) {
    super(http, utilService);
  }
}
