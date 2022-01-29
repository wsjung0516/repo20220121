import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {GridModule} from "../grid.module";
import {action} from "@storybook/addon-actions";
import {ToolbarComponent} from "./toolbar.component";

export default {
  title: 'Grid/GridMenu',
  component: ToolbarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [GridModule]
    }),
  ],
} as Meta<ToolbarComponent>

const Template: Story<ToolbarComponent> = (args: ToolbarComponent) => ({
  props: {
    ...args,
  },
  template: `
    <grid-toolbar>
    </grid-toolbar>
    `
});

export const ToolbarMode = Template.bind({});
ToolbarMode.args = {
}
