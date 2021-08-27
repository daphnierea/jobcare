import Landing from "../components/views/Landing.vue";
import Developer from "../components/views/Developer.vue";
import Signin from "../components/views/Signin.vue";
import Signup from "../components/views/Signup.vue";
import Pricing from "../components/views/Plan.vue";
import Faq from "../components/views/Faq.vue";

import Scaffold from "../components/views/Scaffold.vue";
import Dashboard from "../components/views/Dashboard.vue";
import Contact from "../components/views/Contact.vue";
import DeveloperCode from "../components/views/DeveloperCode.vue";
import Userfaq from "../components/views/Userfaq.vue";
import Blast from "../components/views/Blast.vue";
import Referral from "../components/views/Referral.vue";
import History from "../components/views/History.vue";
import PurchaseHistory from "../components/views/PurchaseHistory.vue";
import Users from "../components/views/User.vue";

// Pusher Component
import Pusher from '../components/views/Pusher.vue';

//Admin Routes
let adminRoutes = {
  path: "/admin",
  component: Scaffold,
  redirect: "/admin/purchase-histories",
  name: "Components",
  children: [
    { path: "purchase-histories", name: "Purchase Histories", components: { default: PurchaseHistory }},
    { path: "users", name: "Users", components: { default: Users }},
  ]
};

//Subscriber Routes
let subsriberRoutes = {
    path: "/",
    component: Scaffold,
    redirect: "/dashboard",
    name: "Components",
    children: [
      { path: "/dashboard", name: "Dashboard", components: { default: Dashboard }},
      { path: "/contacts", name: "Contacts", components: { default: Contact }},
      { path: "/blast", name: "Blast", components: { default: Blast }},
      { path: "/referrals", name: "Referral", components: { default: Referral }},
      { path: "/purchase-histories", name: "Histories", components: { default: History }},
      { path: "/developer", name: "DeveloperCode", components: { default: DeveloperCode }},
      { path: "/faq", name: "Userfaq", components: { default: Userfaq }},
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
    path: "/developers",
    name: "Developer",
    component: Developer,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: Pricing,
  },
  {
    path: "/faqs",
    name: "Faq",
    component: Faq,
  },
  { path: "/developerMobile", name: "DeveloperCode", components: { default: DeveloperCode }},
  adminRoutes,
  subsriberRoutes,

  // Sample Route For Pusher
  {
      path: "/pusher",
      name: "Pusher",
      component: Pusher
  }
];

export default routes;
