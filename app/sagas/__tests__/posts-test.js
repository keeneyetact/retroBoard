jest.unmock('./testSaga');
jest.unmock('../posts');
jest.unmock('../../state/posts');
jest.unmock('../../selectors');

import test from './testSaga';
import { onAddPost } from '../posts';
import { addPostSuccess } from '../../state/posts';
import { getCurrentUser } from '../../selectors';
import { put, call, select } from 'redux-saga/effects';
import uuid from 'node-uuid';

describe('Sagas - posts', () => {
    it('When a user adds a post', () => {
        test(onAddPost({ payload: { postType: 'well', content: 'Hello You' } }),
        (result, andReturns, andThen) => {
            expect(result()).toEqual(select(getCurrentUser));
            andReturns('Antoine');

            expect(result()).toEqual(call(uuid.v1));
            andReturns('AA-BB-CC');

            expect(result()).toEqual(put(addPostSuccess({
                id: 'AA-BB-CC',
                postType: 'well',
                content: 'Hello You',
                user: 'Antoine',
                likes: [],
                dislikes: []
            })));
            andThen();
        });
    });
});
