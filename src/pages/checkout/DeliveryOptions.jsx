import React from "react";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import axios from "axios";


function DeliveryOptions({deliveryOptions, cartItem, loadingDelivery, loadCart}) {


  return (
    <>
      <div className="delivery-options">
        <div className="delivery-options-title">Choose a delivery option:</div>
        {loadingDelivery ? (
          <div>Loading delivery options...</div>
        ) : deliveryOptions.length === 0 ? (
          <div>No delivery options available.</div>
        ) : (
          deliveryOptions.map((deliveryOption) => {
            if (!deliveryOption.estimatedDeliveryTimeMs) return null; // Skip if estimatedDeliveryTimeMs is missing
            let priceString = "FREE Shipping";

            if (deliveryOption.priceCents > 0) {
              priceString = `${formatMoney(
                deliveryOption.priceCents
              )}- Shipping`;
            }

            const updateDeliveryOption = async () =>{
              await axios.put(`/api/cart-items/${cartItem.productId}`, {
                deliveryOptionId: deliveryOption.id
              });
              await loadCart();
            }

            return (
              <div key={deliveryOption.id} className="delivery-option"
              onClick={updateDeliveryOption}>
                <input
                  type="radio"
                  checked={deliveryOption.id === cartItem.deliveryOptionId}
                  className="delivery-option-input"
                  name={`delivery-option-${cartItem.productId}`}
                />
                <div>
                  <div className="delivery-option-date">
                    {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                      "dddd, MMMM D"
                    )}
                  </div>
                  <div className="delivery-option-price">{priceString}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default DeliveryOptions;
