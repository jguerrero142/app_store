import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';


import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline
} from '@ant-design/icons-angular/icons';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzAlertModule } from 'ng-zorro-antd/alert';


const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];

@NgModule({
  imports: [
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzDrawerModule,
    NzAvatarModule,
    NzToolTipModule,
    NzCarouselModule,
    NzCardModule,
    NzEmptyModule,
    NzTagModule,
    NzPageHeaderModule,
    NzBackTopModule,
    NzSpinModule,
    NzStatisticModule,
    NzGridModule,
    NzCollapseModule,
    NzAlertModule
     ],
  exports: [
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzDrawerModule,
    NzAvatarModule,
    NzToolTipModule,
    NzCarouselModule,
    NzCardModule,
    NzEmptyModule,
    NzTagModule,
    NzPageHeaderModule,
    NzBackTopModule,
    NzSpinModule,
    NzStatisticModule,
    NzGridModule,
    NzCollapseModule,
    NzAlertModule
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class nzDesingModule {
}
