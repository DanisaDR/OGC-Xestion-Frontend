import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, NG_VALIDATORS, AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { SocioService } from '../services/socio.service';

export function existsEmailSoc(socSrv: SocioService, socID: number): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return socSrv.checkEmailSoc(control.value, socID).then(
      result => {
        return result === true ? { existsEmail: true } : null ;
      }
    );
  };
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[existsEmail][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidatorEmailSocioDirective,
      multi: true
    }
  ]
})
export class ValidatorEmailSocioDirective implements AsyncValidator {

  // tslint:disable-next-line: no-input-rename
  @Input('socWithID') socWithID: number;

  constructor(private socSrv: SocioService) {

  }

  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    if (this.socWithID === undefined) {
      this.socWithID = 0;
    }

    return existsEmailSoc(this.socSrv, this.socWithID)(control);
  }
}
