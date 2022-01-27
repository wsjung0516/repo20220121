import {DisplayGridComponent} from "./display-grid.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {GridModule} from "../grid.module";
import {action} from "@storybook/addon-actions";
import {CommonModule} from "@angular/common";

export default {
  title: 'Grid/DisplayGrid',
  component: DisplayGridComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [GridModule]
    }),
  ]
} as Meta<DisplayGridComponent>

const Template: Story<DisplayGridComponent> = (args: DisplayGridComponent) => ({
  props: {
    ...args,
    onSelectedTemplate: action('onSelectTemplate')
  },
  template: `
    <div class="text-red-600">Display Grid</div>
    <display-grid [splitMode]="splitMode"
        (onSelectTemplate)="onSelectedTemplate($event)">
    </display-grid>
    `
});

export const DefaultMode = Template.bind({});
  DefaultMode.args = {
    splitMode: 1,
  }
export const SplitMode_2 = Template.bind({});
  SplitMode_2.args = {
    splitMode: 2,
  }
export const SplitMode_3 = Template.bind({});
  SplitMode_3.args = {
    splitMode: 3,
  }
export const SplitMode_4 = Template.bind({});
  SplitMode_4.args = {
    splitMode: 4,
  }
