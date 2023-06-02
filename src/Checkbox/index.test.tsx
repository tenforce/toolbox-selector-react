import React from "react"
import Checkbox from "./index"

import { render, screen, fireEvent, within } from "@testing-library/react"

describe("Checkbox", () => {
    it("properly propagates onChecked and its effects", () => {
        let isChecked = false
        render(
            <Checkbox
                isChecked={isChecked}
                onChecked={(): void => {
                    isChecked = true
                }}
            />,
        )

        expect(isChecked).toBeFalsy()
        const input = within(screen.getByTestId("is-checked")).getByRole(
            "checkbox",
        )
        fireEvent.click(input)
        expect(isChecked).toBeTruthy()
    })

    it("properly propagates onUnchecked and its effects", () => {
        let isChecked = true
        render(
            <Checkbox
                isChecked={isChecked}
                onUnchecked={(): void => {
                    isChecked = false
                }}
            />,
        )

        const input = within(screen.getByTestId("is-unchecked")).getByRole(
            "checkbox",
        )
        fireEvent.click(input)
        expect(isChecked).toBeFalsy()
    })

    it("properly propagates onRemoveChecked and its effects", () => {
        let isChecked = true
        render(
            <Checkbox
                isChecked={isChecked}
                onRemoveChecked={(): void => {
                    isChecked = false
                }}
            />,
        )

        const input = within(screen.getByTestId("is-checked")).getByRole(
            "checkbox",
        )
        fireEvent.click(input)
        expect(isChecked).toBeFalsy()
    })

    it("properly propagates onRemoveUnchecked and its effects", () => {
        let isChecked = false
        render(
            <Checkbox
                isChecked={isChecked}
                onRemoveUnchecked={(): void => {
                    isChecked = true
                }}
            />,
        )

        const input = within(screen.getByTestId("is-unchecked")).getByRole(
            "checkbox",
        )
        fireEvent.click(input)
        expect(isChecked).toBeTruthy()
    })

    it("isChecked and isUnchecked can be toggled independently", () => {
        let isChecked = false
        let isUnchecked = false
        render(
            <Checkbox
                isChecked={isChecked}
                isUnchecked={isUnchecked}
                isSingleSelect={false}
                onChecked={(): void => {
                    isChecked = true
                }}
                onUnchecked={(): void => {
                    isUnchecked = true
                }}
            />,
        )

        const toCheck = within(screen.getByTestId("is-checked")).getByRole(
            "checkbox",
        )
        const toUncheck = within(screen.getByTestId("is-unchecked")).getByRole(
            "checkbox",
        )

        fireEvent.click(toCheck)
        fireEvent.click(toUncheck)

        expect(isChecked).toBeTruthy()
        expect(isUnchecked).toBeTruthy()
    })
})
