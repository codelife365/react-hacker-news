import React, { Component, Fragment } from 'react'
import { HashRouter, BrowserRouter, Route, Link } from 'react-router-dom'
import asyncload from './utils/asyncload'
import './App.css'

const Router =
  process.env.NODE_ENV === 'development' ? BrowserRouter : HashRouter

export default () => (
  <Router>
    <Fragment>
      <header>
        <Link to="/">
          <h3>Hacker News</h3>
        </Link>
        <Link to="/newest">new</Link> {'|'}
        <Link to="/comments">comments</Link> {'|'}
        <Link to="/show">show</Link> {'|'}
        <Link to="/ask">ask</Link> {'|'}
        <Link to="/jobs">jobs</Link>
      </header>

      <Route
        exact
        path="/"
        component={asyncload(() => import('./components/StoryList'))}
      />
      <Route
        path="/newest"
        component={asyncload(() => import('./components/StoryList'))}
      />
      <Route
        path="/item/:id"
        component={asyncload(() => import('./components/StoryItem'))}
      />
    </Fragment>
  </Router>
)
