declare global {

    namespace PlaywrightTest {

        interface Matchers<R, T> {
            toEqualIgnoreCase(expected: string): R;
        }
    }
}

export { };