import { lazy } from "react";
import { IRoute } from "./types";
import BankAccounts from "pages/dashboard/financials/bank-accounts";
import BankDeposits from "pages/dashboard/financials/bank-deposits";
import BankWithdrawals from "pages/dashboard/financials/bank-withdrawals";

const TrainingPage = lazy(() => import("pages/dashboard/training"));
const FinancePage = lazy(() => import("pages/dashboard/user-management"));
const KycInfoPage = lazy(
  () => import("pages/dashboard/user-management/kyc-info")
);
const WorkersPage = lazy(() => import("pages/dashboard/workers"));
const TransictionsPage = lazy(() => import("pages/dashboard/transictions"));
const RequestedPage = lazy(() => import("pages/dashboard/requested"));
const CredentialsPage = lazy(() => import("pages/dashboard/credentials"));
const CredentialsCreate = lazy(
  () => import("pages/dashboard/credentials/create")
);
const CredentialsUpdate = lazy(
  () => import("pages/dashboard/credentials/update")
);
const CredentialsView = lazy(() => import("pages/dashboard/credentials/view"));
const RegistrationFormPage = lazy(
  () => import("pages/dashboard/registration-form")
);
const DashboardReportPage = lazy(() => import("pages/dashboard/report/index"));
const CareInformation = lazy(
  () => import("pages/dashboard/care-information/index")
);
const DeveloperPlanPage = lazy(() => import("pages/dashboard/developer-plan"));
const DashboardPage = lazy(() => import("pages/dashboard/dashboard"));
const ReportDetailpage = lazy(() => import("pages/dashboard/report-detail"));
const CharityOrganizationPage = lazy(
  () => import("pages/dashboard/charity-organization")
);

const RoleManagementPage = lazy(
  () => import("pages/dashboard/role-management")
);

const SettingsPage = lazy(() => import("pages/dashboard/settings"));

const dashboardRoutes: IRoute[] = [
  {
    key: "dashboard",
    path: "dashboard",
    component: <DashboardPage />,
  },
  {
    key: "registration",
    path: "registration",
    component: <RegistrationFormPage />,
  },
  {
    key: "reportDetail",
    path: "report/:id",
    component: <ReportDetailpage />,
  },
  {
    key: "report",
    path: "report",
    component: <DashboardReportPage />,
  },

  {
    key: "credentials",
    path: "credentials",
    component: <CredentialsPage />,
  },
  {
    key: "credentials-create",
    path: "credentials/create",
    component: <CredentialsCreate />,
  },
  {
    key: "credentials/:id",
    path: "credentials/:id",
    component: <CredentialsUpdate />,
  },
  {
    key: "credentials/view/:id",
    path: "credentials/view/:id",
    component: <CredentialsView />,
  },
  {
    key: "user-management/kyc-info",
    path: "user-management/kyc-info",
    component: <KycInfoPage />,
  },
  {
    key: "financials/bank-accounts",
    path: "financials/bank-accounts",
    component: <BankAccounts />,
  },
  {
    key: "financials/bank-deposits",
    path: "financials/bank-deposits",
    component: <BankDeposits />,
  },
  {
    key: "financials/bank-withdrawals",
    path: "financials/bank-withdrawals",
    component: <BankWithdrawals />,
  },
  {
    key: "workers",
    path: "workers",
    component: <WorkersPage />,
  },
  {
    key: "training",
    path: "training",
    component: <TrainingPage />,
  },
  {
    key: "care-information",
    path: "care-information",
    component: <CareInformation />,
  },
  {
    key: "transictions",
    path: "transictions",
    component: <TransictionsPage />,
  },
  {
    key: "requested",
    path: "requested",
    component: <RequestedPage />,
  },

  {
    key: "developer-plan",
    path: "developer-plan",
    component: <DeveloperPlanPage />,
  },
  {
    key: "charity-organization",
    path: "charity-organization",
    component: <CharityOrganizationPage />,
  },
  {
    key: "role-management",
    path: "role-management",
    component: <RoleManagementPage />,
  },
  {
    key: "settings",
    path: "settings",
    component: <SettingsPage />,
  },
];

export default [...dashboardRoutes];
