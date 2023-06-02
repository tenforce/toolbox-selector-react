import * as React from "react"
import bem from "../bem"
import classNames from "classnames"

import { className as parentClassName } from "./Selector"
const b = bem(parentClassName, "blockPart")
export const className = b()

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    color?: string
    isLabel?: boolean
    isPlaceholder?: boolean
    extraClasses?: string
}

export default function Part({
    children,
    color,
    isLabel,
    isPlaceholder,
    extraClasses,
    ...attrs
}: Props): JSX.Element {
    // Add modifiers
    const modifiers = {}

    // Add bem modifiers
    const bemModifiers = {}

    // Generate fullClassName based on base className, eventual modifiers (BEM or not) and possible extra classes
    const fullClassName = classNames(b(bemModifiers), modifiers, extraClasses)

    const spanClasses: string[] = []
    if (isLabel) {
        spanClasses.push("label")
    }

    if (isPlaceholder) {
        spanClasses.push("is-dimmed")
    }

    return (
        <span
            className={fullClassName}
            style={{ backgroundColor: color }}
            data-has-color={!!color}
            data-testid="part"
            {...attrs}
        >
            <span className={spanClasses.join(" ")} data-testid="innerPart">
                {children}
            </span>
        </span>
    )
}
