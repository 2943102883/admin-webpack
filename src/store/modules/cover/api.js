/* eslint-disable */
import http from '@doxlab/atomleaf/lib/http'
// 课程 API
const RESTURL = 'course'
const ImgUrl = 'file/img'
const delImg = 'file/img'

const API = {
  createImg({ dispatch }, { data }) {
    return new Promise((resolve, reject) => {
      http
        .post(ImgUrl, data)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          dispatch(
            'pushError',
            {
              error,
            },
            {
              root: true,
            },
          )
          reject(error)
        })
    })
  },

  deleteImg({ dispatch }, { id }) {
    return new Promise((resolve, reject) => {
      http
        .delete(delImg, {
          id,
        })
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          dispatch(
            'pushError',
            {
              error,
            },
            {
              root: true,
            },
          )
          reject(error)
        })
    })
  },
  deleteFile({ dispatch }, { id }) {
    return new Promise((resolve, reject) => {
      http
        .delete(delDoc, {
          id,
        })
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          dispatch(
            'pushError',
            {
              error,
            },
            {
              root: true,
            },
          )
          reject(error)
        })
    })
  },
}
export default API
