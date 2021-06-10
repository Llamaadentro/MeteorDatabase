import {useLocation, Link} from 'react-router-dom';
import {Meteors} from './pages';

const PageRoutes:{[index:string]: {path:string, exact:boolean, main:React.FC}} = {
  METEORS: {
    path: '/meteors',
    exact: true,
    main: Meteors,
  },
  ROOT: {
    path: '/',
    exact: true,
    main: () => <h1>Main page, redirecting</h1>,
  }
}
  
// for the case of manual enter of incorrect url
export const NoMatch = () => {
  const location = useLocation();

  return <>
      <h3>Page <code>{location.pathname}</code> doesn't exist</h3>
      <div><Link to={PageRoutes.METEORS.path}>Main page</Link></div>
  </>
};

export default PageRoutes;