import { describe, it } from '@jest/globals';
import {assertThat, hasProperty, defined, throws, instanceOf} from 'hamjest'
import {User} from "../../src/domain/User";
import {InvalidEmailError, NotBlankError} from "../../src/domain/DomainErrors";

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

        it('and name is blank, throws not blank error', () => {
            assertThat(() => User.create("", "some@email.com"),
              throws(instanceOf(NotBlankError)))
        })

        it('and email is blank, throws not blank error', () => {
            assertThat(() => User.create("some", ""),
              throws(instanceOf(NotBlankError)))
        })

        it('and email is not valid, throws error', () => {
            assertThat(() => User.create("some", "some"),
              throws(instanceOf(InvalidEmailError)))
        })
    })
});
