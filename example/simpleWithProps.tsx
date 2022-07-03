import * as React from 'react';
import { reactComponentsCompose } from '../.';

const Outer: React.FC<any> = (props) => {
  const { children, data } = props;
  return <>
    <div>outer {data}</div>
    {children}
  </>
}

const Middle: React.FC<any> = (props) => {
  const { children, data } = props;
  console.log('data', data, props)
  return <>
    <div>middle {data}</div>
    {children}
  </>
}

const Inner: React.FC<any> = (props) => {
  const { data } = props;
  return <>
    <div>inner {data}</div>
  </>
}


export const SimpleShowWithProps = () => {
  const components = [[Outer, {data: 123}], Middle, Inner]
  return (
    <div>
      {reactComponentsCompose(components)}
    </div>
  );
};


