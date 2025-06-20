import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;

export const SIGNUP_MUTATION = gql`
    mutation Signup($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;

export const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout
    }
`;
