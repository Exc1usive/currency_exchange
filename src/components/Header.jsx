import React from "react";
import Currency from "./Currency"

function Header(props) {
  return (
    <header>
      <Currency 
        cc="USD"
      />
    <Currency 
        cc="EUR"
      />
    <Currency 
        cc="RUB"
      />
    </header>
  );
}

export default Header;