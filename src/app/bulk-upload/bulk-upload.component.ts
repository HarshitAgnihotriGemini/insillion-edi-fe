import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatTableModule, MatPaginatorModule],
  templateUrl: './bulk-upload.component.html',
  styleUrl: './bulk-upload.component.scss',
})
export class BulkUploadComponent implements OnInit {
  config: any;

  // SIMPLIFIED: Use direct properties instead of Maps
  tableDataSource: MatTableDataSource<any> | null = null;
  tableDisplayedColumns: string[] = [];
  tableSectionData: any; // To hold headers and pagination info

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<any>('../../assets/upload.config.json').subscribe((data) => {
      this.config = data;

      const tableSection = this.config.sections.find(
        (s: any) => s.componentType === 'data-table'
      );
      if (tableSection) {
        // Assign data directly to our new properties
        this.tableSectionData = tableSection.data;
        this.tableDisplayedColumns = tableSection.data.columnKeys;
        this.tableDataSource = new MatTableDataSource(tableSection.data.rows);
      }

      // Manually trigger change detection
      this.cd.detectChanges();
    });
  }
}
