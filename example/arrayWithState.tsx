import * as React from 'react';
import { reactComponentsCompose } from '../.';

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
    {React.cloneElement(children)}
    {children}
    {children}
  </>
}

// TODO
// const Inner = (props) => {
//   const { data } = props;

//   const [time, setTime] = React.useState(0)

//   const handleClick = () => {
//     setTime(time + 1);
//   }

//   return [
//     <div>{time} {data}</div>,
//     <div onClick={handleClick}>inner</div>,
//     <div>inner2</div>,
//     <div>inner3</div>,
//   ]
// }

const Inner: React.FC<any> = (props) => {
  const { data } = props;

  const [time, setTime] = React.useState(0)

  const handleClick = () => {
    setTime(time + 1);
  }

  return <>
    <div>{time} {data}</div>
    <div onClick={handleClick}>inner</div>
    <div>inner2</div>
    <div>inner3</div>
    </>
}



export const ArrayShowWithState = () => {
  const components = [Outer, Middle, [Inner, {data: 'times'}]]
  return (
    <div>
      {reactComponentsCompose(components)}
    </div>
  );
};


