import React from "react"
import Item, { className } from "./Item"
import { render, screen } from "@testing-library/react"

describe("Item", (): void => {
    it("renders with the added classes", (): void => {
        render(
            <Item
                isPlaceholder={true}
                isDisabled={true}
                isSelected={true}
                extraClasses={"extra-class"}
            />,
        )

        const item = screen.getByTestId("item")
        expect(item.classList.contains(`${className}`)).toBeTruthy()
        expect(item.classList.contains(`${className}--selected`)).toBeTruthy()
        expect(item.classList.contains("extra-class")).toBeTruthy()
        expect(item.classList.contains("is-dimmed")).toBeTruthy()
        expect(item.classList.contains("is-disabled")).toBeTruthy()

        // make sure the inner checkbox is also not interactive
        const itemCheckbox = screen.getByTestId("itemCheckbox")
        expect(itemCheckbox.getAttribute("disabled")).not.toBeNull()
    })
})
