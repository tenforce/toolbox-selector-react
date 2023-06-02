import * as React from "react"
import bem from "../bem"
import classNames from "classnames"

import { className as parentName } from "./Selector"
const b = bem(parentName, "item")
const bInput = bem(parentName, "input")
export const className = b()

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    checkboxName?: string
    tabIndex?: number
    isDeactivated?: boolean
    isDisabled?: boolean
    isLocked?: boolean
    isPlaceholder?: boolean
    isReadOnly?: boolean
    isSelected?: boolean
    onSelected?: (event: React.MouseEvent<HTMLDivElement>) => void
    onUnselected?: (event: React.MouseEvent<HTMLDivElement>) => void
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
    onFocus?: () => void
    onBlur?: () => void
    extraClasses?: string
}

export default function Item({
    // onSelected and onUnselected should be extracted here so they arent passes with the attributes.
    checkboxName,
    tabIndex,
    onClick,
    onFocus,
    onBlur,
    onSelected,
    onUnselected,
    isDeactivated = false,
    isDisabled = false,
    isLocked = false,
    isPlaceholder = false,
    isReadOnly = false,
    isSelected = false,
    extraClasses = "",
    children,
    ...attrs
}: Props): JSX.Element {
    // in read only or deactivated mode only show selected items
    if ((isReadOnly || isDeactivated) && !isSelected) {
        return <></>
    }

    // Add modifiers
    const modifiers = {
        "is-disabled": isDisabled,
        "is-dimmed": isPlaceholder,
    }
    // Add bem modifiers
    const bemModifiers = { selected: isSelected }

    // Generate fullClassName based on base className, eventual modifiers (BEM or not) and possible extra classes
    const fullClassName = classNames(b(bemModifiers), modifiers, extraClasses)

    const ref = React.useRef<HTMLInputElement>(null)

    const moveToNode = function (nextNode: Node | null): void {
        if (nextNode instanceof HTMLElement) {
            const nextBox = nextNode.getElementsByClassName(
                "toolbox-selector__input",
            )[0]
            if (nextBox instanceof HTMLInputElement) {
                nextBox.focus()
            }
        }
    }

    const getPreviousSibling = function (node: Node): Node | ChildNode | null {
        if (node.previousSibling) {
            return node.previousSibling
        }

        return node.parentNode ? node.parentNode.lastChild : null
    }

    const getNextSibling = function (node: Node): Node | ChildNode | null {
        if (node.nextSibling) {
            return node.nextSibling
        }

        return node.parentNode ? node.parentNode.firstChild : null
    }

    const handleKeyDown = (event: React.KeyboardEvent): void => {
        if (
            !!ref?.current?.parentNode &&
            document.activeElement === ref.current
        ) {
            const parent = ref.current.parentNode

            if (parent.nextSibling || parent.previousSibling) {
                switch (event.key) {
                    case "ArrowLeft": {
                        let prev = getPreviousSibling(parent)
                        if (
                            prev instanceof HTMLElement &&
                            prev.getAttribute("data-locked") === "true"
                        ) {
                            prev = getPreviousSibling(prev)
                        }
                        moveToNode(prev)
                        break
                    }
                    case "ArrowRight": {
                        let next = getNextSibling(parent)
                        if (
                            next instanceof HTMLElement &&
                            next.getAttribute("data-locked") === "true"
                        ) {
                            next = getNextSibling(next)
                        }
                        moveToNode(next)
                        break
                    }
                    default:
                        break
                }
            }
        }
    }

    return (
        <div
            className={fullClassName}
            onKeyDown={handleKeyDown}
            data-locked={isLocked}
            data-testid="item"
            {...attrs}
        >
            {children}
            <input
                type="checkbox"
                name={checkboxName}
                ref={ref}
                defaultChecked={isSelected}
                disabled={isDisabled || isReadOnly || isDeactivated}
                className={bInput()}
                tabIndex={tabIndex}
                onClick={onClick}
                onFocus={onFocus}
                onBlur={onBlur}
                data-testid="itemCheckbox"
            />
        </div>
    )
}
