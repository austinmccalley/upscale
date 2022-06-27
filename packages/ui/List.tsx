import { createElement } from 'react';

export interface ListProp {
  children: React.ReactNode;
  className?: string;
}

const List = (prop: ListProp): JSX.Element =>
  createElement('li', { ...prop }, prop.children);

export { List };
