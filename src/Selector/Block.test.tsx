import React from "react"
import Block, { className } from "./Block"
import { render, screen } from "@testing-library/react"

describe("Block", (): void => {
    it("renders with the added classes", (): void => {
        render(<Block isPlaceholder={true} extraClasses={"extra-class"} />)

        const block = screen.getByTestId("block")
        expect(block.classList.contains(`${className}`)).toBeTruthy()
        expect(block.classList.contains("extra-class")).toBeTruthy()
        expect(block.classList.contains("is-dimmed")).toBeTruthy()
    })
})
