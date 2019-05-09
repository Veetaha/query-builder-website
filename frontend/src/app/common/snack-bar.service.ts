import { Injectable } from '@angular/core';
import { MessageService, Message } from 'primeng/api';

import { ConfigService } from '@app/config/config.service';


@Injectable({ 
    providedIn: 'root'
})
export class SnackBarService {
    constructor(
        private readonly toasts: MessageService,
        private readonly config: ConfigService
    ) {}

    addSnackBar(message: Message) {
        return this.toasts.add({ ...this.config.defaultToastOptions, ...message });
    }

    showWarning(detail: string, summary = 'Warning') {
        this.addSnackBar({ severity: 'warn', detail, summary });
    }
    
    showSuccess(detail: string, summary = 'Success') {
        this.addSnackBar({ severity: 'success', detail, summary });
    }

    showInfo(detail: string, summary = 'Info') {
        this.addSnackBar({ severity: 'info', detail, summary });
    }

    showError(detail: string, summary = 'Error') {
        this.addSnackBar({ severity: 'error', detail, summary });
    }

}