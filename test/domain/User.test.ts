import { describe, it } from '@jest/globals';
import {assertThat, hasProperty, defined} from 'hamjest'
import {User} from "../../src/domain/User";

describe('User', () => {
    describe('when user is created', () => {
        it('contains an id', () => {
            const user = User.create("name", "some@email.com")
            assertThat(user, hasProperty('id', defined()))
        })

        it('contains an createdAt', () => {
            const user = User.create("name", "some@email.com")
            assertThat(user, hasProperty('createdAt', defined()))
        })
    })
});
