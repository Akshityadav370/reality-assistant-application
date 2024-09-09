import React from "react";
import "./MenuItem.css";

const MenuItem = ({
  id,
  title,
  description,
  type,
  cartItems,
  handleQuantityChange,
  quantity,
}) => {
  const isWaterItem = type === "Water";
  const isMaxQuantity = !isWaterItem && quantity >= 5;
  const isMinQuantity = quantity <= 0;

  return (
    <div className="app__menuitem">
      <div className="app__menuitem-head">
        <div className="app__menuitem-name">
          <p className="p__cormorant" style={{ color: "#DCCA87" }}>
            {title}
          </p>
          <div className="app__menuitem-sub">
            <p className="p__opensans" style={{ color: "#AAA" }}>
              {description}
            </p>
          </div>
        </div>
        <div className="app__menuitem-dash" />
        <div className="app__menuitem-price">
          <button
            onClick={() => handleQuantityChange(id, quantity - 1, title, type)}
            disabled={isMinQuantity}
          >
            -
          </button>
          <span className="item-value">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(id, quantity + 1, title, type)}
            disabled={isMaxQuantity}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
