import { Component, Input, Output, EventEmitter } from '@angular/core';
import { District } from 'src/app/models/models';

@Component({
    selector: 'app-add-update-district',
    templateUrl: './add-update-district.component.html'
})
export class AddUpdateDistrictComponent {
    @Input() district: District;
    @Output() closeModal = new EventEmitter();
    @Output() saveDistrict = new EventEmitter<District>();

    isEditMode = false;
    wasInside = false;
    
    cancel() {
        this.closeModal.emit();
    }

    save() {
        this.saveDistrict.emit(this.district);
    }
}