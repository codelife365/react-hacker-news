import React, { Component } from 'react'

export default ({ match }) => <AsyncTree id={match.params.id} />

class AsyncTree extends React.Component {
  state = { item: {} }
  async componentDidMount() {
    const { id } = this.props

    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    )
    const item = await res.json()
    this.setState({ item })
  }

  render() {
    const { item } = this.state
    if (Object.keys(item).length === 0) return ''
    if (!item.kids) {
      return item.id
    }
    return (
      <div>
        <div className="parent">{item.text}</div>
        {item.kids.map(id => (
          <div key={id}>
            <AsyncTree id={id} />
          </div>
        ))}
      </div>
    )
  }
}
