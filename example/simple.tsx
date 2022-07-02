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
  </>
}

const Inner: React.FC<any> = (props) => {
  const { children, data } = props;
  return <>
    <div>inner</div>
  </>
}


export const SimpleShow = () => {
  const components = [Outer, Middle, Inner]
  return (
    <div>
      {reactCompose(components)}
    </div>
  );
};


