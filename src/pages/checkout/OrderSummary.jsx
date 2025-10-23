import React from "react";
import axios from "axios";
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import DeliveryOptions from "./DeliveryOptions";

function OrderSummary({ cart, deliveryOptions, loadingDelivery, loadCart }) {
  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions.find(
              (deliveryOption) => {
                return deliveryOption.id === cartItem.deliveryOptionId;
              }
            );

            if (!cartItem.product) return null; // Skip if product data is missing

            const deleteCartItem = async () => {
              await axios.delete(`/api/cart-items/${cartItem.productId}`);
              await loadCart();
            }

            const updateCartItem = async () => {
              // For simplicity, let's just increment the quantity by 1
              await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: cartItem.quantity + 1
              });
              await loadCart();
            }

            return (
              <div key={cartItem.productId} className="cart-item-container">
                <div className="delivery-date">
                  Delivery date:{" "}
                  {dayjs(
                    selectedDeliveryOption?.estimatedDeliveryTimeMs
                  ).format("dddd, MMMM D")}
                </div>

                <div className="cart-item-details-grid">
                  <img className="product-image" src={cartItem.product.image} />

                  <div className="cart-item-details">
                    <div className="product-name">{cartItem.product.name}</div>
                    <div className="product-price">
                      {formatMoney(cartItem.product.priceCents)}
                    </div>
                    <div className="product-quantity">
                      <span>
                        Quantity:{" "}
                        <span className="quantity-label">
                          {cartItem.quantity}
                        </span>
                      </span>
                      <span className="update-quantity-link link-primary"
                      onClick={updateCartItem}>
                        Update
                      </span>
                      <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                      </span>
                    </div>
                  </div>

                 <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadingDelivery={loadingDelivery} loadCart={loadCart}/>
                </div>
              </div>
            );
          })}
        ;
      </div>
    </>
  );
}

export default OrderSummary;
