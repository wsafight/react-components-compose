import * as React from 'react';
import { reactCompose } from '../.';

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
  const components = [Outer, Middle, Inner]
  return (
    <div>
      {reactCompose(components, [{data: 123}, null, {data: 456}])}
    </div>
  );
};


