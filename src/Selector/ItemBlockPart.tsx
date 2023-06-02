import * as React from "react"

import ItemBlock, { Props as ItemBlockProps } from "./ItemBlock"
import Part, { Props as PartProps } from "./Part"

export interface Props extends ItemBlockProps {
    partProps?: PartProps
}

export default function ItemBlockPart({
    children,
    partProps,
    ...attrs
}: Props): JSX.Element {
    return (
        <ItemBlock {...attrs}>
            <Part {...partProps}>{children}</Part>
        </ItemBlock>
    )
}
