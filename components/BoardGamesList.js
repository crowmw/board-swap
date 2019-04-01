import React from 'react'
import Link from 'next/link'
import { Item, Label, Icon } from 'semantic-ui-react';

const BoardGameListItem = ({ boardGame: { _id, slug, name, year, thumbnail, category } }) => {
  return (
    <Item key={_id} >
      <Link href={`/board-game/${slug}`}>
        <Item.Image as='a' src={thumbnail} size='small' style={{ position: 'relative' }} />
      </Link>
      <Item.Content>
        <Item.Header as='a' >{name}</Item.Header>
        <Item.Meta>
          {year}
        </Item.Meta>
        <Item.Extra>
          {category.map(cat => <Label key={cat._id}>{cat.name}</Label>)}
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

const BoardGamesList = ({ boardGames }) => {
  return (
    <Item.Group divided relaxed fixed>
      {boardGames
        ? boardGames.map(bg => (
          <BoardGameListItem boardGame={bg} />
        )
        )
        : null}
    </Item.Group>
  )
}

export default BoardGamesList