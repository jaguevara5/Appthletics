import { CommonModule } from '@angular/common';
import {
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDialogRef } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSortModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSortModule,
        MatCardModule,
        MatDialogModule
    ]
})
export class MyMaterialModule {
}
