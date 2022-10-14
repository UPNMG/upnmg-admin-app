
import AdminDashboard from './AdminModel/AdminDashboard';
import LoanDeduction from './AdminModel/pages/LoanDeduction';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import DuesDeductions from './AdminModel/pages/DuesDeductions';
import FundDeductions from './AdminModel/pages/FundDeductions';
import SystemUsers from './AdminModel/pages/SystemUsers';
import UPNMGMembers from './AdminModel/pages/Members';
import LoansDashboard from './LoanModel/LoansDashboard';
import LoanApplication from './LoanModel/pages/LoanApplication';
import LoanApplicationDetailed from './LoanModel/pages/LoanApplicationDetailed';
import HirePurchaseDashboard from './HirePurchaseModel/HirePurchaseDashboard';
import Products from './HirePurchaseModel/pages/Products';
import Orders from './HirePurchaseModel/pages/Orders';
import OrderDetailed from './HirePurchaseModel/pages/OrderDetailed';
import ProcessedOrder from './HirePurchaseModel/pages/ProcessedOrder';
import HirePurchaseReport from './HirePurchaseModel/pages/HirePurchaseReport';
import Login from './Auth/Login';
import ProccedLoans from './LoanModel/pages/BookedLoans';
import Logout from './Auth/LogOut';
import PrivateRoute from './HOC/PrivateRoute';
import PrivateLoanAdminRoute from './HOC/PrivateLoanAdminRoute';
import PrivateMartAdminRoute from './HOC/PrivateMartAdminRoute';
import FundContribution from './LoanModel/pages/FundContribution';
import LoanBookings from './AdminModel/pages/LoanBookings';
import LoanBookedDetailed from './AdminModel/pages/LoanBookedDetailed';
import BookedLoans from './LoanModel/pages/BookedLoans';
import InitiatedLoans from './LoanModel/pages/InitiatedLoans';
import BookedLoansDetailed from './LoanModel/pages/BookedLoansDetailed';
import LoanStatus from './LoanModel/pages/LoanStatus';
import PaidLoans from './AdminModel/pages/PaidLoans';
import PaidLoansDetailed from './AdminModel/pages/PaidLoansDetailed';
import LoansPaid from './LoanModel/pages/PaidLoans';
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
  

      <PrivateLoanAdminRoute  path={'/loans/home'} component={LoansDashboard}/>
      <PrivateLoanAdminRoute  path={'/loans/application'} component={LoanApplication}/>
      <PrivateLoanAdminRoute  path={'/loans/fund-deduction'} component={FundContribution}/>
      <PrivateLoanAdminRoute  path={'/loans/booked'} component={BookedLoans}/>
      <PrivateLoanAdminRoute  path={'/loans/booked-detailed'} component={BookedLoansDetailed}/>
      <PrivateLoanAdminRoute  path={'/loans/initiated'} component={InitiatedLoans}/>
      <PrivateLoanAdminRoute  path={'/loans/status'} component={LoanStatus}/>
      <PrivateLoanAdminRoute  path={'/loans/paid'} component={LoansPaid}/>
      <PrivateLoanAdminRoute  path={'/loans/application-detailed'} component={LoanApplicationDetailed}/>

      <PrivateMartAdminRoute  path={'/mart/home'} component={HirePurchaseDashboard}/>
      <PrivateMartAdminRoute  path={'/mart/product'} component={Products}/>
      <PrivateMartAdminRoute  path={'/mart/order'} component={Orders}/>
      <PrivateMartAdminRoute  path={'/mart/order-detailed'} component={OrderDetailed}/>
      <PrivateMartAdminRoute  path={'/mart/processed-order'} component={ProcessedOrder}/>
      <PrivateMartAdminRoute  path={'/mart/report'} component={HirePurchaseReport}/>
    </Switch>
      {/* <AdminDashboard/> */}
      {/* <LoanDeduction/> */}
      {/* <RenderAdminPage title={'Page'}>
        <h2>This</h2>
      </RenderAdminPage> */}
    </div>
  );
}

export default App;
