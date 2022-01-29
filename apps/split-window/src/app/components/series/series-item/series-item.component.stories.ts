import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {action} from "@storybook/addon-actions";
import {SeriesItemComponent} from "./series-item.component";
import {SeriesModule} from "../series.module";

export default {
  title: 'Series/SeriesItemComponent',
  component: SeriesItemComponent,
  decorators: [
    moduleMetadata({
      imports: [SeriesModule,
       ],
    })
  ]
} as Meta<SeriesItemComponent>;

const Template: Story<SeriesItemComponent> = (args) => ({
  props: {
    ...args,
    onSelected: action('selected')
  },
  template: `
    <series-item [addClass]="addClass"
                    [seriesImage]="seriesImage"
                    (selected)="onSelected($event)">
    </series-item>
  `
});
export const Default = Template.bind({});
Default.args = {
  seriesImage: {
    seriesId: 0,
    url: '',
    blob: 'assets/sample_images/128.png',
    category: 'animal'
  },
}
const initial_value = {
  seriesId: 1,
  url: '',
  blob: 'assets/sample_images/128.png',
  category: 'animal'
}
function initialize () {
  localStorage.setItem('selectedSeriesId', JSON.stringify(initial_value));
}
Default.play = async () => {
  await initialize();
}
export const SelectedSeries = Template.bind({});
SelectedSeries.args = {
  seriesImage: {
    seriesId: 1,
    url: '',
    blob: 'assets/sample_images/128.png',
    category: 'animal'
  },
  addClass: 'aa'
}
