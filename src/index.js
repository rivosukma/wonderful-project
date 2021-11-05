import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './config/routes';
import configureStore from './store/ContainerReducer';
import Errorpage from './views/errors/Errorpage';

const Container = lazy(() => import('./views/layouts/Container'))

const Root = () => {
  return(
    <Provider store={configureStore()}>
      <BrowserRouter>
        <Switch>
          {routes.length > 0
            &&  routes
                .map((route, index)=> {
                return route.component 
                ? <Route 
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={props =>
                      <Suspense fallback={'Loading...'}>
                        <Container
                          content={route.component}
                          {...props}
                        />
                      </Suspense>
                    }
                  />
                : null
                })
          }
          <Route component={Errorpage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
