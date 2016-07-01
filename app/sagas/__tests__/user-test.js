jest.unmock('../user');
jest.unmock('../session');
jest.unmock('../../state/user');

import { loginUser, autoLoginUser, disconnectUser } from '../user';
import { loadPreviousSessions } from '../session';
import { loginSuccess, changeLanguageSuccess } from '../../state/user';
import { put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import ls from 'local-storage';

const test = (generatorFunction, fn) => {
    const generator = generatorFunction();
    let result = generator.next().value;
    const andReturns = v => { result = generator.next(v); };
    const andThen = () => { result = generator.next(); };

    fn(andReturns, andThen);
};

describe('Sagas - user', () => {
    it('When a user logs in', () => {
        const generator = loginUser({ payload: { name: 'Apolline' } });

        expect(generator.next().value).toEqual(call(ls, 'username', 'Apolline'));
        expect(generator.next().value).toEqual(put(loginSuccess('Apolline')));
        expect(generator.next().value).toEqual(call(loadPreviousSessions));
    });

    it('When a user auto logs in and has a username and language stored', () => {
        const generator = autoLoginUser();
        let result = generator.next().value;
        const andReturns = v => { result = generator.next(v); };
        const andThen = () => { result = generator.next(); };

        expect(result).toEqual(call(ls, 'username'));
        andReturns('Claire');

        expect(result.value).toEqual(put(loginSuccess('Claire')));
        andThen();

        expect(result.value).toEqual(call(ls, 'language'));
        andReturns('fr');

        expect(result.value).toEqual(put(changeLanguageSuccess('fr')));
        andThen();

        expect(result.value).toEqual(call(loadPreviousSessions));
        andThen();
    });

    it('When a user auto logs in and has no username or language stored', () => {
        const generator = autoLoginUser();
        let result = generator.next();

        expect(result.value).toEqual(call(ls, 'username'));
        result = generator.next(null);

        expect(result.value).toEqual(call(ls, 'language'));
        result = generator.next(null);

        expect(result.value).toEqual(call(loadPreviousSessions));
    });

    it('When a user disconnets', () => {
        const generator = disconnectUser();
        const result = generator.next();

        expect(result.value).toEqual(put(push('/')));
    });
});
