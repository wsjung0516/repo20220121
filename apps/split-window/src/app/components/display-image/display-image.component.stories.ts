import { moduleMetadata, Story, Meta } from '@storybook/angular';
import {AngularMaterials} from "../../../../shared/angular-materials";
import {DisplayImageComponent} from "./display-image.component";

export default {
  title: 'Display Image/DisplayImageComponent',
  component: DisplayImageComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularMaterials],
    })
  ],
} as Meta<DisplayImageComponent>;

const Template: Story<DisplayImageComponent> = (args: DisplayImageComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  progress:  20,
  imageSrc: 'assets/images/images-1.jpg',
}
export const Secondary = Template.bind({});
Secondary.args = {
  progress:  60,
  imageSrc: 'assets/images/images-3.jpg'
}
