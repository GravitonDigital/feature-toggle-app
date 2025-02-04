export type Header = {
  locale: string;
  spaceKey: string;
  filters: Link[];
};

export type Link = {
  text: string;
  url: string;
};
