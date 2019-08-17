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
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
    declarations: [
        ConfirmDeleteDialogComponent,
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSortModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule
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
        MatProgressSpinnerModule,
        SpinnerComponent
    ],
    entryComponents: [ConfirmDeleteDialogComponent],
})
export class SharedModule {
}
