import { Component } from "react"

export const isReactComponent = (component: any): boolean => {
    if (!component) {
        return false
    }
    const proto = Object.getPrototypeOf(component)
    // TODO
    if (proto === Component || proto === Function.prototype) {
        return true
    }
    return isReactComponent(proto)
}