import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { C8yStepper } from '@c8y/ngx-components';
import { SuperheroService } from './superhero.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { _ } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-stepper-superhero',
  templateUrl: 'superhero-stepper.component.html'
})
export class SuperheroStepperComponent implements OnInit {
  formGroupStepOne: FormGroup;
  formGroupStepTwo: FormGroup;
  formGroupStepThree: FormGroup;

  pendingStatus: boolean = false;

  @ViewChild(C8yStepper, { static: true })
  stepper: C8yStepper;

  private onClose: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private superheroService: SuperheroService,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.formGroupStepOne = this.fb.group({
      name: ['', Validators.required]
    });

    this.formGroupStepTwo = this.fb.group({
      gender: ['', Validators.required]
    });

    this.formGroupStepThree = this.fb.group({
      power: ['', Validators.required]
    });

    this.formGroupStepTwo.get('gender').setValue('female');
  }

  async navigate(stepIndex: number) {
    // we know that we have a linear stepper
    // see: superhero-stepper.component.html <c8y-stepper ... linear>
    if (this.stepper.selectedIndex < stepIndex) {
      if (this.stepper.selectedIndex === 2) {
        await this.save();
      }
      this.stepper.next();
    } else {
      this.stepper.selectedIndex = stepIndex;
    }
  }

  async save() {
    if (this.formGroupStepThree.invalid) {
      return;
    }
    this.pendingStatus = true;
    await this.superheroService.addHero({
      name: this.formGroupStepOne.get('name').value,
      gender: this.formGroupStepTwo.get('gender').value,
      power: this.formGroupStepThree.get('power').value
    });
    this.pendingStatus = false;
    this.stepper.next();
  }

  close(isModal: boolean) {
    if (isModal) {
      this.onClose.next(null);
      this.bsModalRef.hide();
    } else {
      this.resetStepper();
    }
  }

  private resetStepper() {
    this.stepper.reset();
    this.stepper.selectedIndex = 1;
  }
}
