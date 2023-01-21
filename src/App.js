import React, { Suspense, useEffect, } from 'react';
import { Route, Routes } from "react-router-dom";
import {
  Product,
  Login,
  Home,
  NormalProfile,
  BusinessProfile,
  PasswordChange,
  BussinessAccountSetup,
  CompleteProfile,
  OtpVerify,
  JoinUs,
  Products,
  SetUpCompleted,
  Dashboard,

  // ChangePassword
} from "./pages";

import "./App.css";

import ChangePassword from "./pages/ChangePassword";
import NormalDashboard from "./pages/NormalDashboard";
import BusinessChangePassword from "./pages/BusinessChangePassword";
import Gps from "./pages/Gps";
import ChatAdmin from "./components/ChatFile/ChatAdmin";
import PrivateRoute from "./utils/PrivateRoute";
// import BusinessDashboard from "./pages/BusinessDashboard";
import Payment from "./components/payment/Payment";
import PrivateUserRoute from "./utils/PrivateUserRoute";
import ShopOwnerPrivateRoute from './utils/ShopOwnerPrivateRoute';
import Review from './pages/Review';
import MobileRightBar from './components/ChatFile/MobileRightBar';
import NotFound from './pages/NotFound';
import AdminRoute from './utils/AdminRoute';
import TermsCon from './components/payment/TermsCon';


function App() {
  let socket

  const BusinessDashboard = React.lazy(() => import('./pages/BusinessDashboard'))
  // const NormalDashboard = React.lazy(() => import('./pages/NormalDashboard'))





  return (
    <div className="App">
      <Routes>
        {/* support chat route For admin */}
        <Route
          path="/supportChat/:id"
          element={
            <AdminRoute>
              <ChatAdmin />
            </AdminRoute>
          }
        />
        {/* for mobile device */}
        <Route
          path="/supportChat/device/:id"
          element={
            <PrivateRoute>
              <MobileRightBar />
            </PrivateRoute>
          }
        />
        <Route path="/product/:id" element={<PrivateRoute>
          <Product />
        </PrivateRoute>} />
        <Route path="/auth" element={<Login />} />

        <Route path="/" element={<Home />} />

        <Route path="/dashboard">
          <Route path="normalDashboard" element={

            // <Suspense fallback={<div className='flex justify-center items-center h-s'>Loading....</div>}>

            <NormalDashboard
            />
            // </Suspense>


          }
          />
          <Route path="updateProfile" element={<PrivateRoute>
            <NormalProfile

            />
          </PrivateRoute>} />
          <Route
            path="updatePasswordNormalProfile"
            element={<PrivateRoute>
              <ChangePassword />
            </PrivateRoute>}
          />
        </Route>

        <Route path="/businessProfile">
          <Route path="businessDashboard" element={
            <ShopOwnerPrivateRoute>
              <BusinessDashboard

              />
            </ShopOwnerPrivateRoute>
          }
          />
          <Route
            path="updateBusinessPassword"
            element={<BusinessChangePassword />}
          />
          <Route path="updateBusinessProfile" element={<BusinessProfile
          // userId={userId}
          />} />
          <Route path="updateGps" element={<Gps />} />
        </Route>

        <Route
          path="/changePassword"
          element={
            <PasswordChange />
          }
        />
        <Route
          path="/businessAccountSetup"
          element={<BussinessAccountSetup />}
        />

        <Route path="/normalAccountSetup" element={<BussinessAccountSetup />} />

        <Route path="/completeProfile" element={<CompleteProfile />} />
        <Route
          path="/otpVerify"
          element={
            <OtpVerify />
          }
        />
        <Route path="/joinUs" element={<JoinUs />} />
        <Route path="/products/:content" element={<Products />} />
        <Route path="/setupCompleted" element={<SetUpCompleted />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/terms" element={<TermsCon />} />
        <Route path="/admindashboard" element={<Dashboard />} />
        <Route path="/product/review/:id" element={<Review />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
