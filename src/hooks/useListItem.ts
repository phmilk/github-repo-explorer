import { useContext } from 'react'
import { ListItemContext } from '@contexts/ListItemContext'

function useListItem() {
  return useContext(ListItemContext)
}

export { useListItem }
