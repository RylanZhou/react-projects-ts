import { GlobalStateIF, ActionIF, ACTION_TYPES } from './types'

export default (state: GlobalStateIF, action: ActionIF): GlobalStateIF => {
  switch (action.type) {
    case ACTION_TYPES.SET_TOP_TRACKS:
      return {
        ...state,
        ...action.payload
      }
    case ACTION_TYPES.SET_HEADING:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
