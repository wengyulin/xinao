import { all, fork } from 'redux-saga/effects';

import { userSaga } from "./user/sagas";

export default function* rootSagas() {
  yield all([
    fork(userSaga)
  ])
}
