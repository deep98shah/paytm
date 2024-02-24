import axios from "axios";
import { atom, selector } from "recoil";

// export const usersAtom= atom({
//     key: "usersAtom",
//     default: []
// })

export const userFilterAtom = atom({
    key: "userFilterAtom",
    default: ""
})

export const filteredUsersSelector = selector({
    key: 'filteredUsersSelector',
    get: async ({get}) => {
        const filter = get(userFilterAtom)
        try {
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            return response.data.users
        } catch (error) {
            return []
        }
    }
})

