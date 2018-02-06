import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = { topIds: [], items: {} }

  async componentDidMount() {
    let items = {}
    const res = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
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
    console.log(this.state)
    const { topIds, items } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hacker News</h1>
        </header>
        <main className="App-intro">
          <ul>
            {topIds.map((id, index) => {
              const item = items[id]
              const now = Date.now()
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
                      (Number(String(Date.now()).slice(0, -3)) - item.time) /
                        3600
                    )}{' '}
                    hour ago | hide | {item.descendants}
                    comments
                  </p>
                </li>
              )
            })}
          </ul>
        </main>
      </div>
    )
  }
}

export default App
