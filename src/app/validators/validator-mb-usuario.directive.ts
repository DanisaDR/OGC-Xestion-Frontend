import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Observable } from 'rxjs';

export function existsMbUsu(usrSrv: UsuarioService, usuID: number): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return usrSrv.checkMbUsu(control.value, usuID).then(
      result => {
        return result === true ? { mbExistsUsu: true } : null;
      }
    );
  };
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[mbExistsUsu][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidatorMbUsuarioDirective,
      multi: true
    }
  ]
})
export class ValidatorMbUsuarioDirective implements AsyncValidator {

  // tslint:disable-next-line: no-input-rename
  @Input('usuWithID') usuWithID: number;

  constructor(private usrSrv: UsuarioService) {

  }

  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    if (this.usuWithID === undefined) {
      this.usuWithID = 0;
    }

    return existsMbUsu(this.usrSrv, this.usuWithID)(control);
  }
}
