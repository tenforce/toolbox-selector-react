import React from "react"
import Part, { className } from "./Part"
import { render, screen } from "@testing-library/react"

describe("Part", (): void => {
    it("renders with the added classes", (): void => {
        render(
            <Part
                isLabel={true}
                isPlaceholder={true}
                extraClasses={"extra-class"}
            />,
        )

        const part = screen.getByTestId("part")
        expect(part.classList.contains(`${className}`)).toBeTruthy()
        expect(part.classList.contains("extra-class")).toBeTruthy()

        const innerPart = screen.getByTestId("innerPart")
        expect(innerPart.classList.contains("label")).toBeTruthy()
    })

    it("renders the color passed as parameter", (): void => {
        const backgroundColor = "rgb(255, 255, 255)"

        render(<Part color={backgroundColor} />)

        const part = screen.getByTestId("part")
        expect(part.style.backgroundColor).toBe(backgroundColor)
    })
})
