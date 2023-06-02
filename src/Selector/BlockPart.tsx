import * as React from "react"

import Block, { Props as BlockProps } from "./Block"
import Part, { Props as PartProps } from "./Part"

export interface Props extends BlockProps {
    partProps?: PartProps
}

export default function BlockPart({
    children,
    partProps,
    ...attrs
}: Props): JSX.Element {
    return (
        <Block {...attrs}>
            <Part {...partProps}>{children}</Part>
        </Block>
    )
}
