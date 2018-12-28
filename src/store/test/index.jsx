export const TEST1 = 'TEST@1';
export const TEST2 = 'DISFOLLOW';

export const test1Act = (id) => { return { type: TEST1, targetId: id } }
export const test2Act = (id) => { return { type: TEST2, targetId: id } }

export function testAction(state = {}, action) {
    switch (action.type) {
        case TEST1:
            return { userId: action.targetId, followed: true }
        case TEST2:
            return { userId: action.targetId, followed: false }
        default:
            return state;
    }
}