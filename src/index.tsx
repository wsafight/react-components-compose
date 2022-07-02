import React, { FC, ComponentProps } from 'react';

type reactComponent = FC<any> | (new(props?: ComponentProps<any>) => React.Component<any, any>)

const reactComponse = (
  [Component, ...components]: reactComponent[],
  [props, ...childrenProps]: ComponentProps<any>[] = []
) => {
  if (!Component) {
    return null
  }

  return (
    <Component {...props ?? {}}>
      {reactComponse(components, childrenProps ?? [])}
    </Component>
  )
}

interface ComponentWithProperty {
  component: reactComponent
  props: ComponentProps<any>
}

const reactComponseBindProps = (
  [first, ...rest]: ComponentWithProperty[],
) => {
  if (!first) {
    return null
  }

  const { component: Component, props } = first

  if (!Component) {
    return null
  }

  return (
    <Component {...props ?? {}}>
      {reactComponseBindProps(rest)}
    </Component>
  )
}


export {
  reactComponse,
  reactComponseBindProps,
}

export default reactComponse