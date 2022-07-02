import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { reactComponse } from '../.';

const A: React.FC<any> = (props) => {
  const { children, data } = props;
  return <>
    { data }
    <div>1</div>
    {React.cloneElement<any>(children, { data })}
  </>
}

const B: React.FC<any> = (props) => {
  const { children, data } = props;
  console.log('data', data, props)
  return <>
    {data} d  1232132
    <div>b1</div>
    {React.cloneElement(children, )}
  </>
}

const B1: React.FC<any> = (props) => {
  const { children, data } = props;
  return <>
    <div>b2</div>
    data: {data}
    {React.cloneElement(children)}
  </>
}

const C: React.FC<any> = (props) => {
  const { children } = props;
  return <>
    <div>b3</div>
    {/* {React.cloneElement(children)} */}
  </>
}

class D extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render(): React.ReactNode {
    return 666666
  }
}


const App = () => {
  // const bcd = [A, B, C];
  const bdc = [A, B1, C]
  const bde = [A, B1, D]
  return (
    <div>
      {/* {reactComponse(bcd,)} */}
      {reactComponse(bdc, [{data: 1}, {data:2}])}
      {reactComponse(bde, [{data: 1}, {data:2}])}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
