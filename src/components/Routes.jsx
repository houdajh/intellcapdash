import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Products from '../pages/Products'
import Orders from '../pages/Orders'
import Categories from '../pages/Categories'
import Add from '../pages/addProd'
import Admins from '../pages/Admins'
import UpdatePage from '../pages/UpdatePage'

const Routes = () => {
    return (
        <Switch>     
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' exact component={Customers}/>
            <Route path='/products'  exact component={Products}/>
            <Route path='/orders' exact component={Orders}/>
            <Route path='/categories' exact component={Categories}/>
            <Route path='/add' exact component={Add}/>
            <Route path='/admin' exact component={Admins}/>
            <Route path='/update' exact component={UpdatePage}/>
        </Switch>
    )
}

export default Routes
