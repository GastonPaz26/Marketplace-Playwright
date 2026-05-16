import { test, expect } from '../../fixtures/api.fixture';
import { AuthClient } from '../../api/clients/AuthClient';
import { users } from '../../test-data/users';

test('TC-API-01: User can login with valid credentials',
    async ({ apiContext }) => {

        //Create an instance of the AuthClient
        const authClient = new AuthClient(apiContext);

        //Call the login method with valid credentials
        const response = await authClient.login(
            users.standardUser.email,
            users.standardUser.password
        );
        //Validate the response status is 200
        expect(response.status()).toBe(200);


        //convert the response to json
        const responseBody = await response.json();

        //validate the response body contains a token
        expect(responseBody.token).toBeTruthy();

        //validate the response body contains the same email as the one used for login
        expect(responseBody.user.email)
            .toBe(users.standardUser.email);



    });  