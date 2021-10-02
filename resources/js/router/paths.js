import Landing from "../components/views/Landing.vue";
import Signin from "../components/views/Signin.vue";
import Signup from "../components/views/Signup.vue";

//Admin
import AdminScaffold from "../components/views/admin/Scaffold.vue";
import AdminDashboard from "../components/views/admin/Dashboard.vue";
import AdminJobs from "../components/views/admin/Jobs.vue";
import AdminEmployers from "../components/views/admin/Employer.vue";
import AdminEmployee from "../components/views/admin/Employee.vue";

//Employer
import Scaffold from "../components/views/employer/Scaffold.vue";
import EmployerDashboard from "../components/views/employer/Dashboard.vue";
import EmployerJobs from "../components/views/employer/Jobs.vue";

// Pusher Component
import Pusher from '../components/views/Pusher.vue';

//Admin Routes
let adminRoutes = {
  path: "/admin",
  component: AdminScaffold,
  redirect: "/admin/hospitals",
  name: "Components",
  children: [
    // { path: "purchase-histories", name: "Purchase Histories", components: { default: PurchaseHistory }},
    { path: "/admin/dashboard", name: "Dashboard", components: { default: AdminDashboard }},
    { path: "/admin/jobs", name: "Jobs", components: { default: AdminJobs }},
    { path: "/admin/employers", name: "Employers", components: { default: AdminEmployers }},
    { path: "/admin/employees", name: "Employee", components: { default: AdminEmployee }},
  ]
};

//Admin Routes
let employerRoutes = {
  path: "/employer",
  component: AdminScaffold,
  redirect: "/employer/dashboard",
  name: "Components",
  children: [
    // { path: "purchase-histories", name: "Purchase Histories", components: { default: PurchaseHistory }},
    { path: "/employer/dashboard", name: "Dashboard", components: { default: EmployerDashboard }},
    { path: "/employer/jobs", name: "EmployerJobs", components: { default: EmployerJobs }},
  ]
};

//Subscriber Routes
let subsriberRoutes = {
    path: "/",
    component: Scaffold,
    redirect: "/dashboard",
    name: "Components",
    children: [
    //   { path: "/dashboard", name: "Dashboard", components: { default: Dashboard }},
    //   { path: "/contacts", name: "Contacts", components: { default: Contact }},
    ]
  };

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  adminRoutes,
  employerRoutes,
//   subsriberRoutes,

  // Sample Route For Pusher
  {
      path: "/pusher",
      name: "Pusher",
      component: Pusher
  }
];

export default routes;
