import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Stadium } from 'src/app/models/models';

@Component({
    selector: 'app-add-update-stadium',
    templateUrl: './add-update-stadium.component.html'
})
export class AddUpdateStadiumComponent {
    @Input() stadium: Stadium;
    @Output() closeModal = new EventEmitter();
    @Output() saveStadium = new EventEmitter<Stadium>();

    isEditMode = false;
    wasInside = false;

    cancel() {
        this.closeModal.emit();
    }

    save() {
        this.saveStadium.emit(this.stadium);
    }
}
