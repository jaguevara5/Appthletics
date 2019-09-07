import { Component, Input, Output, EventEmitter } from '@angular/core';
import { School } from 'src/app/models/models';

@Component({
    selector: 'app-add-update-school',
    templateUrl: './add-update-school.component.html'
})
export class AddUpdateSchoolComponent {
    @Input() school: School;
    @Output() closeModal = new EventEmitter();
    @Output() saveSchool = new EventEmitter<School>();

    isEditMode = false;
    wasInside = false;

    cancel() {
        this.closeModal.emit();
    }

    save() {
        this.saveSchool.emit(this.school);
    }
}
