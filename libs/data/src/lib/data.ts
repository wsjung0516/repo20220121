export function data(): string {
  return 'data';
}
export interface ImageModel {
  imageId: number,
  category: string,
  url: string,
  blob: any,
  title: string
}
export interface SeriesModel {
  seriesId: number;
  url: string;
  blob: string;
  category: string
}
