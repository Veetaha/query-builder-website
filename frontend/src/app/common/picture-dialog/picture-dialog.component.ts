import { Nullable } from 'ts-typedefs';
import { Component, Inject } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/api';

import { PictureDialogConfig } 
from './picture-dialog.interface';
import { FormControl } from '@angular/forms';


@Component({
    selector:    'app-picture-dialog',
    templateUrl: './picture-dialog.component.html',
    styleUrls:  ['./picture-dialog.component.scss']
})
export class PictureDialogComponent  {

    readonly formControl?: Nullable<FormControl>;
    readonly pictureUrl:   string;

    constructor(
        @Inject(DynamicDialogConfig) 
        {data}: PictureDialogConfig
    ) { 
        this.formControl = data.formControl;
        this.pictureUrl  = data.pictureUrl;
    }
}
