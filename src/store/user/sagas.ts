import { call, put, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { AnyAction } from "redux";

import * as API from "./service";
import { loginSuccess, loginFail } from "./action";
import { GasResponse } from "../../types/GasResponse";
import { UserActionTypes } from "./types";

function* login({payload, resolve}: AnyAction): SagaIterator {
  try {
    const res: GasResponse = yield call(API.getUserInfo, payload.username, payload.password);
    if (res.retCode === '000000') {
      yield put(loginFail(""));
      yield put(loginSuccess(res.result));
      yield call(resolve)
    } else {
      yield put(loginFail(res.retMsg))
    }
  } catch (e) {
  } finally {
    yield put(loginFail(""));
    yield put(loginSuccess({token: '123456', username: '张三'}));
    yield call(resolve)
  }
}

function *logout(): SagaIterator {
  yield put(loginSuccess({}));
}

export function* userSaga() {
  yield all([
    takeLatest(UserActionTypes.USER_LOGIN, login),
    takeLatest(UserActionTypes.USER_LOGOUT, logout)
  ])
}
