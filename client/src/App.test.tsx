// import { describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import App from "./App";
import * as productService from "./services/productService";
import { Product } from "./types";

vi.mock("./services/productService.ts");
const mockedProductService = vi.mocked(productService, true);

// - Get products
// - Toggle add form or edit form

const mockProducts: Product[] = [
  {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  },
  {
    _id: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 0,
    price: 649.99,
  },
  {
    _id: "3",
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99,
  },
  {
    _id: "4",
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74,
  },
];

const mockCart: Product[] = [
  {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
  },
  {
    _id: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
  },
];

afterEach(() => {
  vi.resetAllMocks();
});

it('Gets the products and displays the title', async () => {
  mockedProductService.getProducts.mockResolvedValue(mockProducts)
  mockedProductService.getCart.mockResolvedValue(mockCart)
  render(<App />)
  const heading = await screen.findByRole("heading", {
    level: 3,
    name: 'Amazon Kindle E-reader',
  });
  expect(heading).toBeInTheDocument();
})

it('Toggles the AddProduct form when Add A Product is clicked', async() => {
  mockedProductService.getProducts.mockResolvedValue(mockProducts)
  mockedProductService.getCart.mockResolvedValue(mockCart)
  render(<App />)
  const button = await screen.findByRole("button", { name: /Add A Product/ });
  const user = userEvent.setup();
  await user.click(button);
  const formTitle = await screen.findByRole('textbox', {
    name: /Product Name:/
  });
  expect(formTitle).toBeInTheDocument();
  // const form = await screen.findByRole('form')
  // expect(form).toBeInTheDocument();
})

it('Gets the cart items and populate the table', async () => {
  mockedProductService.getProducts.mockResolvedValue(mockProducts)
  mockedProductService.getCart.mockResolvedValue(mockCart)
  render(<App />)
  const cell = await screen.findByRole('cell', { name: /Amazon Kindle E-reader/ });
  expect(cell).toBeInTheDocument();
})