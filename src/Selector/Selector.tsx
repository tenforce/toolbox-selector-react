import * as React from "react"
import bem from "../bem"
import classNames from "classnames"

export const className = "toolbox-selector"
const b = bem(className)

import Item, { Props as ItemProps } from "./Item"
import ItemBlockPart from "./ItemBlockPart"
import ItemBlock from "./ItemBlock"

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    extraClasses?: string
    isDeactivated?: boolean
    isDisabled?: boolean
    isExpanded?: boolean
    isLoading?: boolean
    isReadOnly?: boolean
    isRequired?: boolean
    isSingleSelect?: boolean
    isWrapped?: boolean
}

const Selector = React.forwardRef(
    (
        {
            children,
            extraClasses = "",
            isDeactivated = false,
            isDisabled = false,
            isExpanded = true,
            isLoading = false,
            isReadOnly = false,
            isRequired = false,
            isSingleSelect = true,
            isWrapped = true,
            ...attrs
        }: Props,
        ref: React.ForwardedRef<HTMLDivElement>,
    ): JSX.Element => {
        const [isFirstChildFocusable, setIsFirstChildFocusable] =
            React.useState(true)

        // we don't know the type of the children, so we have to use any
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const selectedValues =
            React.Children.count(children) > 0
                ? (
                      React.Children.map(children, (child: any) => child) ?? []
                  ).filter(
                      (child: any) =>
                          child &&
                          [Item, ItemBlock, ItemBlockPart].includes(
                              child.type,
                          ) &&
                          child.props.isSelected,
                  )
                : []
        /* eslint-enable @typescript-eslint/no-explicit-any */

        const isLocked = isRequired && selectedValues.length <= 1

        // Add modifiers
        const modifiers = {
            "is-deactivated": isDeactivated,
            "is-disabled": isDisabled,
            "is-loading": isLoading,
            "is-readonly": isReadOnly,
        }

        // Add bem modifiers
        const bemModifiers = {
            expanded: isExpanded,
            singleselect: isSingleSelect,
            multiselect: !isSingleSelect,
            required: isRequired,
            locked: isLocked,
            wrapped: isWrapped,
        }

        // Generate fullClassName based on base className, eventual modifiers (BEM or not) and possible extra classes
        const fullClassName = classNames(
            b(bemModifiers),
            modifiers,
            extraClasses,
        )

        const handleClick = (
            childProps: ItemProps,
            event: React.MouseEvent<HTMLInputElement>,
        ): void => {
            if (isReadOnly || isDisabled || isDeactivated) {
                return event.preventDefault()
            }

            if (childProps.isSelected) {
                return childProps.onUnselected
                    ? childProps.onUnselected(event)
                    : event.preventDefault()
            }

            if (isSingleSelect) {
                selectedValues.forEach((value) => {
                    return value.props.onUnselected
                        ? value.props.onUnselected(event)
                        : event.preventDefault()
                })
            }
            return childProps.onSelected
                ? childProps.onSelected(event)
                : event.preventDefault()
        }

        const onCheckBoxFocus = (): void => {
            setIsFirstChildFocusable(false)
        }

        const onCheckBoxBlur = (): void => {
            setIsFirstChildFocusable(true)
        }

        return (
            <div
                className={fullClassName}
                data-testid="selector"
                ref={ref}
                {...attrs}
            >
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    React.Children.map(children, (child: any, i: number) => {
                        if (
                            child &&
                            [Item, ItemBlock, ItemBlockPart].includes(
                                child.type,
                            )
                        ) {
                            const updatedProps: Partial<ItemProps> = {
                                tabIndex:
                                    i === 0 && isFirstChildFocusable ? 0 : -1,
                                onClick: handleClick.bind(this, child.props),
                                isLocked: child.props.isSelected && isLocked,
                                isDeactivated: isDeactivated,
                                isDisabled: isDisabled,
                                isReadOnly: isReadOnly,
                                onFocus: onCheckBoxFocus,
                                onBlur: onCheckBoxBlur,
                            }
                            child = React.cloneElement(child, updatedProps)
                        }
                        return child
                    })
                }
            </div>
        )
    },
)

Selector.displayName = "Selector"

export default Selector
