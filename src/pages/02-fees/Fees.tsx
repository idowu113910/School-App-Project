import { useState } from "react";
import Body from "./Body";
import Header from "./Header";

const Fees = () => {
  const [showBody, setShowBody] = useState(false);

  if (showBody) {
    return <Body onBack={() => setShowBody(false)} />;
  }

  return (
    <div>
      <Header onPay={() => setShowBody(true)} />
    </div>
  );
};

export default Fees;
