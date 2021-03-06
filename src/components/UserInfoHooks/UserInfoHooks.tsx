import React, { ReactElement, useCallback, useMemo, useRef, useState } from "react";
import CreateUserHooks from "./CreateUserHooks";
import { IUser } from "@/types/index";
import UserListHook from "@/components/UserInfoHooks/UserListHooks"

// interface Action {
//     type: string,
//     payload?: any,
//     user: object,
//     id: number,
// }

// export const CREATE_USER = 'CREATE_USER';
// export const TOGGLE_USER = 'TOGGLE_USER';
// export const REMOVE_USER = 'REMOVE_USER';

const countActiveUsers = (users: Array<IUser>) => {
    console.log('화성 사용자수를 세는 중...');
    return users.filter((user) => user.active).length;
}

const initialState = 
    [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active: true
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com',
            active: false
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com',
            active: false
        }
    ];

const UserInfoHook: React.FC = () => {
    const [ inputs, setInputs ] = useState({
        username: '',
        email: ''
    });

    const { username, email } = inputs;
    const [users, setUsers] = useState(initialState);
    const nextId = useRef(4);

    const onChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            console.log('onChange');
            const { value, name } = e.currentTarget;
            setInputs(inputs => ({
                ...inputs,
                [name]: value
            }));
        },
        [inputs]
    );

    const onToggle = useCallback(
        (id: number) => 
        {
            setUsers(users => users.map((user) => (user.id === id) ? {...user, active: !user.active} : user));
        },
        []
    );

    const onCreate = useCallback(() => {
            const user = {
                id: nextId.current,
                username,
                email,
                active: false
            };
            setUsers(users => users.concat(user));

            setInputs({
                username: '',
                email: ''
            });
            
            nextId.current += 1;
        },
        [username, email]
    );

    const onRemove = useCallback(
        (id: number) => {
            console.log('onRemove');
            setUsers(users => users.filter((user) => user.id !== id));
        },
        []
    );

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <> 
            <CreateUserHooks
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <div>활성사용자 수 : {count}</div>
            <UserListHook users={users} onRemove={onRemove} onToggle={onToggle} />
        </>
    );
}

export default React.memo(UserInfoHook);