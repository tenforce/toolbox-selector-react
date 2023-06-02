import * as React from "react"
import { Item, Selector, Block, Part } from "../Selector"
import { Props as SelectorProps } from "../Selector/Selector"

export interface Props extends SelectorProps {
    isChecked?: boolean
    isUnchecked?: boolean

    onChecked?: (event?: React.MouseEvent<HTMLDivElement>) => void
    onRemoveChecked?: (event?: React.MouseEvent<HTMLDivElement>) => void
    onUnchecked?: (event?: React.MouseEvent<HTMLDivElement>) => void
    onRemoveUnchecked?: (event?: React.MouseEvent<HTMLDivElement>) => void

    checkColor?: string
    uncheckColor?: string
    checkLabel?: JSX.Element | string
    uncheckLabel?: JSX.Element | string
}

const Checkbox = React.forwardRef(
    (
        {
            checkColor = undefined,
            checkLabel = "",
            extraClasses = "",
            isChecked = false,
            isReadOnly,
            isRequired = false,
            isSingleSelect = true,
            isUnchecked = undefined,
            onChecked,
            onRemoveChecked,
            onRemoveUnchecked,
            onUnchecked,
            uncheckColor = undefined,
            uncheckLabel = "",
            ...attrs
        }: Props,
        ref: React.ForwardedRef<HTMLDivElement>,
    ): JSX.Element => {
        return (
            <Selector
                isSingleSelect={isSingleSelect}
                isRequired={isRequired}
                isReadOnly={isReadOnly}
                extraClasses={extraClasses}
                ref={ref}
                {...attrs}
            >
                <Item
                    checkboxName={"is-checked"}
                    isSelected={isChecked}
                    onSelected={onChecked}
                    onUnselected={onRemoveChecked}
                    data-testid="is-checked"
                >
                    <Block>
                        <Part color={checkColor}>{checkLabel}</Part>
                    </Block>
                </Item>

                <Item
                    checkboxName={"is-unchecked"}
                    isSelected={
                        isUnchecked === undefined ? !isChecked : isUnchecked
                    }
                    onSelected={onUnchecked}
                    onUnselected={onRemoveUnchecked}
                    data-testid="is-unchecked"
                >
                    <Block>
                        <Part color={uncheckColor}>{uncheckLabel}</Part>
                    </Block>
                </Item>
            </Selector>
        )
    },
)

Checkbox.displayName = "Checkbox"

export default Checkbox
