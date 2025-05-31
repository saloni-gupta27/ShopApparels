import React, { useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = React.createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({})
const navigate = useNavigate();
      const addToCart= async(itemId,size)=>{
          if(!size){
              toast.error('Select Product Size');
              return;
          }
       let cartData =  structuredClone(cartItems)
       if(cartData[itemId]){
          if(cartData[itemId][size]){
              cartData[itemId][size]+=1;
          }
          else{
              cartData[itemId][size]=1;
          }
      }
      else{
          cartData[itemId]={};
          cartData[itemId][size] =1;
      }
      setCartItems(cartData)
      }

   const getCartCount =()=>{
      let totalCount = 0;
      for (const items in cartItems) {
          for (const item in cartItems[items]){
              try{
                  if(cartItems[items][item]>0){
                      totalCount += cartItems[items][item];
                  }
              }
              catch(err){
                  console.log(err)
              }
          }
      }
      return totalCount;
   }

    const updateQuantity = async(itemId,size,quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

// Alternate Approach
//   const addToCart = (itemId, size) => {
//     if (!size) {
//       toast.error("Select Product Size");
//       return;
//     }
//     setCartItems((prevCart) => {
//       const existingItemIndex = prevCart.findIndex(
//         (item) => item.id === itemId && item.size === size
//       );

//       if (existingItemIndex !== -1) {
//         // Item with same ID and size already exists — increment quantity
//         const updatedCart = [...prevCart];
//         updatedCart[existingItemIndex].quantity += 1;
//         return updatedCart;
//       } else {
//         // New item/size combination — add to cart
//         return [...prevCart, { id: itemId, size, quantity: 1 }];
//       }
//     });
//   };

//   const getCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

const getCartAmount = () =>{
    let totalAmount = 0;
    for (const items in cartItems){
        let itemInfo  = products.find((product)=>product._id ===items);
        for(const item in cartItems[items]){
            try{
                if(cartItems[items][item]>0){
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }
            catch(err){
                console.log(err);
            }
        }
    }
    return totalAmount;
}


  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,navigate
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
