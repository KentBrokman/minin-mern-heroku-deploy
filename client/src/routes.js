import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { CreateUserPage } from './pages/CreateUserPage'
import { DetailPage } from './pages/DetailPage'
import { LinksPage } from './pages/LinksPage'


export const useRoutes = (isAthenticated) => {
    if (isAthenticated) {
        return (
            <Switch>
                <Route path='/links' exact>
                    <LinksPage />
                </Route>
                <Route path='/create' exact>
                    <CreateUserPage />
                </Route>
                <Route path='/detail:id'>
                    <DetailPage />
                </Route>
                <Redirect to='/create' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}