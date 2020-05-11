import { Directive, Input } from '@angular/core';
import { SocioService } from '../services/socio.service';
import { AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export function existsMbSoc(socSrv: SocioService, socID: number): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return socSrv.checkMbSoc(control.value, socID).then(
      result => {
        return result === true ? { mbExistsSoc: true } : null;
      }
    );
  };
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[mbExistsSoc][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidatorMbSocioDirective,
      multi: true
    }
  ]
})
export class ValidatorMbSocioDirective {

  // tslint:disable-next-line: no-input-rename
  @Input('socWithID') socWithID: number;

  constructor(private socSrv: SocioService) {

  }

  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    if (this.socWithID === undefined) {
      this.socWithID = 0;
    }

    return existsMbSoc(this.socSrv, this.socWithID)(control);
  }
}
