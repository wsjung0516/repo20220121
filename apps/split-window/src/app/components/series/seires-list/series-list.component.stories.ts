import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {action} from "@storybook/addon-actions";
import {SeriesListComponent} from "./series-list.component";
import {SeriesModule} from "../series.module";

export default {
  title: 'Series/SeriesListComponent',
  component: SeriesListComponent,
  decorators: [
    moduleMetadata({
      imports: [SeriesModule,
       ],
    })
  ]
} as Meta<SeriesListComponent>;

const Template: Story<SeriesListComponent> = (args) => ({
  props: {
    ...args,
    onSelected: action('selectSeries')
  },
  template: `
    <div class="w-36">
      <series-list [selectedSeries]="selectedSeries"
                  [currentSeries]="currentSeries"
                  (selectSeries)="onSelected($event)">
      </series-list>
    </div>
  `
});
export const Default = Template.bind({});
Default.args = {
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
    seriesId: 0,
    url: '',
    blob: 'assets/sample_images/128.png',
    category: 'animal'
  },

}

export const SeriesList = Template.bind({});
SeriesList.args = {
  selectedSeries: {
    seriesId: 2,
    url: '',
    blob: 'assets/sample_images/101.jpg',
    category: 'animal'
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
  ]
}
export const SelectSeries_3 = Template.bind({});
SelectSeries_3.args = {
  selectedSeries: {
    seriesId: 3,
    url: '',
    blob: 'assets/sample_images/102.jpg',
    category: 'animal'
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
  ]
}
