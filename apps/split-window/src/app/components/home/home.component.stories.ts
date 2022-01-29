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
    <grid-toolbar (selectMode)="onSelectMode($event)"></grid-toolbar>
    <div class="w-screen">
      <div class="h-24">
        <div class="bg-blue-200">
          <div class="">
            <thumbnail-list [currentImages]="currentImages"
                            [selectedImage]="selectedImage"
            >
            </thumbnail-list>
          </div>
        </div>
      </div>
      <div class="h-auto ">
        <div class="mt-1">
          <!--      <app-carousel-main [queryUrl]="queryUrl"></app-carousel-main>-->
          <div class="grid grid-cols-10 gap-2">
            <div class="h-auto col-span-1 bg-blue-100">
              <h2 class="mx-3 mt-2">Category</h2>
              <series-list [currentSeries]="currentSeries"
                            [selectedSeries]="selectedSeries"
                            (selectSeries)="onSelectSeries($event)">
              </series-list>
            </div>
            <div class="h-auto col-span-9 bg-red-100">
<!--              <app-grid></app-grid>-->
            </div>
          </div>
        </div>
      </div>
    </div>
        `
})

export const Default = Template.bind({});
export const WithThumbnailList = Template.bind({});
WithThumbnailList.args = {
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
  ],
  selectedSeries: {
    seriesId: 1,
    url: '',
    blob: 'assets/sample_images/128.png',
    category: 'animal'
  },
}
