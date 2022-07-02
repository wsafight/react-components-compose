# react-components-compose

[![Build Status](https://www.travis-ci.org/wsafight/react-components-compose.svg?branch=main)](https://www.travis-ci.org/wsafight/react-components-compose)
[![NPM Version](https://badgen.net/npm/v/react-components-compose)](https://www.npmjs.com/package/react-components-compose)

利用 compose 组合 React 组件，方便组合和替换 React 组件。


## 安装

```bash
npm install react-components-compose
```

或者

```bash
yarn add react-components-compose
```

## 用法

### 简单的组件展示

下面将会展示 outer middle 以及 inner

```ts
import reactCompose from 'react-components-compose'

const Outer: React.FC<any> = (props) => {
  // children​ 指向的是当前 ​react element​ 的子节点
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
  // 可以随意的替换 middle
  const components = [Outer, Middle, Inner]
  return (
    <div>
      {reactCompose(components)}
    </div>
  );
};
```

### 调整 props

```ts
import { reactCompose } from 'react-components-compose';

const Outer: React.FC<any> = (props) => {
  const { children, data } = props;
  // 展示 outer 123
  return <>
    <div>outer {data}</div>
    {children}
  </>
}

const Middle: React.FC<any> = (props) => {
  const { children } = props;
   // 通过 cloneElement 传入 额外的 props
  return <>
    <div>middle</div>
    { React.cloneElement(children, { data: 789 }) }
  </>
}

const Inner: React.FC<any> = (props) => {
  const { data } = props;
  // 获取的 data 为 789，展示 inner 789
  return <>
    <div>inner {data}</div>
  </>
}


export const SimpleShowWithProps = () => {
  const components = [Outer, Middle, Inner]
  return (
    <div>
      {reactCompose(components, [
        // 依次传递组件的props
        {data: 123}, 
        null, 
        {data: 456}])}
    </div>
  );
};
```

## 添加事件通知

```ts
import { reactCompose, reactComposeBindProps } from 'react-components-compose'
import mitt from 'mitt';

// 没有其他功能，负责事件清除
const EventClear = (props) => {
    const { children, bus } = props;

    // 用于清除 bus 中数据
    React.useEffect(() => {
        return () => {
            bus.all.clear();
        }
    }, [])

    return <>
        {React.cloneElement(children, { bus })}
    </>
}

class OuterClass extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            time: 0
        }
    }
    handleClick = () => {
        // 触发 out click，参数为 123
        this.props.bus.emit('out click', 123)
    }
    render(): React.ReactNode {
        const { data, bus, children } = this.props;
        return <>
            {data}
            <div onClick={this.handleClick}>outer</div>
            // 通过 cloneElement 为子组件传递 bus 以及其他参数。
            {React.cloneElement(children as React.ReactElement, { bus })}
        </>
    }
}

const Inner = (props) => {
    const { data, bus } = props;
    const [time, setTime] = React.useState(0)
    React.useEffect(() => {
        // * 表示监听所有事件，type 为事件名称，params 为事件值
        bus.on('*', (type, params) => {
            console.log(type, params)
            alert(params)
        })
    }, [])

    const handleClick = () => {
        setTime(time + 1);
    }

    return [
        <div>{time} {data}</div>,
        <div onClick={handleClick}>inner</div>,
        <div>inner2</div>,
        <div>inner3</div>,
    ]
}


export const ArrayShowWithEvent1 = () => {
    const components = [EventClear, OuterClass, Inner]
    return (
        <div>
            {reactCompose(components, [{ bus: mitt() }, null, { data: 'times' }])}
        </div>
    );
};

// 等同于
export const ArrayShowWithEvent2 = () => {
    const components = [
      [EventClear, { bus: mitt() }], 
      [OuterClass],
      [Inner, { data: 'times' }]
    ]
    return (
        <div>
            {reactComposeBindProps(components)}
        </div>
    );
};

// 考虑不清除 mitt 处理，针对组件来说，就有了“全局”的变量
export const ArrayShowWithEvent3 = () => {
    const bus = mitt();

    // 可以在此处编写清除 mitt 事件绑定

    const components = [ 
      [OuterClass, { bus }],
      [Inner, { data: 'times', bus }]
    ]
    return (
        <div>
            {reactComposeBindProps(components)}
        </div>
    );
};
```
