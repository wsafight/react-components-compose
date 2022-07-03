import React from 'react';
import { isReactComponent } from './utils';

type ReactComponentWithProperty  = [any,  Record<string, any>];

const reactComponentsCompose = (
  [first, ...rest]: (any | ReactComponentWithProperty)[],
) => {
  if (!first) {
    return null
  }

  let Component: any
  let props = {}

  if (Array.isArray(first)) {
    Component = first[0]
    props = first[1] ?? {}
  } else {
    Component = first
  }

  if (!Component) {
    return null
  }

  if (!isReactComponent(Component)) {
    return null
  }

  return (
    <Component {...props}>
      {reactComponentsCompose(rest)}
    </Component>
  )
}


export {
  reactComponentsCompose
}

export default reactComponentsCompose