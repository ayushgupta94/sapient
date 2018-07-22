export interface ServerAdapter {
    reset(): Promise<any>;
}

export class MockServerAdapter implements ServerAdapter {
    reset(): Promise<any> {
        return Promise.resolve();
    }
}
