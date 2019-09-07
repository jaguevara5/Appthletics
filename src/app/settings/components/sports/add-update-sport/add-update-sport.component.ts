import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Sport } from 'src/app/models/models';

@Component({
    selector: 'app-add-update-sport',
    templateUrl: './add-update-sport.component.html'
})
export class AddUpdateSportComponent {
    @Input() sport: Sport;
    @Output() closeModal = new EventEmitter();
    @Output() saveSport = new EventEmitter<Sport>();

    isEditMode = false;
    wasInside = false;
    
    cancel() {
        this.closeModal.emit();
    }

    save() {
        this.saveSport.emit(this.sport);
    }
}
