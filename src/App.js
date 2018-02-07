import React, { Component, Fragment } from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'
import StoryList from './components/StoryList'
import StoryItem from './components/StoryItem'
import './App.css'

export default () => (
  <HashRouter>
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

      <Route exact path="/" component={StoryList} />
      <Route path="/newest" component={StoryList} />
      <Route path="/item/:id" component={StoryItem} />
    </Fragment>
  </HashRouter>
)
