import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {GridModule} from "../grid.module";
import {action} from "@storybook/addon-actions";
import {GridMenuComponent} from "./grid-menu.component";

export default {
  title: 'Grid/GridMenu',
  component: GridMenuComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [GridModule]
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'twitter',
      values: [
        { name: 'twitter', value: '#00aced' },
        { name: 'facebook', value: '#3b5998' },
      ],
    },
  },
} as Meta<GridMenuComponent>

const Template: Story<GridMenuComponent> = (args: GridMenuComponent) => ({
  props: {
    ...args,
    onSelectMode: action('selectMode')
  },
  template: `
    <grid-menu (selectMode)="onSelectMode($event)"></grid-menu>
    `
});

export const DefaultMode = Template.bind({});
DefaultMode.args = {

}
DefaultMode.parameters = {
  backgrounds: {default: 'twitter'}
}
