import React, { useEffect, useState } from "react";
import { SubHeading, MenuItem } from "../../components";
import { toast } from "react-toastify";
import "./SpecialMenu.css";
import { db, collection, query, onSnapshot, where } from "../../firebase";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getQuantity } from "../../util/helpers";

const SpecialMenu = ({ cartItems, setCartItems }) => {
  const [showBeverages, setShowBeverages] = useState(false);
  const [showSnacks, setShowSnacks] = useState(false);
  const [showWater, setShowWater] = useState(false);
  const [wines, setWines] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [waterQuantity, setWaterQuantity] = useState(0);

  useEffect(() => {
    const winesQuery = query(
      collection(db, "wines"),
      where("status", "==", true)
    );
    const unsubscribeWines = onSnapshot(winesQuery, (querySnapshot) => {
      const winesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "Beverages",
      }));
      setWines(winesData);
    });

    const cocktailsQuery = query(
      collection(db, "cocktails"),
      where("status", "==", true)
    );
    const unsubscribeCocktails = onSnapshot(cocktailsQuery, (querySnapshot) => {
      const cocktailsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "Snacks",
      }));
      setCocktails(cocktailsData);
    });

    return () => {
      unsubscribeWines();
      unsubscribeCocktails();
    };
  }, []);

  const handleQuantityChange = (id, quantity, title, type) => {
    const newQuantity = Math.min(Math.max(parseInt(quantity) || 0, 0), 5);
    const updatedCartItems = { ...cartItems };
    const oldQuantity = cartItems[id]?.quantity || 0;

    if (newQuantity > 0) {
      updatedCartItems[id] = { id, title, quantity: newQuantity, type };
    } else {
      delete updatedCartItems[id];
    }

    setCartItems(updatedCartItems);

    if (newQuantity > oldQuantity) {
      toast.success(`${title} has been added successfully to the cart`);
    } else if (newQuantity < oldQuantity) {
      toast.info(`${title} has been removed successfully from the cart`);
    }
  };

  const renderMenuSection = (items, sectionTitle, showState, setShowState) => (
    <div className="app__specialMenu-menu_section flex__center">
      <div
        className="app__specialMenu-menu_heading"
        onClick={() => setShowState(!showState)}
      >
        <p>{sectionTitle}</p>
        {showState ? (
          <FaChevronUp className="dropdown-icon" />
        ) : (
          <FaChevronDown className="dropdown-icon" />
        )}
      </div>
      {showState && (
        <div className="app__specialMenu_menu_items">
          {items.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              type={item.type}
              cartItems={cartItems}
              handleQuantityChange={handleQuantityChange}
              quantity={cartItems[item.id]?.quantity || 0}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="app__specialMenu flex__center section__padding" id="menu">
      <div className="app__specialMenu-title">
        <SubHeading title="Menu that fits your palate" />
        <h1 className="headtext__cormorant">Today's Special</h1>
      </div>

      <div className="app__specialMenu">
        {renderMenuSection(
          [
            {
              id: "water",
              title: "Add Glasses",
              description: "",
              type: "Water",
            },
          ],
          "Water",
          showWater,
          setShowWater
        )}
        {renderMenuSection(wines, "Beverages", showBeverages, setShowBeverages)}
        {renderMenuSection(cocktails, "Snacks", showSnacks, setShowSnacks)}
      </div>
    </div>
  );
};

export default SpecialMenu;
