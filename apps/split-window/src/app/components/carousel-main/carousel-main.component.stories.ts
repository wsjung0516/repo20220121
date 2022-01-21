import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CarouselMainComponent } from './carousel-main.component';
import {AngularMaterials} from "../../../../shared/angular-materials";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Display Image/CarouselMainComponent',
  component: CarouselMainComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularMaterials],
    })
  ],
} as Meta<CarouselMainComponent>;

const Template: Story<CarouselMainComponent> = (args: CarouselMainComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
