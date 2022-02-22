import {CarouselMainDisplayComponent} from "./carousel-main-display.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {HttpClientModule} from "@angular/common/http";
import {AppModule} from "../../../../app.module";
import {CarouselModule} from "../../carousel.module";

export default {
  title: 'Carousel Main/carousel-main-display',
  component: CarouselMainDisplayComponent,
  decorators: [
    moduleMetadata({
      declarations:[],
      imports: [CarouselModule]
    })
  ]
} as Meta<CarouselMainDisplayComponent>
const Template: Story<CarouselMainDisplayComponent> = (agrs:CarouselMainDisplayComponent) => ({
  props: {
    ...agrs
  },
  template: `
      <div class="w-auto h-auto">
        <carousel-main-display
          [progress]="progress"
          [splitIdx]="splitIdx"
          [img]="image"  >
        </carousel-main-display>
      </div>
  `
})
export const Default = Template.bind({});
Default.args = {
  progress: {value:50, category:'animal'},
  splitIdx: 0,
  img: 'assets/sample_images/128.png'
}
