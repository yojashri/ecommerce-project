import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import LoginPage from "./page"
import { useRouter } from "next/navigation"

//  Mock router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("Login Page", () => {
  const push = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push })
    global.fetch = jest.fn() as any
  })

  // Test 1: Render inputs + button
  test("renders inputs and button", () => {
    render(<LoginPage />)

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()

    //  FIXED: target button specifically
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument()
  })

  //  Test 2: Typing works
  test("user can type in inputs", () => {
    render(<LoginPage />)

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    })

    expect(screen.getByPlaceholderText("Email")).toHaveValue("test@test.com")
  })

  //  Test 3: Successful login redirects
  test("successful login redirects", async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ token: "fake-token" }),
    })

    render(<LoginPage />)

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    })

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "1234" },
    })

    //  FIXED button click
    fireEvent.click(screen.getByRole("button", { name: "Login" }))

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/")
    })
  })

  //  Test 4: Failed login shows alert
  test("failed login shows alert", async () => {
    window.alert = jest.fn()

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Invalid credentials" }),
    })

    render(<LoginPage />)

    fireEvent.click(screen.getByRole("button", { name: "Login" }))

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Invalid credentials")
    })
  })
})