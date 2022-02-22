import { moduleMetadata, Story, Meta } from '@storybook/angular';
import {AngularMaterialsModule} from "../../../../../shared/angular-materials.module";
import {HttpClientModule} from "@angular/common/http";
import {CarouselMainComponent} from "./carousel-main.component";
import {CarouselModule} from "../carousel.module";
// @ts-ignore
import markdownNotes from "../../../../assets/md/grid.md";

export default {
  title: 'Carousel Main/carousel-main',
  component: CarouselMainComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularMaterialsModule, CarouselModule],
    })
  ],
  parameters: {
    notes: 'some document AAAAAAAAAAAAxxxxxx'
    // notes: {markdownNotes}
  }
} as Meta<CarouselMainComponent>;

const Template: Story<CarouselMainComponent> = (args: CarouselMainComponent) => ({
  props: args,
  template: `
    <app-carousel-main [queryElement]="queryElement"></app-carousel-main>
  `,

});


export const Primary = Template.bind({});
Primary.args = {
  queryElement: 'element1',

}

