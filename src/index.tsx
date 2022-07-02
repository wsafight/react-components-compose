import React, {
  FC,
  ComponentProps,
  Component,
} from 'react';

type ReactComposeComponentType =
  FC<any> |
  (new (props?: ComponentProps<any>) => Component<any, any>)

const reactCompose = (
  [Component, ...components]: ReactComposeComponentType[],
  [props, ...childrenProps]: ComponentProps<any>[] = []
) => {
  if (!Component) {
    return null
  }

  return (
    <Component {...props ?? {}}>
      {reactCompose(components, childrenProps ?? [])}
    </Component>
  )
}

type ComponentWithProperty  = [ReactComposeComponentType,  ComponentProps<any>];

const reactComposeBindProps = (
  [first, ...rest]: ComponentWithProperty[],
) => {
  if (!first) {
    return null
  }

  const [Component, props] = first

  if (!Component) {
    return null
  }

  return (
    <Component {...props ?? {}}>
      {reactComposeBindProps(rest)}
    </Component>
  )
}


export {
  reactCompose,
  reactComposeBindProps
}

export default reactCompose