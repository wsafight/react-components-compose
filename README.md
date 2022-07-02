# react-components-compose

Read this in other languages: [简体中文](https://github.com/wsafight/react-components-compose/blob/main/README.zh-CN.md)

[![Build Status](https://www.travis-ci.org/wsafight/react-components-compose.svg?branch=main)](https://www.travis-ci.org/wsafight/react-components-compose)
[![NPM Version](https://badgen.net/npm/v/react-components-compose)](https://www.npmjs.com/package/react-components-compose)

Use compose to combine React components, which is convenient to combine and
replace React components.

## Installation

```bash
npm install react-components-compose
```

or

```bash
yarn add react-components-compose
```

## Usage

### Simple component display

The outer middle and inner will be shown below

```jsx
import reactCompose from 'react-components-compose'

const Outer = (props) => {
  // children​ points to the child nodes of the current ​react element​
  const { children } = props;
  return <>
    <div>outer</div>
    {children}
  </>
}

const Middle: React.FC<any> = (props) => {
  const { children } = props;
  return <>
    <div>middle</div>
    {children}
  </>
}

const Inner: React.FC<any> = (props) => {
  const { children } = props;
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
```

### Adjust props

```jsx
import { reactCompose } from "react-components-compose";

const Outer = (props) => {
  const { children, data } = props;
  // show outer 123
  return (
    <>
      <div>outer {data}</div>
      {children}
    </>
  );
};

const Middle = (props) => {
  const { children } = props;
  // Pass in additional props via cloneElement
  return (
    <>
      <div>middle</div>
      {React.cloneElement(children, { data: 789 })}
    </>
  );
};

const Inner = (props) => {
  const { data } = props;
  // The obtained data is 789, showing inner 789
  return (
    <>
      <div>inner {data}</div>
    </>
  );
};

export const SimpleShowWithProps = () => {
  const components = [Outer, Middle, Inner];
  return (
    <div>
      {reactCompose(components, [
        // Pass component props in turn
        { data: 123 },
        null,
        { data: 456 },
      ])}
    </div>
  );
};
```

## Add event notification

```ts
import { reactCompose, reactComposeBindProps } from "react-components-compose";
import mitt from "mitt";

// No other functions, only responsible for event clearing
const EventClear = (props) => {
  const { children, bus } = props;

  // Used to clear the data in the bus
  React.useEffect(() => {
    return () => {
      bus.all.clear();
    };
  }, []);

  return (
    <>
      {React.cloneElement(children, { bus })}
    </>
  );
};

class OuterClass extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
  }
  handleClick = () => {
    // Trigger out click with parameter 123
    this.props.bus.emit("out click", 123);
  };
  render(): React.ReactNode {
    const { data, bus, children } = this.props;
    return (
      <>
        {data}
        <div onClick={this.handleClick}>outer</div>
        {React.cloneElement(children as React.ReactElement, { bus })}
      </>
    );
  }
}

const Inner = (props) => {
  const { data, bus } = props;
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    // * means to listen to all events, type is the event name, params is the event value
    bus.on("*", (type, params) => {
      console.log(type, params);
      alert(params);
    });
  }, []);

  const handleClick = () => {
    setTime(time + 1);
  };

  return [
    <div>{time} {data}</div>,
    <div onClick={handleClick}>inner</div>,
    <div>inner2</div>,
    <div>inner3</div>,
  ];
};

export const ArrayShowWithEvent1 = () => {
  const components = [EventClear, OuterClass, Inner];
  return (
    <div>
      {reactCompose(components, [{ bus: mitt() }, null, { data: "times" }])}
    </div>
  );
};

// Equivalent to
export const ArrayShowWithEvent2 = () => {
  const components = [
    [EventClear, { bus: mitt() }],
    [OuterClass],
    [Inner, { data: "times" }],
  ];
  return (
    <div>
      {reactComposeBindProps(components)}
    </div>
  );
};

// Consider not clearing mitt processing, for components, there are "global" variables
export const ArrayShowWithEvent3 = () => {
  const bus = mitt();

  // Clear mitt event binding can be written here

  const components = [
    [OuterClass, { bus }],
    [Inner, { data: "times", bus }],
  ];
  return (
    <div>
      {reactComposeBindProps(components)}
    </div>
  );
};
```
