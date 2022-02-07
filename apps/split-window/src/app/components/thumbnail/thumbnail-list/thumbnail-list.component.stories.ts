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
import {SelectedItem} from "../thumbnail-item/thumbnail-item.component.stories";

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
    { item: {
        imageId: 1,
        category: 'animal',
        url: '',
        blob: 'assets/sample_images/100.jpg',
        title: ''
      }
    },
    { item: {
      imageId: 2,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/101.jpg',
      title: ''
      }
    },
    {
      item: {
        imageId: 3,
        category: 'animal',
        url: '',
        blob: 'assets/sample_images/102.jpg',
        title: ''
      }
    },
    {
      item: {
        imageId: 4,
        category: 'animal',
        url: '',
        blob: 'assets/sample_images/103.jpg',
        title: ''
      }
    },
    { item: {
      imageId: 5,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/104.jpg',
      title: ''
      }
    },
  ]
}
const images = [
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
    { item: {
      imageId: 6,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/105.jpg',
      title: ''
    }},
    { item: {
      imageId: 7,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/106.jpg',
      title: ''
    }},
    { item: {
      imageId: 8,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/107.jpg',
      title: ''
    }},
    { item: {
      imageId: 9,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/108.jpg',
      title: ''
    }},
    { item: {
      imageId: 10,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/109.jpg',
      title: ''
    }},
    { item: {
      imageId: 11,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/110.jpg',
      title: ''
    }},
    { item: {
      imageId: 12,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/111.jpg',
      title: ''
    }},
    { item: {
      imageId: 13,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/112.jpg',
      title: ''
    }},
    { item: {
      imageId: 14,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/113.jpg',
      title: ''
    }},
    { item: {
      imageId: 15,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/114.jpg',
      title: ''
    }},
    { item: {
      imageId: 16,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/115.jpg',
      title: ''
    }},
    { item: {
      imageId: 17,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/116.png',
      title: ''
    }},
    { item: {
      imageId: 18,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/117.jpg',
      title: ''
    }},
    { item: {
      imageId: 19,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/118.jpg',
      title: ''
    }},
    { item: {
      imageId: 20,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/119.jpeg',
      title: ''
    }},
    { item: {
      imageId: 21,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/120.jpeg',
      title: ''
    }},
    { item: {
      imageId: 22,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/121.jpeg',
      title: ''
    }},
    { item: {
      imageId: 23,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/122.jpg',
      title: ''
    }},
    { item: {
      imageId: 24,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/123.jpg',
      title: ''
    }},
    { item: {
      imageId: 25,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/124.jpg',
      title: ''
    }},
    { item: {
      imageId: 26,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/125.png',
      title: ''
    }},
    { item: {
      imageId: 27,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/126.jpg',
      title: ''
    }},
    { item: {
      imageId: 28,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/127.jpg',
      title: ''
    }},
    { item: {
      imageId: 29,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/128.png',
      title: ''
    }},
  ];

export const ThumbnailList = Template.bind({});
ThumbnailList.args = {
/*
  selectedImage: {
    item2: {
      imageId: 4,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/104.jpg',
      title: ''
    }
  },
*/
  currentImages: images
}
const initial_value = {
  item: {
    imageId: 3,
    category: 'animal',
    url: '',
    blob: 'assets/sample_images/128.png',
    title: ''
  }
}
function initialize () {
  localStorage.setItem('selectedImageId', JSON.stringify(initial_value));
}

ThumbnailList.play = async () => {
   await initialize();
}


