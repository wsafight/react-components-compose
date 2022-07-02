import * as React from 'react';
import { reactCompose } from '../.';

const Outer: React.FC<any> = (props) => {
  const { children, data } = props;
  return <>
    <div>outer {data}</div>
    {
        React.cloneElement<MiddleProps>(children, { data })
    }
  </>
}

interface MiddleProps {
    data?: string;
    children: React.ReactElement
}

const Middle: React.FC<MiddleProps> = (props) => {
  const { children, data } = props;
  return <>
    <div>middle {data}</div>
    {React.cloneElement(children)}
  </>
}

const Inner: React.FC<any> = (props) => {
  const { data } = props;
  return <>
    <div>inner {data}</div>
  </>
}


export const SimpleShowWithCloneElement = () => {
  const components = [Outer, Middle, Inner]
  return (
    <div>
      {reactCompose(components, [{data: 123}, null, {data: 456}])}
    </div>
  );
};


