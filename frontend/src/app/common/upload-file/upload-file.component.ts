import _ from 'lodash';
import { Nullable } from 'ts-typedefs';
import { Component, forwardRef } from '@angular/core';

import { ConfigService } from '@app/config/config.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export type FileUrlChangeHandler = (fileUrl: string) => void;

@Component({
    selector:    'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls:  ['./upload-file.component.scss'],
    providers: [{
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UploadFileComponent),
        multi:       true
    }]
})
export class UploadFileComponent implements ControlValueAccessor {
    fileUrl!: string;
    notifyFileUrlChanged: FileUrlChangeHandler = _.noop;

    constructor(readonly config: ConfigService) { }

    onUploadComplete(fileUrl: string) {
        this.fileUrl = fileUrl;
        this.notifyFileUrlChanged(fileUrl);
    }

    writeValue(fileUrl: Nullable<string>) {
        if (fileUrl != null) this.fileUrl = fileUrl;
    }

    registerOnChange(handler: FileUrlChangeHandler) {
        this.notifyFileUrlChanged = handler;
    }

    registerOnTouched() {}
}
