import React from 'react'
import Link from 'next/link'
import { Item, Label, Icon } from 'semantic-ui-react';

const BoardGameListItem = ({ boardGame: { _id, slug, name, year, thumbnail, category } }) => {
  return (
    <>
      <Link href={`/board-game/${slug}`}>
        <div key={_id} className='board-game-list-item' >
          <img src={thumbnail} />
          <h2>{name}</h2>
          <h3>{year}</h3>
        </div>
      </Link>
      <style jsx>{`
    .board-game-list-item{
      background-color: #fff;
      display: flex;
      flex-direction: column;
      margin: 0 0 1.5em 0;
      width: 100%;
      box-shadow: 0 1px 5px 0 #cccccc;
      }

      img {
        width: 100%;
      }

      h2 {
        margin: 0;
        padding: 0;
        padding-top: 0.5em;
        font-size: 1em;
      }

      h3 {
        margin: 0;
        padding: 0;
        padding-bottom: 0.5em;
        font-size:1em;
        font-weight: 300;
        color: #9f9f9f;
      }
    `}
      </style>
    </>
  )
}

const BoardGamesList = ({ boardGames }) => {
  return (
    <>
      <div className='board-games-list'>
        {boardGames
          ? boardGames.map(bg => (
            <BoardGameListItem boardGame={bg} />
          )
          )
          : null}
      </div>
      <style jsx>{`
    .board-games-list{
      margin: 0 1em;
      column-count: 2;
      column-gap: 1em;
    }
    `}</style>
    </>
  )
}

export default BoardGamesList