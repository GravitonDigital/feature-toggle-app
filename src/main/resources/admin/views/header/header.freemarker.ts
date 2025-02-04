export type Header = {
  locale: string;
  currentAppKey: string;
  filters: Link[];
};

export type Link = {
  text: string;
  url: string;
};
