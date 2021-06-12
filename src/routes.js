import DetailPage from "./pages/DetailPage/index";
import HomePage from "./pages/HomePage/index";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import JobsPage from './pages/JobsPage/index';
import UserProfile from './pages/UserProfile/index';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/job-detail/:id',
        exact: true,
        main: ({match}) => <DetailPage match={match} />
    },
    {
        path: '/sign-in',
        exact: true,
        main: () => <SigninPage />
    },
    {
        path: '/sign-up',
        exact: true,
        main: () => <SignupPage />
    },
    {
        path: '/jobs',
        exact: true,
        main: () => <JobsPage />
    },
    {
        path: '/user-profile',
        exact: true,
        main: () => <UserProfile />
    }
];

export default routes;