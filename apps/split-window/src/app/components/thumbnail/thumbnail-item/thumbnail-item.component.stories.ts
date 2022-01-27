import {ThumbnailItemComponent} from "./thumbnail-item.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {ThumbnailModule} from "../thumbnail.module";
import {NgxsModule, StateStream, Store} from "@ngxs/store";
import {StatusState} from "../../../../state/status/status.state";
import {InternalStateOperations} from "@ngxs/store/src/internal/state-operations";
import {userEvent} from "@storybook/testing-library";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Thumbnail/ThumbnailItemComponent',
  component: ThumbnailItemComponent,
  decorators: [
    moduleMetadata({
      imports: [ThumbnailModule,
       ],
    })
  ]
} as Meta<ThumbnailItemComponent>;

const Template: Story<ThumbnailItemComponent> = (args) => ({
  props: {
    ...args,
    onSelected: action('selected')
  },
  template: `
    <thumbnail-item [addClass]="addClass"
                    [originalImage]="originalImage"
                    (selected)="onSelected($event)">
    </thumbnail-item>
  `
});
export const Default = Template.bind({});
Default.args = {
  originalImage: {
    imageId: 0,
    category: 'animal',
    url: '',
    blob: 'assets/sample_images/128.png',
    title: ''
  },
}
export const SelectedItem = Template.bind({});
SelectedItem.args = {
  originalImage: {
    imageId: 1,
    category: 'animal',
    url: '',
    blob: 'assets/sample_images/128.png',
    title: ''
  },
  addClass: 'aa'
}
