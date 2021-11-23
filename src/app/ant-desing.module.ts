import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
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
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzAffixModule } from 'ng-zorro-antd/affix';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
];

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
    NzAlertModule,
    NzTypographyModule,
    NzSkeletonModule,
    NzModalModule,
    NzButtonModule,
    NzSwitchModule,
    NzTableModule,
    NzTabsModule,
    NzSelectModule,
    NzDescriptionsModule,
    NzListModule,
    NzInputModule,
    NzFormModule,
    NzRateModule,
    NzProgressModule,
    NzAffixModule
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
    NzAlertModule,
    NzTypographyModule,
    NzSkeletonModule,
    NzModalModule,
    NzButtonModule,
    NzSwitchModule,
    NzTableModule,
    NzTabsModule,
    NzSelectModule,
    NzDescriptionsModule,
    NzListModule,
    NzInputModule,
    NzFormModule,
    NzRateModule,
    NzProgressModule,
    NzAffixModule
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class nzDesingModule {}
