import { describe, it } from '@jest/globals';
import {assertThat, hasProperty, defined, throws, instanceOf} from 'hamjest'
import {Email, Name, User} from "../../src/domain/User";
import {InvalidEmailError, NotBlankError} from "../../src/domain/DomainErrors";

describe('User', () => {
    describe('when user is created', () => {
        it('contains an id', () => {
            const user = User.create(Name.of("name"), Email.of("some@email.com"))
            assertThat(user, hasProperty('id', defined()))
        })

        it('contains an createdAt', () => {
            const user = User.create(Name.of("name"), Email.of("some@email.com"))
            assertThat(user, hasProperty('createdAt', defined()))
        })


    })

    describe("Name", () => {
        it('when name is blank, throws not blank error', () => {
            assertThat(() => Name.of(""),
              throws(instanceOf(NotBlankError)))
        })
    })

    describe("Email", () => {
        it('when email is blank, throws not blank error', () => {
            assertThat(() => Email.of(""),
              throws(instanceOf(NotBlankError)))
        })

        it('and email is not valid, throws error', () => {
            assertThat(() => Email.of("some"),
              throws(instanceOf(InvalidEmailError)))
        })
    })
});
