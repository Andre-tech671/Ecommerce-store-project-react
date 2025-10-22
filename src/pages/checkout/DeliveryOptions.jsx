import React from "react";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";


function DeliveryOptions({deliveryOptions, cartItem, loadingDelivery}) {
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

            return (
              <div key={deliveryOption.id} className="delivery-option">
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
