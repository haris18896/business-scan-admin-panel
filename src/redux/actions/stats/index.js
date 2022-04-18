import useJwt from '@src/auth/jwt/useJwt'
import { FETCH_STATS_FAILED, FETCH_STATS_INITIATED, FETCH_STATS_SUCCESS, REST_STATS } from '../ActionTypes/stats'

export const resetStats = () => ({ type: REST_STATS })
export const initiateFetchStats = () => ({ type: FETCH_STATS_INITIATED })
export const fetchStatsSuccess = data => ({ type: FETCH_STATS_SUCCESS, payload: data })
export const fetchStatsFailed = data => ({ type: FETCH_STATS_FAILED, payload: data })

export const handleFetchStats = () => {
  return async dispatch => {
    try {
      dispatch(initiateFetchStats())
      const response = await useJwt.getStats()
      if (response && response.data) {
        dispatch(fetchStatsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch(fetchStatsFailed(err.response.data))
      }
    }
  }
}
