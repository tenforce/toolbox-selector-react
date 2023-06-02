import React from "react"
import Selector, { className } from "./Selector"
import ItemBlockPart from "./ItemBlockPart"
import { render, screen, fireEvent, within } from "@testing-library/react"

describe("Selector", (): void => {
    it("renders with the added classes", (): void => {
        render(
            <Selector
                isSingleSelect={true}
                isExpanded={true}
                isReadOnly={true}
                isLoading={true}
                isDeactivated={true}
                extraClasses={"extra-class"}
            />,
        )

        const selector = screen.getByTestId("selector")

        expect(selector.classList.contains(`${className}`)).toBeTruthy()
        expect(
            selector.classList.contains(`${className}--singleselect`),
        ).toBeTruthy()
        expect(
            selector.classList.contains(`${className}--expanded`),
        ).toBeTruthy()
        expect(
            selector.classList.contains(`${className}--wrapped`),
        ).toBeTruthy()
        expect(selector.classList.contains("is-readonly")).toBeTruthy()
        expect(selector.classList.contains("is-loading")).toBeTruthy()
        expect(selector.classList.contains("is-deactivated")).toBeTruthy()
        expect(selector.classList.contains("extra-class")).toBeTruthy()

        render(<Selector isSingleSelect={false} data-testid="multiselect" />)
        const multiselect = screen.getByTestId("multiselect")
        expect(
            multiselect.classList.contains(`${className}--multiselect`),
        ).toBeTruthy()
    })

    it("properly propagates is-disabled and its effects", (): void => {
        render(
            <Selector isDisabled={true}>
                <ItemBlockPart isSelected={true}>Disabled item</ItemBlockPart>
            </Selector>,
        )

        const selector = screen.getByTestId("selector")
        expect(selector.classList.contains("is-disabled")).toBeTruthy()

        // make sure the inner checkbox is also not interactive
        const itemCheckbox = screen.getByTestId("itemCheckbox")
        expect(itemCheckbox.getAttribute("disabled")).not.toBeNull()
    })

    it("shows only the selected item when it is deactivated", (): void => {
        render(
            <Selector isDeactivated={true}>
                <ItemBlockPart isSelected={true}>
                    Disabled selected item
                </ItemBlockPart>
                <ItemBlockPart>Disabled not selected item</ItemBlockPart>
            </Selector>,
        )

        const selector = screen.getByTestId("selector")
        expect(selector.classList.contains("is-deactivated")).toBeTruthy()

        // only the selected element should be there
        const checkboxes = screen.getAllByRole("checkbox")
        expect(checkboxes).toHaveLength(1)
    })

    it("shows only the selected item when it is read only", (): void => {
        render(
            <Selector isReadOnly={true}>
                <ItemBlockPart isSelected={true}>
                    Disabled selected item
                </ItemBlockPart>
                <ItemBlockPart>Disabled not selected item</ItemBlockPart>
            </Selector>,
        )

        const selector = screen.getByTestId("selector")
        expect(selector.classList.contains("is-readonly")).toBeTruthy()

        // only the selected element should be there
        const checkboxes = screen.getAllByRole("checkbox")
        expect(checkboxes).toHaveLength(1)
    })

    it("properly propagates onSelected and its effects", (): void => {
        let isSelected = false
        render(
            <Selector>
                <ItemBlockPart
                    isSelected={isSelected}
                    onSelected={(): void => {
                        isSelected = true
                    }}
                >
                    Click here
                </ItemBlockPart>
            </Selector>,
        )

        const checkbox = screen.getByRole("checkbox")

        fireEvent.click(checkbox)
        expect(isSelected).toBe(true)
    })

    it("properly propagates onUnselected and its effects", (): void => {
        let isSelected = true
        render(
            <Selector>
                <ItemBlockPart
                    isSelected={isSelected}
                    onUnselected={(): void => {
                        isSelected = false
                    }}
                >
                    Click here
                </ItemBlockPart>
            </Selector>,
        )

        const checkbox = screen.getByRole("checkbox")

        fireEvent.click(checkbox)
        expect(isSelected).toBe(false)
    })

    it("sets the tabindex of the first item to 0 when needed", (): void => {
        render(
            <Selector>
                <ItemBlockPart isSelected={false} data-testid="foo">
                    First item
                </ItemBlockPart>
                <ItemBlockPart isSelected={false} data-testid="bar">
                    Second item
                </ItemBlockPart>
            </Selector>,
        )

        const firstOption = screen.getByTestId("foo")
        const secondOption = screen.getByTestId("bar")
        const firstCheckbox = within(firstOption).getByRole("checkbox")
        const secondCheckbox = within(secondOption).getByRole("checkbox")

        expect(firstCheckbox.getAttribute("tabindex")).toBe("0")
        fireEvent.focus(secondCheckbox)
        expect(firstCheckbox.getAttribute("tabindex")).toBe("-1")
        fireEvent.blur(secondCheckbox)
        expect(firstCheckbox.getAttribute("tabindex")).toBe("0")
    })

    it("doesn't call handlers when disabled", (): void => {
        const onClickFunction = jest.fn()

        render(
            <Selector isDisabled={true}>
                <ItemBlockPart
                    isSelected={false}
                    onSelected={onClickFunction}
                    data-testid="foo"
                >
                    First item
                </ItemBlockPart>
                <ItemBlockPart isSelected={false}>Second item</ItemBlockPart>
            </Selector>,
        )

        const firstOption = screen.getByTestId("foo")
        const checkbox = within(firstOption).getByRole("checkbox")

        fireEvent.click(checkbox)
        expect(onClickFunction).not.toHaveBeenCalled()
    })

    it("doesn't call handlers when readOnly", (): void => {
        const onClickFunction = jest.fn()

        render(
            <Selector isReadOnly={true}>
                <ItemBlockPart
                    isSelected={true}
                    onSelected={onClickFunction}
                    data-testid="foo"
                >
                    First item
                </ItemBlockPart>
                <ItemBlockPart isSelected={false}>Second item</ItemBlockPart>
            </Selector>,
        )

        const firstOption = screen.getByTestId("foo")
        const checkbox = within(firstOption).getByRole("checkbox")

        fireEvent.click(checkbox)
        expect(onClickFunction).not.toHaveBeenCalled()
    })

    it("doesn't call handlers when deactivated", (): void => {
        const onClickFunction = jest.fn()

        render(
            <Selector isDeactivated={true}>
                <ItemBlockPart
                    isSelected={true}
                    onSelected={onClickFunction}
                    data-testid="foo"
                >
                    First item
                </ItemBlockPart>
                <ItemBlockPart isSelected={false}>Second item</ItemBlockPart>
            </Selector>,
        )

        const firstOption = screen.getByTestId("foo")
        const checkbox = within(firstOption).getByRole("checkbox")

        fireEvent.click(checkbox)
        expect(onClickFunction).not.toHaveBeenCalled()
    })
})
