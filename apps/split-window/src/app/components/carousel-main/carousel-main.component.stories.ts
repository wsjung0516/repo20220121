import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CarouselMainComponent } from './carousel-main.component';
import {AngularMaterialsModule} from "../../../../shared/angular-materials.module";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Display Image/CarouselMainComponent',
  component: CarouselMainComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularMaterialsModule],
    })
  ],
} as Meta<CarouselMainComponent>;

const Template: Story<CarouselMainComponent> = (args: CarouselMainComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
