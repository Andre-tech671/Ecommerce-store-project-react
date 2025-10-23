import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import axios from "axios";
import HomePage from "./HomePage";

vi.mock("axios");
vi.mock("../../components/Header", () => ({
  default: ({ cart }) => (
    <div data-testid="header">Header with {cart.length} items</div>
  ),
}));

describe("HomePage Component", () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
            {
              id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              image:
                "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
              name: "Adults Plain Cotton T-Shirt - 2 Pack",
              rating: {
                stars: 4.5,
                count: 56,
              },
              priceCents: 799,
              keywords: ["tshirts", "apparel", "mens"],
            },
          ],
        };
      }
    });
  });

  it("displays the products correct", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    // Wait for the products to be loaded

    const productContainers = await screen.findAllByTestId("product-container");

    expect(productContainers.length).toBe(3);

    expect(
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs"
      )
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText("Intermediate Size Basketball")
    ).toBeInTheDocument();
  });
});
