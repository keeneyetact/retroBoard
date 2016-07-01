jest.unmock('./testSaga');
jest.unmock('../session');
jest.unmock('../../state/session');

import test from './testSaga';
import { onCreateSession, storeSessionToLocalStorage, doLoadPreviousSessions } from '../session';
import { createSessionSuccess, renameSession, joinSession, receiveClientList, loadPreviousSessions } from '../../state/session';
import { getCurrentUser } from '../../selectors';
import { put, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import ls from 'local-storage';
import shortid from 'shortid';
import moment from 'moment';

const previousSessions = {
    Marcel: [
        { name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
        { name: 'Retro 2', lastJoin: moment('1952-04-24').unix() },
        { name: 'Retro 3', lastJoin: moment('1982-11-01').unix() }
    ],
    Bob: [
        { name: 'Retro 4', lastJoin: moment('1983-04-19').unix() }
    ]
};

describe('Sagas - session', () => {
    it('When a session is created by the user', () => {
        test(onCreateSession({ payload: 'My Session' }), (result, andReturns, andThen) => {
            expect(result()).toEqual(call(shortid.generate));
            andReturns('ABCD');

            expect(result()).toEqual(select(getCurrentUser));
            andReturns('Marcel');

            expect(result()).toEqual(put(createSessionSuccess({ sessionId: 'ABCD' })));
            andThen();

            expect(result()).toEqual(call(storeSessionToLocalStorage, 'Marcel', 'ABCD'));
            andThen();

            expect(result()).toEqual(put(renameSession('My Session')));
            andThen();

            expect(result()).toEqual(put(joinSession({ sessionId: 'ABCD', user: 'Marcel' })));
            andThen();

            expect(result()).toEqual(put(receiveClientList(['Marcel'])));
            andThen();

            expect(result()).toEqual(put(push('/session/ABCD')));
            andThen();
        });
    });

    it('Load Previous sessions', () => {
        test(doLoadPreviousSessions(), (result, andReturns, andThen) => {
            expect(result()).toEqual(select(getCurrentUser));
            andReturns('Marcel');

            expect(result()).toEqual(call(ls, 'sessions'));
            andReturns(previousSessions);

            expect(result()).toEqual(put(loadPreviousSessions([
                { name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
                { name: 'Retro 2', lastJoin: moment('1952-04-24').unix() },
                { name: 'Retro 3', lastJoin: moment('1982-11-01').unix() }
            ])));
            andThen();
        });
    });
});
