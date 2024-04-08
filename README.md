# Frontend Mentor - Audiophile e-commerce website solution

This is a solution to the [Audiophile e-commerce website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Bonus features I added](#bonus-features-i-added)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Summary](#summary)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add/Remove products from the cart
- Edit product quantities in the cart
- Fill in all fields in the checkout
- Receive form validations if fields are missed or incorrect during checkout
- See correct checkout totals depending on the products in the cart
  - Shipping always adds $50 to the order
  - VAT is calculated as 20% of the product total, excluding shipping
- See an order confirmation modal after checking out with an order summary
- Keep track of what's in the cart, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Bonus features I added

Coming from an extensive background of working on a wide variety of e-commerce applications for major brands, I thought I would add a few additional features to improve the user experience in relation to e-commerce best practices.

- Store cart state on database, which can be retrieved via a `cartId` cookie stored on the user's browser.
- Added an add to cart confirmation dialog to confirm to the user the product was added to cart. User can continue shopping or be brought to checkout.
- Added loading skeletons and spinners to show to the user while data is being fetched from the backend.

### Links

- Solution URL: [https://github.com/Jschles1/audiophile](https://github.com/Jschles1/audiophile)
- Live Site URL: [https://audiophile-alpha-mocha.vercel.app/](https://audiophile-alpha-mocha.vercel.app/)

## My process

### Built with

- Mobile-first workflow.
- [React](https://reactjs.org/) - JS library for building user interfaces.
- [Typescript](https://www.typescriptlang.org/) - Superset of javascript for adding static typing features. Catches errors at build time instead of build time, and greatly improves the developer experience. Mostly used in this application for typing react component props and state.
- [Prisma](https://www.prisma.io/) - JS/Typescript object relational mapper library.
- [Next.js](https://nextjs.org/) - React framework. Uses version 14 with app router and react server component architecture.
- [shadcn/ui](https://ui.shadcn.com/) - Copy and paste component library built in TailwindCSS.
- PostgreSQL - For storing product information in a database.
- [Bun](https://bun.sh/) - Javascript runtime I used for database seeding script and uploading product images to Cloudflare CDN based on provided data in data.json.
- Cloudflare CDN - Enhances image performance by ensuring faster image delivery and by optimizing image size and format.
- [React Hook Form](https://react-hook-form.com/) - JS library for building forms in react applications.
- [Zod](https://zod.dev) - Typescript-first library schema and validation library. Used for validating checkout form state.
- [React Query](https://tanstack.com/query/v3/) - JS state management library using for client-side fetching and synchronizing server state with client.

### Project Summary

I used this challenge as an opportunity to build a full-stack project and test my backend skills.

The data model I came up with is as follows:

#### Category
- **id** (Integer): Unique identifier, autoincremented.
- **name** (String): Name of the category.
- **mobileCategoryImage** (String): Image URL for mobile view.
- **tabletCategoryImage** (String): Image URL for tablet view.
- **desktopCategoryImage** (String): Image URL for desktop view.
- **Products** (Array of Product): Related products.
  - Foreign Key in Product: `categoryId`

#### Product
- **id** (Integer): Unique identifier, autoincremented.
- **slug** (String): Slug for the product.
- **name** (String): Name of the product.
- **mobileImage** (String): Mobile view image URL.
- **tabletImage** (String): Tablet view image URL.
- **desktopImage** (String): Desktop view image URL.
- **new** (Boolean): Flag indicating if the product is new.
- **price** (Integer): Price of the product.
- **description** (String): Description of the product.
- **features** (String): Features of the product.
- **imageGallery** (JSON): Gallery of images.
- **ProductAddOns** (Array of ProductAddOn): Related add-ons.
- **RelatedProducts** (Array of RelatedProduct): Related products.
- **Categories** (Array of Category): Associated categories.
  - Foreign Key: `categoryId` (Referencing Category)

#### ProductAddOn
- **id** (Integer): Unique identifier, autoincremented.
- **quantity** (Integer): Quantity of the add-on.
- **productId** (Integer): Identifier of the related product (Foreign Key).
- **item** (String): Name or description of the add-on.

#### RelatedProduct
- **id** (Integer): Unique identifier, autoincremented.
- **name** (String): Name of the related product.
- **productId** (Integer): Identifier of the main product (Foreign Key).
- **slug** (String): Slug of the related product.
- **desktopImage** (String): Desktop view image URL.
- **mobileImage** (String): Mobile view image URL.
- **tabletImage** (String): Tablet view image URL.

#### Cart
- **id** (Integer): Unique identifier, autoincremented.
- **items** (Array of CartItems): Related cart items.

#### CartItem
- **id** (Integer): Unique identifier, autoincremented.
- **name** (String): Name of the cart item.
- **quantity** (Integer): Quantity of the cart item.
- **cartId** (Integer): Identifier of the related cart (Foreign Key).
- **price** (Integer): Price of the cart item.
- **image** (String): Image URL for the cart item.

Using the provided image files and `data.json` file, I created a script to seed the data into a PostgreSQL database. For each product image, I also added functionality to change to image format to one that was supported by Cloudflare Image CDN's API, and then upload the image to Cloudflare. You can find the code for the seeder [here](https://github.com/Jschles1/audiophile-seeder).

In the live site, each category page and product detail page will dynamically fetch data based on the category and product slug in the URL, similar to how most e-commerce applications operate.

### Continued development

Some items I plan to continue development on post-MVP:
- Fine tune accessibility best practices.
- Add support for user login with a Users table.
- Add an Orders table and give users the ability to look at past orders.
- Potential CMS integration for changing home page content.
- Storybook integration.
- End to end testing with Playwright.
- Unit testing.

### Useful resources

- [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/) - Gives an in-depth explanation of react server components which are prominently used in Next 14.

## Author

- Website - [John Schlesinger](https://jschles-portfolio.vercel.app/)
- Frontend Mentor - [@Jschles1](https://www.frontendmentor.io/profile/Jschles1)
