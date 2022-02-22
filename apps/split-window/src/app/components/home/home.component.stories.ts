import {HomeComponent} from "./home.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {HomeModule} from "./home.module";
import {ThumbnailModule} from "../thumbnail/thumbnail.module";
import {SeriesModule} from "../series/series.module";
import {action} from "@storybook/addon-actions";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Home',
  component: HomeComponent,
  decorators:[
    moduleMetadata({
      declarations: [],
      imports: [HomeModule,
        ThumbnailModule,
        SeriesModule,
        HttpClientModule
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
    { item: {
      imageId: 1,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/100.jpg',
      title: ''
    }},
    { item: {
      imageId: 2,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/101.jpg',
      title: ''
    }},
    { item: {
      imageId: 3,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/102.jpg',
      title: ''
    }},
    { item: {
      imageId: 4,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/103.jpg',
      title: ''
    }},
    { item: {
      imageId: 5,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/104.jpg',
      title: ''
    }},
  ],
  selectedImage: {
    item: {
      imageId: 1,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/101.jpg',
      title: ''
    }
  },
  currentSeries: {
    series: [
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
        category: ''
      },
      {
        seriesId: 3,
        url: '',
        blob: 'assets/sample_images/102.jpg',
        category: ''
      },
      {
        seriesId: 4,
        url: '',
        blob: 'assets/sample_images/103.jpg',
        category: ''
      },
      {
        seriesId: 5,
        url: '',
        blob: 'assets/sample_images/104.jpg',
        category: ''
      },
      {
        seriesId: 6,
        url: '',
        blob: 'assets/sample_images/105.jpg',
        category: ''
      },
      {
        seriesId: 7,
        url: '',
        blob: 'assets/sample_images/106.jpg',
        category: ''
      },
    ]
  },
  selectedSeries: {
    series: {
      seriesId: 0,
      url: '',
      blob: 'assets/sample_images/128.png',
      category: 'animal'
    }
  },
}
