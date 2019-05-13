import { Merge, ReplaceValues, Nullable } from 'ts-typedefs';
import { Observable  } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

export type PictureDialogRef = Merge<DynamicDialogRef, {
    onClose: Observable<undefined>;
    close(): void;
}>;

export type PictureDialogConfig = ReplaceValues<
    DynamicDialogConfig, 'data', PictureDialogData
>;

export interface PictureDialogData {
    pictureUrl:   string;
    /**
     *  If not `null | undefiend`, update mode is enabled. Use last value
     *  snapshot from this form control in order to get updated `pictureUrl`.
     */ 
    formControl?: Nullable<FormControl>;
}