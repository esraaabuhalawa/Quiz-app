import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function matchPasswordValidator(
  firstField: string,
  secondField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstValue = control.get(firstField)?.value;
    const secondValue = control.get(secondField)?.value;

    return firstValue === secondValue ? null : { passwordMismatch: true };
  };
}
