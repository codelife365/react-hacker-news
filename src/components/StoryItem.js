import React, { Component } from 'react'

class StoryItem extends Component {
  state = { item: {} }

  async componentDidMount() {
    const { id } = this.props.match.params

    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    )

    const item = await res.json()

    // console.log(item)
    // 
    // if (!item.kids.length) return
    // 
    // 
    // const results = item.kids.forEach(async id => {
    //   const res = await fetch(
    //     `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    //   )
    //   const item = await res.json()
    //   items[id] = item
    // })

    this.setState({ item })
  }

  renderItem = () => {}

  render() {
    const ids = Object.keys(this.state.item).length ? this.state.item.kids : []
    return <ul>{ids.map(id => <li key={id}>{id}</li>)}</ul>
  }
}

export default StoryItem
