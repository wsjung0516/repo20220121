import {ThumbnailItemComponent} from "../thumbnail-item/thumbnail-item.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {ThumbnailModule} from "../thumbnail.module";
import {NgxsModule, StateStream, Store} from "@ngxs/store";
import {StatusState} from "../../../../state/status/status.state";
import {InternalStateOperations} from "@ngxs/store/src/internal/state-operations";
import {userEvent} from "@storybook/testing-library";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";
import {action} from "@storybook/addon-actions";
import {ThumbnailListComponent} from "./thumbnail-list.component";

export default {
  title: 'Thumbnail/ThumbnailListComponent',
  component: ThumbnailListComponent,
  decorators: [
    moduleMetadata({
      imports: [ThumbnailModule,
       ],
    })
  ]
} as Meta<ThumbnailListComponent>;

const Template: Story<ThumbnailListComponent> = (args) => ({
  props: {
    ...args,
    onSelected: action('selected')
  },
  template: `
    <thumbnail-list [selectedImage]="selectedImage" [currentImages]="currentImages" (selected)="onSelected($event)"></thumbnail-list>
  `
});
export const Default = Template.bind({});
Default.args = {
  currentImages: [
    {
      imageId: 1,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/100.jpg',
      title: ''
    },
    {
      imageId: 2,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/101.jpg',
      title: ''
    },
    {
      imageId: 3,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/102.jpg',
      title: ''
    },
    {
      imageId: 4,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/103.jpg',
      title: ''
    },
    {
      imageId: 5,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/104.jpg',
      title: ''
    },
  ],
  selectedImage: {
    imageId: 2,
    category: 'animal',
    url: '',
    blob: 'assets/sample_images/101.jpg',
    title: ''
  },

}
const images = [
    {
      imageId: 1,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/100.jpg',
      title: ''
    },
    {
      imageId: 2,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/101.jpg',
      title: ''
    },
    {
      imageId: 3,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/102.jpg',
      title: ''
    },
    {
      imageId: 4,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/103.jpg',
      title: ''
    },
    {
      imageId: 5,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/104.jpg',
      title: ''
    },
    {
      imageId: 6,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/105.jpg',
      title: ''
    },
    {
      imageId: 7,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/106.jpg',
      title: ''
    },
    {
      imageId: 8,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/107.jpg',
      title: ''
    },
    {
      imageId: 9,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/108.jpg',
      title: ''
    },
    {
      imageId: 10,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/109.jpg',
      title: ''
    },
    {
      imageId: 11,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/110.jpg',
      title: ''
    },
    {
      imageId: 12,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/111.jpg',
      title: ''
    },
    {
      imageId: 13,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/112.jpg',
      title: ''
    },
    {
      imageId: 14,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/113.jpg',
      title: ''
    },
    {
      imageId: 15,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/114.jpg',
      title: ''
    },
    {
      imageId: 16,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/115.jpg',
      title: ''
    },
    {
      imageId: 17,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/116.png',
      title: ''
    },
    {
      imageId: 18,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/117.jpg',
      title: ''
    },
    {
      imageId: 19,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/118.jpg',
      title: ''
    },
    {
      imageId: 20,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/119.jpeg',
      title: ''
    },
    {
      imageId: 21,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/120.jpeg',
      title: ''
    },
    {
      imageId: 22,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/121.jpeg',
      title: ''
    },
    {
      imageId: 23,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/122.jpg',
      title: ''
    },
    {
      imageId: 24,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/123.jpg',
      title: ''
    },
    {
      imageId: 25,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/124.jpg',
      title: ''
    },
    {
      imageId: 26,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/125.png',
      title: ''
    },
    {
      imageId: 27,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/126.jpg',
      title: ''
    },
    {
      imageId: 28,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/127.jpg',
      title: ''
    },
    {
      imageId: 29,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/128.png',
      title: ''
    },
  ];

export const ThumbnailList = Template.bind({});
ThumbnailList.args = {
  selectedImage: {
    imageId: 5,
    category: 'animal',
    url: '',
    blob: 'assets/sample_images/104.jpg',
    title: ''
  },
  currentImages: images
}
export const SelectThumbnail_15 = Template.bind({});
SelectThumbnail_15.args = {
  selectedImage: {
    imageId: 15,
    category: 'animal',
    url: '',
    blob: 'assets/sample_images/114.jpg',
    title: ''
  },
  currentImages: images
}
