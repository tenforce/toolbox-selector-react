import * as React from "react"
import bem from "../bem"
import classNames from "classnames"

import { className as parentClassName } from "./Selector"
const b = bem(parentClassName, "block")
export const className = b()

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    extraClasses?: string
    isPlaceholder?: boolean
}

export default function Block({
    children,
    isPlaceholder = false,
    extraClasses = "",
    ...attrs
}: Props): JSX.Element {
    // Add modifiers
    const modifiers = {
        "is-dimmed": isPlaceholder,
    }

    // Add bem modifiers
    const bemModifiers = {}

    // Generate fullClassName based on base className, eventual modifiers (BEM or not) and possible extra classes
    const fullClassName = classNames(b(bemModifiers), modifiers, extraClasses)

    return (
        <span className={fullClassName} data-testid="block" {...attrs}>
            {children}
        </span>
    )
}
