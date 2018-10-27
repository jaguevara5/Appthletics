import { CommonModule } from '@angular/common';
import {
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSortModule
    ],
    exports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSortModule,
        MatCardModule
    ]
})
export class MyMaterialModule {
}
