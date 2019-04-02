import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import { Pagination } from 'semantic-ui-react';

import BoardGamesList from '../components/BoardGamesList'
import actions from '../redux/actions/actions'
import selectors from '../redux/selectors/selectors'

const BoardGames = ({ boardGames, totalPages = 48, page }) => {
  const [activePage, changePage] = useActivePageChange(page);

  return (
    <>
      <div className='board-games'>
        <BoardGamesList boardGames={boardGames} />
        <Pagination
          activePage={activePage}
          onPageChange={changePage}
          siblingRange={1}
          boundaryRange={0}
          firstItem={null}
          lastItem={null}
          pointing
          size='tiny'
          secondary
          totalPages={totalPages}
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      </div>
      <style jsx>{`
      .board-games {
        display: flex;
        flex-flow: column;
      }
    `}</style>
    </>
  )
}

BoardGames.getInitialProps = async ({ store, query: { page = 1 } }) => {
  const skip = (page - 1) * 48
  const boardGames = await actions.fetchBoardGames({ skip, first: 48 })
  return { boardGames, page }
}

function useActivePageChange(page) {
  const [activePage, setActivePage] = useState(page);

  const changePage = (e, { activePage }) => setActivePage(activePage)

  useEffect(() => {
    Router.replace(`/board-games?page=${activePage}`).then(() => window.scrollTo(0, 0));
  }, [activePage]);
  return [activePage, changePage]
}

export default BoardGames

