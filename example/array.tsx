import * as React from 'react';
import { reactCompose } from '../.';

const Outer: React.FC<any> = (props) => {
  const { children, data } = props;
  return <>
    { data }
    <div>outer</div>
    {children}
  </>
}

const Middle: React.FC<any> = (props) => {
  const { children, data } = props;
  console.log('data', data, props)
  return <>
    <div>middle</div>
    {children}
    {children}
  </>
}

type bb = (props: any) => React.ReactElement[];

const Inner: any = (props) => {
  const { children, data } = props;
  return <>
  <div>inner</div>
    <div>inner2</div>
    <div>inner3</div>
  </>
}


export const ArrayShow = () => {
  const components = [Outer, Middle, Inner]
  return (
    <div>
      {reactCompose(components)}
    </div>
  );
};


