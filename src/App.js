
/* eslint-disable  */
import { Route, Switch } from 'react-router-dom';
import AdminDashboard from './AdminModel/AdminDashboard';
import DuesDeductions from './AdminModel/pages/DuesDeductions';
import FundDeductions from './AdminModel/pages/FundDeductions';
import LoanBookedDetailed from './AdminModel/pages/LoanBookedDetailed';
import LoanBookings from './AdminModel/pages/LoanBookings';
import LoanDeduction from './AdminModel/pages/LoanDeduction';
import UPNMGMembers from './AdminModel/pages/Members';
import PaidLoans from './AdminModel/pages/PaidLoans';
import PaidLoansDetailed from './AdminModel/pages/PaidLoansDetailed';
import SystemUsers from './AdminModel/pages/SystemUsers';
import './App.css';
import Login from './Auth/Login';
import Logout from './Auth/LogOut';
import HirePurchaseDashboard from './HirePurchaseModel/HirePurchaseDashboard';
import ApprovedOrders from './HirePurchaseModel/pages/ApprovedOrders';
import HirePurchaseReport from './HirePurchaseModel/pages/HirePurchaseReport';
import OrderDetailed from './HirePurchaseModel/pages/OrderDetailed';
import Orders from './HirePurchaseModel/pages/Orders';
import ProcessedOrder from './HirePurchaseModel/pages/ProcessedOrder';
import ProductCategory from './HirePurchaseModel/pages/ProductCategory';
import ProductDetailed from './HirePurchaseModel/pages/ProductDetailed';
import Products from './HirePurchaseModel/pages/Products';
import ProfileHirePurchase from './HirePurchaseModel/pages/ProfileHirePurchase';
import RejectedOrders from './HirePurchaseModel/pages/RejectedOrders';
import ShippedOrders from './HirePurchaseModel/pages/ShippedOrders';
import PrivateLoanAdminRoute from './HOC/PrivateLoanAdminRoute';
import PrivateMartAdminRoute from './HOC/PrivateMartAdminRoute';
import PrivateRoute from './HOC/PrivateRoute';
import LoansDashboard from './LoanModel/LoansDashboard';
import BookedLoans from './LoanModel/pages/BookedLoans';
import BookedLoansDetailed from './LoanModel/pages/BookedLoansDetailed';
import FundContribution from './LoanModel/pages/FundContribution';
import InitiatedLoans from './LoanModel/pages/InitiatedLoans';
import LoanApplication from './LoanModel/pages/LoanApplication';
import LoanApplicationDetailed from './LoanModel/pages/LoanApplicationDetailed';
import LoanCalculator from './LoanModel/pages/LoanCalculator';
import LoansMessages from './LoanModel/pages/LoansMessages';
import LoansMessagesDetailed from './LoanModel/pages/LoansMessagesDetailed';
import LoanStatus from './LoanModel/pages/LoanStatus';
import LoansPaid from './LoanModel/pages/PaidLoans';
import ProfileLoan from './LoanModel/pages/ProfileLoan';
function App() {
  return (
    <div className="App">

    <Switch>
      <Route exact path={'/'} component={Login}/>
      <Route exact path={'/logout'} component={Logout}/>

      <PrivateRoute exact path={'/admin/home'} component={AdminDashboard}/>
      <PrivateRoute  path={'/admin/loans'} component={LoanDeduction}/>
      <PrivateRoute  path={'/admin/loans-bookings'} component={LoanBookings}/>
      <PrivateRoute  path={'/admin/loans-paid-detailed'} component={PaidLoansDetailed}/>
      <PrivateRoute  path={'/admin/loans-paid'} component={PaidLoans}/>
      <PrivateRoute  path={'/admin/loans-application-detailed'} component={LoanBookedDetailed}/>
      <PrivateRoute  path={'/admin/funds'} component={FundDeductions}/>
      <PrivateRoute  path={'/admin/dues'} component={DuesDeductions}/>
      <PrivateRoute  path={'/admin/users'} component={SystemUsers}/>
      <PrivateRoute  path={'/admin/members'} component={UPNMGMembers}/>
  

      {/* <PrivateRoute  path={'/messages'} component={Messages}/> */}
      
      <PrivateLoanAdminRoute  path={'/loans/home'} component={LoansDashboard}/>
      <PrivateLoanAdminRoute  path={'/loans/messages'} component={LoansMessages}/>
      <PrivateLoanAdminRoute  path={'/loans/messages-detailed'} component={LoansMessagesDetailed}/>
      <PrivateLoanAdminRoute  path={'/loans/application'} component={LoanApplication}/>
      <PrivateLoanAdminRoute  path={'/loans/fund-deduction'} component={FundContribution}/>
      <PrivateLoanAdminRoute  path={'/loans/booked'} component={BookedLoans}/>
      <PrivateLoanAdminRoute  path={'/loans/booked-detailed'} component={BookedLoansDetailed}/>
      <PrivateLoanAdminRoute  path={'/loans/initiated'} component={InitiatedLoans}/>
      <PrivateLoanAdminRoute  path={'/loans/status'} component={LoanStatus}/>
      <PrivateLoanAdminRoute  path={'/loans/paid'} component={LoansPaid}/>
      <PrivateLoanAdminRoute  path={'/loans/application-detailed'} component={LoanApplicationDetailed}/>
      <PrivateLoanAdminRoute  path={'/loans/profile'} component={ProfileLoan}/>
      <PrivateLoanAdminRoute  path={'/loans/calculator'} component={LoanCalculator}/>

      <PrivateMartAdminRoute  path={'/mart/home'} component={HirePurchaseDashboard}/>
      <PrivateMartAdminRoute  path={'/mart/product'} component={Products}/>
      <PrivateMartAdminRoute  path={'/mart/product-detail'} component={ProductDetailed}/>
      <PrivateMartAdminRoute  path={'/mart/category'} component={ProductCategory}/>
      <PrivateMartAdminRoute  path={'/mart/profile'} component={ProfileHirePurchase}/>
      <PrivateMartAdminRoute  path={'/mart/order'} component={Orders}/>
      <PrivateMartAdminRoute  path={'/mart/order-detailed'} component={OrderDetailed}/>
      <PrivateMartAdminRoute  path={'/mart/processed-order'} component={ProcessedOrder}/>
      <PrivateMartAdminRoute  path={'/mart/rejected-order'} component={RejectedOrders}/>
      <PrivateMartAdminRoute  path={'/mart/shipped-order'} component={ShippedOrders}/>
      <PrivateMartAdminRoute  path={'/mart/approved-order'} component={ApprovedOrders}/>
      <PrivateMartAdminRoute  path={'/mart/report'} component={HirePurchaseReport}/>
    </Switch>
  
    </div>
  );
}

export default App;
