import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Stories extends Component {
  state = { topIds: [], items: {} }

  componentDidMount() {
    const name = this.props.match.path.slice(1) ? 'new' : 'top'
    this.fetchNews(name)
  }

  fetchNews = async name => {
    let items = {}
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/${name}stories.json?print=pretty`
    )
    const topIdsAll = await res.json()
    const topIds = topIdsAll.slice(0, 5)

    const results = topIds.map(async id => {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      )
      const item = await res.json()
      items[id] = item
    })

    Promise.all(results).then(() => {
      this.setState({ topIds, items })
    })
  }

  render() {
    const { topIds, items } = this.state
    return (
      <ul>
        {topIds.map((id, index) => {
          const item = items[id]
          return (
            <li key={id}>
              {index + 1}
              {'. '}
              <a href={item.url}>{item.title}</a>
              <span style={{ color: '#666' }}>
                ({new URL(item.url).hostname})
              </span>

              <p style={{ marginLeft: 10 }}>
                {item.score} points by texodus{' '}
                {parseInt(
                  (Number(String(Date.now()).slice(0, -3)) - item.time) / 3600
                )}{' '}
                hour ago | hide |
                <Link to={'item/' + id}>{item.descendants} comments</Link>
              </p>
            </li>
          )
        })}
      </ul>
    )
  }
}
