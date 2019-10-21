import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationsService } from '../../../order-panel/operations.service';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-operations-history',
  templateUrl: './operations-history.component.html',
  styleUrls: ['./operations-history.component.scss']
})
export class OperationsHistoryComponent implements OnInit, OnDestroy {
  operationsHistoryTableDataSource: MatTableDataSource<any>;
  displayedColumns = ['title', 'operationType', 'date'];

  constructor(private operationsService: OperationsService) {}

  ngOnInit() {
    this.operationsService.getOperationsData()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe();

    this.operationsService.operationsHistoryDataForTable$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(
        operationsHistory =>
          (this.operationsHistoryTableDataSource = new MatTableDataSource(operationsHistory))
      );

    this.operationsService.setOperationsHistoryData();
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
