import {HomeComponent} from "./home.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {HomeModule} from "./home.module";
import {ThumbnailModule} from "../thumbnail/thumbnail.module";
import {SeriesModule} from "../series/series.module";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Home',
  component: HomeComponent,
  decorators:[
    moduleMetadata({
      declarations: [],
      imports: [HomeModule,
        ThumbnailModule,
        SeriesModule
      ]
    })
  ]
} as Meta<HomeComponent>

const Template: Story<HomeComponent> = (args) => ({
  props: {
    ...args,
    onSelectMode: action('selectMode'),
    onSelectSeries: action('selectSeries')
  },
  template: `
  <home></home>
        `
})

export const Default = Template.bind({});
export const WithThumbnailList = Template.bind({});
WithThumbnailList.args = {
  splitMode: 4,
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
  currentSeries: [
    {
      seriesId: 1,
      url: '',
      blob: 'assets/sample_images/100.jpg',
      category: 'animal'
    },
    {
      seriesId: 2,
      url: '',
      blob: 'assets/sample_images/101.jpg',
      category: 'animal'
    },
    {
      seriesId: 3,
      url: '',
      blob: 'assets/sample_images/102.jpg',
      category: 'animal'
    },
    {
      seriesId: 4,
      url: '',
      blob: 'assets/sample_images/103.jpg',
      category: 'animal'
    },
    {
      seriesId: 5,
      url: '',
      blob: 'assets/sample_images/104.jpg',
      category: 'animal'
    },
    {
      seriesId: 6,
      url: '',
      blob: 'assets/sample_images/105.jpg',
      category: 'animal'
    },
    {
      seriesId: 7,
      url: '',
      blob: 'assets/sample_images/106.jpg',
      category: 'animal'
    },
  ],
  selectedSeries: {
    seriesId: 1,
    url: '',
    blob: 'assets/sample_images/128.png',
    category: 'animal'
  },
}
