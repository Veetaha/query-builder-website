import { Injectable    } from '@angular/core';
import { DialogService } from 'primeng/api';

import { PictureDialogConfig, PictureDialogRef } from './picture-dialog.interface';
import { PictureDialogComponent } from './picture-dialog.component';

@Injectable({ providedIn: 'root' })
export class PictureDialogService {
    constructor(private readonly dialogs: DialogService) {}

    openDialog(config: PictureDialogConfig): PictureDialogRef {
        return this.dialogs.open(PictureDialogComponent, { 
            dismissableMask: true,
            ...config 
        });
    }

}