import React from "react";
import Product from "./Product";

function ProductsGrid({ products, loadCart}) {
  return (
    <>
      <div className="products-grid">
        {/* Product 1 */}
        {products.map((product) => {
          return (
            <Product key={product.id} product={product} loadCart={loadCart} />
          );
        })}
      </div>
    </>
  );
}

export default ProductsGrid;
