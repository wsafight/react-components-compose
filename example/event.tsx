import * as React from 'react';
import { reactComponentsCompose } from '../.';
import mitt from 'mitt';

const Event = (props) => {
    const { children, bus } = props;

    React.useEffect(() => {
        return () => {
            bus.all.clear();
        }
    }, [])

    return <>
        {React.cloneElement(children, { bus })}
    </>
}


const Outer: React.FC<any> = (props) => {
    const { children, data, bus } = props;

    const handleClick = () => {
        bus.emit('click', 123)
    }

    return <>
        {data}
        <div onClick={handleClick}>outer</div>
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
        this.props.bus.emit('sss', 123)
    }
    render(): React.ReactNode {
        const { data, bus, children } = this.props;
        return <>
            {data}
            <div onClick={this.handleClick}>outer</div>
            {React.cloneElement(children as React.ReactElement, { bus })}
        </>
    }
}

const Inner = (props) => {
    const { data, bus } = props;

    const [time, setTime] = React.useState(0)


    React.useEffect(() => {
        console.log('bus', bus);
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


// export const ArrayShowWithEvent = () => {
//     const components = [Event, OuterClass, Inner]
//     return (
//         <div>
//             {reactCompose(components, [{bus: mitt()}, null, { data: 'times' }])}
//         </div>
//     );
// };


// export const ArrayShowWithEvent = () => {
//     const components = [
//       [Event, { bus: mitt() }], 
//       [OuterClass],
//       [Inner, { data: 'times' }]
//     ]
//     return (
//         <div>
//             {reactComposeBindProps(components)}
//         </div>
//     );
// };


export const ArrayShowWithEvent = () => {
    const bus = mitt();
    const components = [ 
        [OuterClass, {bus}],
      [Inner, { data: 'times', bus }]
    ]
    return (
        <div>
            {reactComponentsCompose(components)}
        </div>
    );
};
