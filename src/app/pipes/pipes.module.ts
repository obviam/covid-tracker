import { ThousandSuffixesPipe } from './thousand-suffixes.pipe';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ThousandSuffixesPipe],
    imports: [IonicModule],
    exports: [ThousandSuffixesPipe]
})
export class PipesModule { }
