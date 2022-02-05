import { moduleMetadata, Story, Meta } from '@storybook/angular';
import {AngularMaterialsModule} from "../../../../../shared/angular-materials.module";
import {HttpClientModule} from "@angular/common/http";
import {CarouselMainComponent} from "./carousel-main.component";
import {CarouselModule} from "../carousel.module";

export default {
  title: 'Display Image/CarouselMainComponent',
  component: CarouselMainComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularMaterialsModule, CarouselModule],
    })
  ],
} as Meta<CarouselMainComponent>;

const Template: Story<CarouselMainComponent> = (args: CarouselMainComponent) => ({
  props: args,
  template: `
    <app-carousel-main [queryElement]="element1"></app-carousel-main>
  `
});


export const Primary = Template.bind({});

