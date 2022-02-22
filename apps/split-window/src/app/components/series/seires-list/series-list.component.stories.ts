import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {action} from "@storybook/addon-actions";
import {SeriesListComponent} from "./series-list.component";
import {SeriesModule} from "../series.module";
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {StatusState} from "../../../../state/status/status.state";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";

export default {
  title: 'Series/SeriesListComponent',
  component: SeriesListComponent,
  decorators: [
    moduleMetadata({
      imports: [SeriesModule, HttpClientModule,
        NgxsModule.forRoot(),
        NgxsModule.forFeature([StatusState]),
        NgxsSelectSnapshotModule
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
  currentSeries: {
    series: [
      {
        seriesId: 1,
        url: '',
        blob: 'assets/sample_images/100.jpg',
        category: ''
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

export const SeriesList = Template.bind({});
SeriesList.args = {
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
        category: 'house'
      },
      {
        seriesId: 3,
        url: '',
        blob: 'assets/sample_images/102.jpg',
        category: 'baby'
      },
      {
        seriesId: 4,
        url: '',
        blob: 'assets/sample_images/103.jpg',
        category: 'forest'
      },
      {
        seriesId: 5,
        url: '',
        blob: 'assets/sample_images/104.jpg',
        category: 'happiness'
      },
      {
        seriesId: 6,
        url: '',
        blob: 'assets/sample_images/105.jpg',
        category: 'sea'
      },
      {
        seriesId: 7,
        url: '',
        blob: 'assets/sample_images/106.jpg',
        category: 'love'
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
