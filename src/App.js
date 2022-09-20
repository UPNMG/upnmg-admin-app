
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
import PendingLoans from './LoanModel/pages/PendingLoans';
import CancelledLoans from './LoanModel/pages/CancelledLoans';
import ProccedLoans from './LoanModel/pages/ProccedLoans';
function App() {
  return (
    <div className="App">

    <Switch>
      <Route exact path={'/'} component={Login}/>
      <Route exact path={'/admin/home'} component={AdminDashboard}/>
      <Route  path={'/admin/loans'} component={LoanDeduction}/>
      <Route  path={'/admin/funds'} component={FundDeductions}/>
      <Route  path={'/admin/dues'} component={DuesDeductions}/>
      <Route  path={'/admin/users'} component={SystemUsers}/>
      <Route  path={'/admin/members'} component={UPNMGMembers}/>
      {/* <Route component={Login}/> */}

      <Route  path={'/loans/home'} component={LoansDashboard}/>
      <Route  path={'/loans/application'} component={LoanApplication}/>
      <Route  path={'/loans/procced'} component={ProccedLoans}/>
      <Route  path={'/loans/pending'} component={PendingLoans}/>
      <Route  path={'/loans/cancelled'} component={CancelledLoans}/>
      <Route  path={'/loans/application-detailed'} component={LoanApplicationDetailed}/>

      <Route  path={'/hirepurchase/home'} component={HirePurchaseDashboard}/>
      <Route  path={'/hirepurchase/product'} component={Products}/>
      <Route  path={'/hirepurchase/order'} component={Orders}/>
      <Route  path={'/hirepurchase/order-detailed'} component={OrderDetailed}/>
      <Route  path={'/hirepurchase/processed-order'} component={ProcessedOrder}/>
      <Route  path={'/hirepurchase/report'} component={HirePurchaseReport}/>
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
