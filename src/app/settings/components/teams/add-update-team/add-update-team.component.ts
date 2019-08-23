import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Team, School, District, Sport, Category } from 'src/app/models/models';

@Component({
    selector: 'app-add-update-team',
    templateUrl: './add-update-team.component.html'
})
export class AddUpdateTeamComponent implements OnInit {
    @Input() team: Team;
    @Input() schools: School[];
    @Input() districts: District[];
    @Input() sports: Sport[];
    @Input() categories: Category[];
    @Output() closeModal = new EventEmitter();
    @Output() saveTeam = new EventEmitter<Team>();

    isEditMode = false;
    wasInside = false;

    ngOnInit() {
        if(!this.team._id) {
            this.team.name = '';
            this.team.school = { ...this.schools[0] };
            this.team.sport = { ...this.sports[0] };
            this.team.district= { ...this.districts[0] };
            this.team.category = { ...this.categories[0] };
        }
    }
    cancel() {
        this.closeModal.emit();
    }

    save() {
        this.saveTeam.emit(this.team);
    }
}