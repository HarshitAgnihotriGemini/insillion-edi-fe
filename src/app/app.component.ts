import { Component } from '@angular/core';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';

@Component({
  selector: 'app-root',
  standalone: true, // <-- Add this
  imports: [BulkUploadComponent], // Remove BulkUploadComponent if not used here
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'insillion-edi-fe';
}
