import { CommonModule } from '@angular/common';
import {
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';

@NgModule({
    declarations: [
        ConfirmDeleteDialogComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSortModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
    exports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSortModule,
        MatCardModule,
        MatDialogModule,
        ConfirmDeleteDialogComponent,
        MatProgressSpinnerModule
    ],
    entryComponents: [ConfirmDeleteDialogComponent],
})
export class SharedModule {
}
