import * as React from "react"

import Item, { Props as ItemProps } from "./Item"
import Block, { Props as BlockProps } from "./Block"

export interface Props extends ItemProps {
    blockProps?: BlockProps
}

export default function ItemBlock({
    children,
    blockProps,
    ...attrs
}: Props): JSX.Element {
    return (
        <Item {...attrs}>
            <Block {...blockProps}>{children}</Block>
        </Item>
    )
}
