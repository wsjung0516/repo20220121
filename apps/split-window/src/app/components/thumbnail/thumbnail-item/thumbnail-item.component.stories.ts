import {ThumbnailItemComponent} from "./thumbnail-item.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {ThumbnailModule} from "../thumbnail.module";
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
    <div class="w-24">
      <thumbnail-item [addClass]="addClass"
                      [originalImage]="originalImage"
                      (selected)="onSelected($event)">
      </thumbnail-item>
    </div>
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
const initial_value = {
  imageId: 1,
  category: 'animal',
  url: '',
  blob: 'assets/sample_images/128.png',
  title: ''
}
function initialize () {
  localStorage.setItem('selectedImageId', JSON.stringify(initial_value));
}
Default.play = async () => {
  await initialize();
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
