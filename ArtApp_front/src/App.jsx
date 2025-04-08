import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateOrder from "./pages/CreateOrder";
import ListOrders from "./pages/ListOrders";
import OrderByBuyer from "./pages/OrderByBuyer";
import OrderDetails from "./pages/OrderDetails";
import OrderUpdate from "./pages/OrderUpdate";
import LayoutMain from "./layout/LayoutMain";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route path="/" element={<ListOrders />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/order-detail/:orderId" element={<OrderDetails />} />
            <Route path="/order-update/:orderId" element={<OrderUpdate />} />
            <Route path="/orderByBuyer/:buyerId" element={<OrderByBuyer />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
